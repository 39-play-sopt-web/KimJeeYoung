import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.colors.background};
    color: white;
    margin: 0;
    padding : 150px 20px 0;
  }
    #root {
  max-width: 1200px;
  margin: 0 auto;
}
    button {
    cursor: pointer;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
  

  `;

export default GlobalStyle;
