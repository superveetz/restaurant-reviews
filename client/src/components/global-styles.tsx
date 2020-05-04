import React from "react";
import { Global, css } from "@emotion/core";

interface GlobalStylesProps {}

const GlobalStyles: React.FC<GlobalStylesProps> = (props) => {
  return (
    <div className="GlobalStyles">
      <Global
        styles={css`
          @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

          html {
            margin: 0;
            padding: 0;
          }

          body {
            margin: 0;
            padding: 0;
            overflow-x: hidden;
            overflow-y: scroll;
            font-family: -apple-system, BlinkMacSystemFont, "Roboto", "Oxygen",
              "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
              sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }

          /**
           * Utility Classes
           */
          .cursor-pointer {
            cursor: pointer;
          }
          .text-unselectable {
            user-select: none;
          }

          /**
           * Third Party Overwrites
           */
        `}
      />
    </div>
  );
};

export default GlobalStyles;
