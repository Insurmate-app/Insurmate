import React from "react";
import "../style.css"; // Import the global CSS

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div id="error-message" className="text-danger mb-2"></div>
      <div id="copyright-text">
        <p className="mb-0">
          &copy; {year} We Care Insurance Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
