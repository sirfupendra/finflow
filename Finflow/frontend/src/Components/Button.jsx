import React from 'react';
import styled from 'styled-components';

const Button = () => {
  return (
    <StyledWrapper>
      <button className="beautiful-button">
        Click me!
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .beautiful-button {
    position: relative;
    display: inline-block;
    background: linear-gradient(to bottom, #1b1c3f, #4a4e91);
   /* Gradient background */
    color: white;
   /* White text color */
    font-family: "Segoe UI", sans-serif;
   /* Stylish and legible font */
    font-weight: bold;
    font-size: 18px;
   /* Large font size */
    border: none;
   /* No border */
    border-radius: 30px;
   /* Rounded corners */
    padding: 14px 28px;
   /* Large padding */
    cursor: pointer;
   /* Cursor on hover */
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
   /* Subtle shadow */
    animation: button-shimmer 2s infinite;
    transition: all 0.3s ease-in-out;
   /* Smooth transition */
  }

  /* Hover animation */
  .beautiful-button:hover {
    background: linear-gradient(to bottom, #2c2f63, #5b67b7);
    animation: button-particles 1s ease-in-out infinite;
    transform: translateY(-2px);
  }

  /* Click animation */
  .beautiful-button:active {
    transform: scale(0.95);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  }

  /* Shimmer animation */
  @keyframes button-shimmer {
    0% {
      background-position: left top;
    }

    100% {
      background-position: right bottom;
    }
  }

  /* Particle animation */
  @keyframes button-particles {
    0% {
      background-position: left top;
    }

    100% {
      background-position: right bottom;
    }
  }`;

export default Button;
