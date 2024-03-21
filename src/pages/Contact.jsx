import React from 'react';
import './contact.css';

export const ContactUs = () => {
  return (
    <div className="contact-us-container">
      <h2>Contact Us</h2>
      <form className="contact-form">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" placeholder="Your name" />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" placeholder="Your email" />

        <label htmlFor="message">Message:</label>
        <textarea id="message" name="message" rows="4" placeholder="Your message"></textarea>

        <button>Submit</button>
      </form>
    </div>
  );
};
