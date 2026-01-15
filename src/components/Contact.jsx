import "./Contact.css";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const formRef = useRef();
  const [status, setStatus] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_bpchkgi",     // ← incolla il tuo
        "template_icftzig",    // ← incolla il tuo
        formRef.current,
        "1-Eul4WiEfxWcc7Kr"      // ← incolla il tuo
      )
      .then(
        () => {
          setStatus("Message sent successfully!");
          formRef.current.reset();
        },
        () => {
          setStatus("Failed to send message. Try again.");
        }
      );
  };

  return (
    <section className="section contact" id="contact">
      <div className="section-inner">

        <h2 className="contact-title reveal">Contact</h2>

        <p className="contact-subtitle reveal">
          Feel free to reach out for collaborations, questions, or just to say hi.
        </p>

        {/* FORM FUNZIONANTE */}
        <form ref={formRef} onSubmit={sendEmail} className="contact-form reveal">

          <div className="form-group">
            <label>Name</label>
            <input type="text" name="user_name" placeholder="Your name" required />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" name="user_email" placeholder="your@email.com" required />
          </div>

          <div className="form-group">
            <label>Message</label>
            <textarea name="message" placeholder="Write your message..." required></textarea>
          </div>

          <button type="submit" className="btn primary">
            Send Message
          </button>
        </form>

        {/* FEEDBACK */}
        {status && <p className="contact-status reveal">{status}</p>}

        {/* SOCIAL */}
        <div className="contact-social reveal">
          <a href="https://github.com/Terminalkid09/" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/cristian-trif-073a883a1" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href="mailto:Terminalkid09@gmail.com">
            Email
          </a>
        </div>

      </div>
    </section>
  );
}