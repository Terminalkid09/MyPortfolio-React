import "./Contact.css";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

// EmailJS ids. The public key is meant to be public (it can only send the two
// templates bound to it); the service and template ids are config, not secrets.
const EMAILJS_SERVICE_ID = "service_bpchkgi";
const EMAILJS_TEMPLATE_ID = "template_icftzig";
const EMAILJS_PUBLIC_KEY = "1-Eul4WiEfxWcc7Kr";

export default function Contact() {
  const formRef = useRef();
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);

  const sendEmail = (event) => {
    event.preventDefault();

    setSending(true);
    setStatus("");

    emailjs
      .sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY,
      )
      .then(
        () => {
          setStatus("Message sent — I'll reply as soon as I read it.");
          formRef.current.reset();
        },
        () => {
          setStatus("The message was not sent. Try again, or email me directly.");
        },
      )
      .finally(() => setSending(false));
  };

  return (
    <section className="section contact" id="contact">
      <div className="section-inner">
        <h2 className="section-title contact-title">Contact</h2>

        <p className="contact-subtitle">
          Feel free to reach out for collaborations, questions, or just to say
          hi — email is the fastest route.
        </p>

        <form ref={formRef} onSubmit={sendEmail} className="contact-form">
          <div className="form-group">
            <label htmlFor="contact-name">Name</label>
            <input
              id="contact-name"
              type="text"
              name="user_name"
              placeholder="Your name"
              autoComplete="name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact-email">Email</label>
            <input
              id="contact-email"
              type="email"
              name="user_email"
              placeholder="your@email.com"
              autoComplete="email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact-message">Message</label>
            <textarea
              id="contact-message"
              name="message"
              placeholder="Write your message..."
              required
            />
          </div>

          {/* Disabled while in flight: a second click used to send a second
           * message, and there was no way to know whether the first had gone. */}
          <button type="submit" className="btn primary" disabled={sending}>
            {sending ? "Sending..." : "Send Message"}
          </button>
        </form>

        {/* aria-live: the outcome is announced to a screen reader instead of
         * appearing silently under the form. */}
        <p className="contact-status" role="status" aria-live="polite">
          {status}
        </p>

        <div className="contact-social">
          <a
            href="https://github.com/Terminalkid09/"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a href="mailto:Terminalkid09@gmail.com">Email</a>
        </div>
      </div>
    </section>
  );
}
