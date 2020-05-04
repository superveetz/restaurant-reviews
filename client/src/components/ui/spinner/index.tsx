import React from "react";
import styled from "@emotion/styled";

const SpinnerWrapper = styled.div`
  @keyframes rotate {
    to {
      transform: rotate(1turn);
    }
  }

  width: 100%;
  height: 100%;

  .loading-animation {
    margin: 0 auto;
    width: 120px;
    height: 120px;
    border: 8px solid rgba(189, 189, 189, 0.25);
    border-left-color: rgba(3, 155, 229, 1);
    border-top-color: rgba(3, 155, 229, 1);
    border-radius: 50%;
    display: inline-block;
    animation: rotate 600ms infinite linear;
    overflow-y: hidden !important;
    margin-left: 50%;
    margin-right: 50%;
  }
`;

interface SpinnerProps {}

const Spinner: React.FC<SpinnerProps> = (props) => {
  return (
    <SpinnerWrapper className="Spinner">
      <div className="loading-animation" />
    </SpinnerWrapper>
  );
};

export default Spinner;
