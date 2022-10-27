import React from "react";
import styled, { css } from "styled-components";
const Button = (props) => {
  return (
    <StButton {...props} disabled={props.disabled}>
      {props.children}
    </StButton>
  );
};

export default Button;

const StButton = styled.button`
  padding: 10px;
  margin: 5px 5px;
  align-self: center;
  width: 240px;
  height: 40px !important;
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.4;
  border: 0;
  color: #315a47;
  border-radius: 10px;
  background-color: white;
  cursor: pointer;
  &:hover {
    background-color: #315a47;
    border: 0;
    color: white;
  }

  ${({ size }) => {
    switch (size) {
      case "full":
        return css`
          width: 100%;
        `;
      case "large":
        return css`
          width: 50%;
        `;
      case "medium":
        return css`
          width: 200px;
          height: 40px !important;
          padding; 5px;
        `;
      case "small":
        return css`
          width: 40px;
          height: 40px !important;
          padding: 10px;
        `;
      case "round":
        return css`
          width: 60px;
          height: 60px !important;
          padding: 20px;
          border-radius: 50px;
        `;
      case "logout":
        return css`
          width: 100px;
          height: 50px !important;
          margin-right: 30px;
          border-radius: 10px;
          font-weight: 1000;
          font-size: 16px;
          position: relative;
          text-align: center;
          float: right;
        `;
      case "write":
        return css`
          width: 100px;
          height: 50px !important;
          margin-right: 50px;
          border-radius: 10px;
          font-weight: 1000;
          font-size: 16px;
          position: relative;
          text-align: center;
          float: right;
        `;
      default:
        return css`
          width: 240px;
          height: 40px !important;
          padding: 10px;
        `;
    }
  }}
  ${({ color }) => {
    switch (color) {
      case "reverse":
        return css`
          color: white;
          background-color: #315a47;
          &:hover {
            background-color: white;
            border: 0;
            color: #315a47;
          }
        `;

      case "line":
        return css`
          background-color: white;
          border: 1px solid #315a47;
        `;
      case "logout":
        return css`
          background-color: rgb(207, 207, 175);
          border: 1px solid #315a47;
          &:hover {
            background-color: #315a47;
            border: 0;
            color: rgb(207, 207, 175);
          }
        `;

      default:
        return css`
          color: #315a47;
          background-color: white;
          box-shadow: 0px 2px 10px #d4ded9;
          &:hover {
            background-color: #315a47;
            border: 0;
            color: white;
          }
        `;
    }
  }}
`;
