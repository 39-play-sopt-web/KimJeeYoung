import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

const Header = () => {
  const navigate = useNavigate();
  const part = localStorage.getItem("part");

  const handleLogout = () => {
    localStorage.removeItem("authorizationCode");
    localStorage.removeItem("part");
    navigate("/code");
  };

  return (
    <Head>
      <Left>
        <Logo>
          PLAY SOPT <span>BOARD</span>
        </Logo>
        <Part>{part} 파트</Part>
      </Left>

      <Nav>
        <button onClick={() => navigate("/posts")}>게시글 목록</button>
        <button onClick={() => navigate("/write")}>글쓰기</button>
        <button onClick={handleLogout}>로그아웃</button>
      </Nav>
    </Head>
  );
};

export default Header;

const Head = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;

const Part = styled.span`
  color: ${({ theme }) => theme.colors.mainColor};
  border: 1px solid ${({ theme }) => theme.colors.mainColor};
  border-radius: 30px;
  padding: 8px 16px;
  font-size: 16px;
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;

  button {
    background: none;
    border: none;
    color: white;
  }
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const Logo = styled.h1`
  font-size: 28px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;

  span {
    color: ${({ theme }) => theme.colors.mainColor};
  }
`;
