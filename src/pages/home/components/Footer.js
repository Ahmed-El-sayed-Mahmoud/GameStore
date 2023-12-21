// Footer.js

import React from 'react';
import './css/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>Your Game Store is your one-stop destination for all your gaming needs. We provide a wide range of games for every platform.</p>
        </div>
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: info@yourgamestore.com</p>
          <p>Phone: +1 (123) 456-7890</p>
        </div>
        <div className="footer-section">
          <h3>Follow Us</h3>
          <p>Stay connected with us on social media:</p>
          <div className="social-icons">
            {/* Add social media icons here */}
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2023 Your Game Store. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
