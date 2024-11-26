import { useEffect } from "react";

import { gsap } from "gsap";

const HyperledgerFabricWorkflow = () => {
  useEffect(() => {
    // User to Org1 (Sign Up)
    gsap.fromTo(
      "#arrow1",
      { strokeDasharray: 300, strokeDashoffset: 300 },
      { strokeDashoffset: 0, duration: 1 },
    );
    gsap.fromTo(
      "#org1",
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 1, delay: 0.5 },
    );

    // Org1 to Org2 (Submit Policy)
    gsap.fromTo(
      "#arrow2",
      { strokeDasharray: 300, strokeDashoffset: 300 },
      { strokeDashoffset: 0, duration: 1, delay: 1.5 },
    );
    gsap.fromTo(
      "#org2",
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 1, delay: 2 },
    );

    // Org2 to Ledger (Approval)
    gsap.fromTo(
      "#arrow3",
      { strokeDasharray: 300, strokeDashoffset: 300 },
      { strokeDashoffset: 0, duration: 1, delay: 2.5 },
    );
    gsap.fromTo(
      "#ledger",
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 1, delay: 3 },
    );
  }, []);

  return (
    <svg
      width="100%"
      height="600px"
      viewBox="0 0 1200 600"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Title */}
      <text
        x="600"
        y="50"
        textAnchor="middle"
        fill="black"
        fontSize="24"
        fontWeight="bold"
      >
        Hyperledger Fabric Workflow
      </text>

      {/* User Box */}
      <rect
        id="user"
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
        User (Org1)
      </text>

      {/* Arrow 1: User to Org1 */}
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
        Sign Up
      </text>

      {/* Org1 Box */}
      <rect
        id="org1"
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
        Org1
      </text>

      {/* Arrow 2: Org1 to Org2 */}
      <line
        id="arrow2"
        x1="600"
        y1="150"
        x2="750"
        y2="150"
        stroke="black"
        strokeWidth="2"
      />
      <text x="675" y="130" textAnchor="middle" fill="black" fontSize="12">
        Submit Policy
      </text>

      {/* Org2 Box */}
      <rect
        id="org2"
        x="750"
        y="100"
        width="200"
        height="100"
        fill="#f8d7da"
        rx="10"
      />
      <text
        x="850"
        y="150"
        textAnchor="middle"
        fill="black"
        fontSize="16"
        fontWeight="bold"
      >
        Org2 (Bank)
      </text>

      {/* Arrow 3: Org2 to Ledger */}
      <line
        id="arrow3"
        x1="850"
        y1="200"
        x2="850"
        y2="350"
        stroke="black"
        strokeWidth="2"
      />
      <text x="870" y="275" textAnchor="middle" fill="black" fontSize="12">
        Approve Policy
      </text>

      {/* Ledger Box */}
      <rect
        id="ledger"
        x="750"
        y="350"
        width="200"
        height="100"
        fill="#d1ecf1"
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
        Ledger
      </text>

      {/* Annotation */}
      <text x="50" y="550" fill="black" fontSize="12">
        • Org1 manages regular users, while Org2 (Bank) manages policy
        approvals.
      </text>
      <text x="50" y="570" fill="black" fontSize="12">
        • Approved policies are recorded in the shared ledger.
      </text>
    </svg>
  );
};

export default HyperledgerFabricWorkflow;
