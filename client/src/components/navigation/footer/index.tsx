import React from "react";
import styled from "@emotion/styled";

// src
import * as styleVars from "const/styles";

const FooterWrapper = styled.footer`
  background-color: ${styleVars.black};
  height: 300px;
  padding: 0 40px;
  position: fixed;
  left: 0;
  bottom: -300px;
  width: 100%;

  & i[class*="fa-"] {
    color: ${styleVars.white};
    font-size: 4em;
  }
`;

interface FooterProps {}

const Footer: React.FC<FooterProps> = (props) => {
  return (
    <FooterWrapper className="Footer">
      <div className="container justify-content-center d-flex">
        <ul className="list-inline p-0 m-0">
          <li className="list-inline-item">
            <i className="fab fa-twitter-square mr-2" />
          </li>
          <li className="list-inline-item">
            <i className="fab fa-facebook-square ml-2" />
          </li>
        </ul>
      </div>
    </FooterWrapper>
  );
};

export default Footer;
