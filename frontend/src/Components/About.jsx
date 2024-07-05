import React from 'react';
import '../CSS/About.css'

const About = () => {
  return (
    <div className="about-page">
      <header>
        <h1>About Us</h1>
        <p>Your trusted partner in saving lives through blood donation.</p>
      </header>
      <section className="introduction">
        <h2>Introduction</h2>
        <p>E-Blood Bank is a platform dedicated to bridging the gap between blood donors and recipients. Our mission is to ensure that no one has to suffer due to the lack of available blood.</p>
      </section>
      <section className="mission-vision">
        <h2>Mission and Vision</h2>
        <p><strong>Mission:</strong> To provide a reliable and accessible platform for blood donation and requests.</p>
        <p><strong>Vision:</strong> A world where every blood request is fulfilled promptly, saving countless lives.</p>
      </section>
      <section className="features">
        <h2>Features</h2>
        <ul>
          <li><strong>User Registration and Login:</strong> Easy and secure registration process for all users.</li>
          <li><strong>Donate Blood:</strong> Simple steps to register as a blood donor and make a difference.</li>
          <li><strong>Request Blood:</strong> Quick and efficient way to request blood in times of need.</li>
          <li><strong>Security:</strong> Ensuring the highest standards of data protection and privacy.</li>
        </ul>
      </section>
      <section className="team">
        <h2>Our Team</h2>
        <p>Meet the dedicated individuals behind E-Blood Bank:</p>
        <ul>
          <li><strong>John Doe:</strong> Project Lead</li>
          <li><strong>Jane Smith:</strong> Developer</li>
          <li><strong>Mark Johnson:</strong> UX/UI Designer</li>
        </ul>
      </section>
      <section className="testimonials">
        <h2>Testimonials</h2>
        <blockquote>
          <p>"E-Blood Bank saved my life when I needed an urgent blood transfusion. I can't thank them enough!"</p>
          <footer>— Emily R.</footer>
        </blockquote>
      </section>
      <section className="call-to-action">
        <h2>Get Involved</h2>
        <p>Join us in making a difference. <a href="/register">Register</a> to donate blood or <a href="/request">request blood</a> today.</p>
      </section>
      <section className="contact">
        <h2>Contact Us</h2>
        <p>Email: info@ebloodbank.com</p>
        <p>Phone: +123 456 7890</p>
        <p>Follow us on social media:</p>
        <ul>
          <li><a href="https://facebook.com/ebloodbank">Facebook</a></li>
          <li><a href="https://twitter.com/ebloodbank">Twitter</a></li>
          <li><a href="https://linkedin.com/company/ebloodbank">LinkedIn</a></li>
        </ul>
      </section>
    </div>
  );
};

export default About;