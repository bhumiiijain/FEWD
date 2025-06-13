import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
const ContactUs = () => {
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "your_service_id",   
        "your_template_id",  
        form.current,
        "your_user_id"      
      )
      .then(
        (result) => {
          alert("Message sent successfully!");
          form.current.reset();
        },
        (error) => {
          alert("Failed to send message, please try again.");
          console.error(error.text);
        }
      );
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
      <form ref={form} onSubmit={sendEmail}>
        <label className="block mb-2">Name:</label>
        <input type="text" name="user_name" required className="w-full p-2 mb-4 border rounded" />

        <label className="block mb-2">Email:</label>
        <input type="email" name="user_email" required className="w-full p-2 mb-4 border rounded" />

        <label className="block mb-2">Message:</label>
        <textarea name="message" required className="w-full p-2 mb-4 border rounded" />

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Send
        </button>
      </form>
    </div>
  );
};
export default ContactUs;
