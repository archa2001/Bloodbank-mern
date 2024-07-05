import React from 'react';
import '../CSS/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: contact@ebloodbank.com</p>
          <p>Phone: +123-456-7890</p>
        </div>
        <div className="footer-section">
          <h4>About Us</h4>
          <p>
           <b style={{color:'black'}}>E-BloodBank</b>  is a platform dedicated to connecting blood donors with recipients in need. Our mission is to ensure safe and efficient blood transfusions.
          </p>
        </div>
        <div className="footer-section">
          <h4>Follow Us</h4>
          <p>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a> | 
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a> | 
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} E-BloodBank. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
