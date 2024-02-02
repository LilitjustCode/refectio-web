import React from "react";

function Dot() {
  return (
    <svg
      width="8"
      height="8"
      viewBox="0 0 8 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="4"
        cy="4"
        r="4"
        transform="matrix(1 0 0 -1 0 8)"
        fill="white"
      />
      <circle
        cx="4"
        cy="4"
        r="4"
        transform="matrix(1 0 0 -1 0 8)"
        fill="white"
      />
      <circle
        cx="4"
        cy="4"
        r="4"
        transform="matrix(1 0 0 -1 0 8)"
        fill="white"
      />
    </svg>
  );
}

export default Dot;
