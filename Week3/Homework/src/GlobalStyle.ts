import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.colors.background};
    color: white;
    margin: 0;
    padding : 150px 300px 0;
  }
    button {
    cursor: pointer;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
  .overview {
  color: ${({ theme }) => theme.colors.text};}

.score {
    display: grid;
    place-items: center;
    width: 65px;
    height: 30px;
    border-radius: 8px;
    font-weight: bold;
    color: black;
    
    background:${({ theme }) => theme.colors.mint}; }

  `;

export default GlobalStyle;
