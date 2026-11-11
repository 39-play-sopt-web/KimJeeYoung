import { Global, css } from "@emotion/react";

const GlobalStyle = () => {
  return (
    <Global
      styles={css`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          min-width: 320px;
          font-family: Arial, sans-serif;
          background-color: #19191f;
          color: #ffffff;
        }

        button,
        input,
        textarea,
        select {
          font: inherit;
        }

        button {
          cursor: pointer;
        }
      `}
    />
  );
};

export default GlobalStyle;
