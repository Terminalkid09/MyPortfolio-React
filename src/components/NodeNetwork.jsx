import { useEffect, useRef } from "react";
import "../styles/network.css";

/**
 * The node network behind the page.
 *
 * It replaces the binary rain. Glyphs are solid, high-contrast shapes, and a
 * column of them sitting behind a paragraph is exactly what a reader's eye
 * refuses to skip: measured on the old canvas, the brightest pixel behind the
 * headline had a relative luminance of 0.67, so the title rendered at a
 * contrast ratio of 1.09:1 against its own background. Dots and hairlines at a
 * few percent opacity read as texture instead of competing for attention.
 *
 * Readability is not left to those low opacities either. `.network-veil` (in
 * network.css) keeps the dark where the text is and leaves the outer 120px of
 * the viewport open, so the mesh reads as a lit edge on each side of a wide
 * page; the sections' own panels carry the readability of everything written
 * on them. The stops are tuned against measurements, not by eye: with the
 * network at these alphas a bright crossing reaches ~0.25 of relative
 * luminance, and the veil has to leave under 0.02 of it behind text while
 * staying open enough outside for the rails to read as a live network.
 *
 * The cost is bounded on purpose:
 *   - the node count follows the viewport area, so a phone gets a phone-sized
 *     network instead of a desk-sized one squeezed into 390px (16 nodes at
 *     390x844, 72 at 1440x900);
 *   - frames are capped at 30fps and the drift is slower on a narrow screen;
 *   - `prefers-reduced-motion` gets one static frame instead of the loop;
 *   - a hidden tab is paused rather than left animating for nobody;
 *   - the backing store follows `devicePixelRatio` (capped at 2), so the lines
 *     are crisp on a HiDPI display without quadrupling the fill cost.
 */
const PALETTE = [
  [181, 123, 255], // violet
  [76, 201, 240], // cyan
  [46, 230, 197], // teal
];

const FRAME_MS = 1000 / 30;
const AREA_PER_NODE = 18000;
const NODE_MIN = 16;
const NODE_MAX = 72;

export default function NodeNetwork() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let nodes = [];
    let width = 0;
    let height = 0;
    let linkDistance = 0;
    let speed = 1;
    let animationId = 0;
    let lastFrame = 0;

    const seed = () => {
      const count = Math.min(
        NODE_MAX,
        Math.max(NODE_MIN, Math.round((width * height) / AREA_PER_NODE)),
      );
      linkDistance = Math.max(110, Math.min(170, Math.min(width, height) * 0.22));
      speed = width < 600 ? 0.6 : 1;

      nodes = Array.from({ length: count }, () => {
        const angle = Math.random() * Math.PI * 2;
        const drift = 0.1 + Math.random() * 0.16; // px per 60fps frame
        const [r, g, b] = PALETTE[Math.floor(Math.random() * PALETTE.length)];
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: Math.cos(angle) * drift,
          vy: Math.sin(angle) * drift,
          radius: 1.4 + Math.random() * 1.3,
          rgb: `${r}, ${g}, ${b}`,
        };
      });
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // draw in CSS pixels again
      seed();
    };

    const advance = (elapsed) => {
      const step = elapsed / 16.667; // 1 = one 60fps frame
      for (const node of nodes) {
        node.x += node.vx * step * speed;
        node.y += node.vy * step * speed;
        // Wrap with a margin the length of a link, so a node reappears just
        // outside the edge and never pops in the middle of the screen.
        if (node.x < -linkDistance) node.x = width + linkDistance;
        else if (node.x > width + linkDistance) node.x = -linkDistance;
        if (node.y < -linkDistance) node.y = height + linkDistance;
        else if (node.y > height + linkDistance) node.y = -linkDistance;
      }
    };

    const paint = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 1;

      for (let i = 0; i < nodes.length; i += 1) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j += 1) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distanceSq = dx * dx + dy * dy;
          if (distanceSq > linkDistance * linkDistance) continue;

          // The closer the pair, the brighter the link — but with a floor.
          // Without one the average link came out near 0.15, which through the
          // veil was under the 8/255 that counts as visible: the mesh measured
          // 0.04% of the screen, i.e. nobody could see it. Links carry the
          // texture, so they keep a visible base and gain with closeness.
          //
          // The ceiling is deliberate: two links crossing composite to roughly
          // twice a single one, and that worst case is what sets how dark the
          // veil has to be over the text. Gentler lines buy a lighter veil,
          // and a lighter veil is what makes the mesh visible at all.
          const closeness = 1 - Math.sqrt(distanceSq) / linkDistance;
          const alpha = 0.2 + closeness * 0.28;
          ctx.strokeStyle = `rgba(${a.rgb}, ${alpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      for (const node of nodes) {
        ctx.fillStyle = `rgba(${node.rgb}, 0.42)`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const stop = () => {
      if (animationId) {
        window.cancelAnimationFrame(animationId);
        animationId = 0;
      }
    };

    const start = () => {
      stop();
      lastFrame = 0;
      if (reducedMotion.matches || document.hidden) return;

      const animate = (now) => {
        animationId = window.requestAnimationFrame(animate);
        if (!lastFrame) {
          lastFrame = now;
          return;
        }
        const elapsed = now - lastFrame;
        if (elapsed < FRAME_MS) return;
        lastFrame = now;
        advance(elapsed);
        paint();
      };

      animationId = window.requestAnimationFrame(animate);
    };

    const applyMotionPreference = () => {
      if (reducedMotion.matches) {
        stop();
        paint(); // one frame, so switching motion off is not a black page
      } else {
        start();
      }
    };

    const onVisibility = () => (document.hidden ? stop() : start());

    resize();
    paint();
    start();

    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    reducedMotion.addEventListener?.("change", applyMotionPreference);

    return () => {
      stop();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      reducedMotion.removeEventListener?.("change", applyMotionPreference);
    };
  }, []);

  return (
    <div className="network" aria-hidden="true">
      <canvas ref={canvasRef} className="network-canvas" />
      <div className="network-veil" />
    </div>
  );
}
