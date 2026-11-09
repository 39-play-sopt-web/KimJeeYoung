import styled from "styled-components";

function Header() {
  return (
    <Head>
      <header>
        <h1>
          PLAY SOPT <span>MOVIE</span>
        </h1>
      </header>
    </Head>
  );
}

export default Header;

const Head = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  background: ${({ theme }) => theme.colors.background};

  border-bottom: 1px solid #cccccc;
  display: grid;

  h1 {
    margin-left: 40px;
  }
  span {
    color: #adf7dc;
  }
`;
