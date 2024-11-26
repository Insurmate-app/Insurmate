import { useEffect } from "react";

import { gsap } from "gsap";

const MortgagePolicyWorkflowSVG = () => {
  useEffect(() => {
    // GSAP Animations
    gsap.fromTo(
      "#arrow1",
      { strokeDasharray: 300, strokeDashoffset: 300 },
      { strokeDashoffset: 0, duration: 1 },
    );
    gsap.fromTo(
      "#box1",
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 1, delay: 0.5 },
    );
    gsap.fromTo(
      "#arrow2",
      { strokeDasharray: 300, strokeDashoffset: 300 },
      { strokeDashoffset: 0, duration: 1, delay: 1 },
    );
    gsap.fromTo(
      "#arrow3",
      { strokeDasharray: 300, strokeDashoffset: 300 },
      { strokeDashoffset: 0, duration: 1, delay: 1.5 },
    );
    gsap.fromTo(
      "#box3",
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 1, delay: 2 },
    );
    gsap.fromTo(
      "#arrow4",
      { strokeDasharray: 300, strokeDashoffset: 300 },
      { strokeDashoffset: 0, duration: 1, delay: 2.5 },
    );
    gsap.fromTo(
      "#box4",
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 1, delay: 3 },
    );
    gsap.fromTo(
      "#arrow5",
      { strokeDasharray: 300, strokeDashoffset: 300 },
      { strokeDashoffset: 0, duration: 1, delay: 3.5 },
    );
    gsap.fromTo(
      "#box5",
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 1, delay: 4 },
    );
  }, []);

  return (
    <svg
      width="100%"
      height="700px"
      viewBox="0 0 1400 700" // Adjusted dimensions
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet" // Ensures scaling without clipping
    >
      {/* Title */}
      <text
        x="700"
        y="50"
        textAnchor="middle"
        fill="black"
        fontSize="24"
        fontWeight="bold"
      >
        Mortgage Policy Exchange Workflow
      </text>

      {/* Buyer Box */}
      <rect
        id="box1"
        x="50"
        y="100"
        width="200"
        height="100"
        fill="#d4edda"
        rx="10"
      />
      <text
        x="150"
        y="150"
        textAnchor="middle"
        fill="black"
        fontSize="16"
        fontWeight="bold"
      >
        Buyer
      </text>

      {/* Arrow 1: Buyer to Bank */}
      <line
        id="arrow1"
        x1="250"
        y1="150"
        x2="400"
        y2="150"
        stroke="black"
        strokeWidth="2"
      />
      <text x="325" y="130" textAnchor="middle" fill="black" fontSize="12">
        Applies for Loan
      </text>

      {/* Bank Box */}
      <rect
        id="box2"
        x="400"
        y="100"
        width="200"
        height="100"
        fill="#c3e6cb"
        rx="10"
      />
      <text
        x="500"
        y="150"
        textAnchor="middle"
        fill="black"
        fontSize="16"
        fontWeight="bold"
      >
        Bank
      </text>

      {/* Arrow 2: Bank to Buy House */}
      <line
        id="arrow2"
        x1="500"
        y1="200"
        x2="500"
        y2="350"
        stroke="black"
        strokeWidth="2"
      />
      <text x="520" y="275" textAnchor="middle" fill="black" fontSize="12">
        Approves Loan
      </text>

      {/* Buy House Box */}
      <rect
        id="box3"
        x="400"
        y="350"
        width="200"
        height="100"
        fill="#f8d7da"
        rx="10"
      />
      <text
        x="500"
        y="400"
        textAnchor="middle"
        fill="black"
        fontSize="16"
        fontWeight="bold"
      >
        Buy House
      </text>

      {/* Arrow 3: Buy House to Homeowner */}
      <line
        id="arrow3"
        x1="600"
        y1="400"
        x2="750"
        y2="400"
        stroke="black"
        strokeWidth="2"
      />
      <text x="675" y="380" textAnchor="middle" fill="black" fontSize="12">
        Needs Mortgage Policy
      </text>

      {/* Homeowner Box */}
      <rect
        id="box4"
        x="750"
        y="350"
        width="200"
        height="100"
        fill="#fff3cd"
        rx="10"
      />
      <text
        x="850"
        y="400"
        textAnchor="middle"
        fill="black"
        fontSize="16"
        fontWeight="bold"
      >
        Homeowner
      </text>

      {/* Arrow 4: Homeowner to Insurance Company */}
      <line
        id="arrow4"
        x1="950"
        y1="400"
        x2="1100"
        y2="400"
        stroke="black"
        strokeWidth="2"
      />
      <text x="1025" y="380" textAnchor="middle" fill="black" fontSize="12">
        Issues Policy
      </text>

      {/* Insurance Company Box */}
      <rect
        id="box5"
        x="1100"
        y="350"
        width="200"
        height="100"
        fill="#d1ecf1"
        rx="10"
      />
      <text
        x="1200"
        y="400"
        textAnchor="middle"
        fill="black"
        fontSize="16"
        fontWeight="bold"
      >
        Insurance Company
      </text>
    </svg>
  );
};

export default MortgagePolicyWorkflowSVG;
