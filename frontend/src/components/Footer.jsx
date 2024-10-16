import React from "react";

function Footer() {
  const date = new Date();
  const year = date.toString().split(" ")[3];
  return (
    <div style={{ textAlign: "center" }}>
      <div id="error-message" style={{ color: "red" }}></div>
      <div id="copyright-text">
        <p className="mb-0">&copy; {year} Copyright: We Care Insurance INC.</p>
      </div>
    </div>
  );
}

export default Footer;
