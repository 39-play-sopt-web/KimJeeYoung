
import { css } from "@emotion/react";

//헤더
export const headerStyle = css`
  width: 100%;
  background-color: white;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  align-items: center;

  h1 {
    font-size: 15px;
  }
`;

//숫자 버튼
export const boardStyle = (gridSize) => css`
  margin-top: 50px;
  display: grid;
  grid-template-columns: repeat(${gridSize}, minmax(0, 1fr));
  width: min(90vw, 450px);
  margin-left: auto;
  margin-right: auto;
  gap: 10px;

  button {
    aspect-ratio: 1 / 1;
    min-width: 0;
    font-size: 30px;
    border-radius: 8px;
    cursor: pointer;

    /*클릭되는것같은효과*/
    &:active {
      background-color: #b6dfce;
      transform: scale(0.9);
    }
  }
`;

//다음 숫자
export const pStyle = css`
  margin-top: 40px;
  text-align: center;
  strong {
    font-size: 28px;
  }
`;

export const h1Style = css`
  text-align: left;
`;

//랭킹판
export const rankingStyle = css`
  width: min(90%, 550px);
  margin: 32px auto;
  box-sizing: border-box;

  table {
    width: 100%;
    border-collapse: collapse;
    background-color: white;
    border-radius: 8px;
  }

  th,
  td {
    padding: 12px;
    text-align: center;
    border-bottom: 1px solid #e5e5e5;
    font-size: 14px;
  }

  th {
    background-color: #b6dfce;
    font-weight: 700;
  }
`;

export const rankingHeaderStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  h2 {
    margin: 0;
    font-size: 20px;
  }

  button {
    /*초기화버튼*/
    padding: 8px 14px;
    border: 1px solid #e88b8b;
    border-radius: 6px;
    background-color: white;
    color: #d9534f;
  }
`;

//게임 완료 모달
export const modalStyle = css`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /*완벽한 중앙 정렬을 위하여 */
  width: min(80%, 350px);
  padding: 30px;
  background-color: white;
  border-radius: 12px;
  text-align: center;
  box-sizing: border-box;

  h2 {
    margin-top: 0;
  }

  p {
    margin: 20px 0;
    font-size: 18px;
  }

  button {
    padding: 10px 24px;
    border: none;
    border-radius: 6px;
    background-color: #b6dfce;
    cursor: pointer;
  }
`;

//레벨 선택과 타이머 간격 만들기
export const levelStyle = css`
  display: flex;
  align-items: center;
  gap: 20px;
`;

//게임과 랭킹 버튼 색상 입히기
export const menuButtonStyle = (isSelected) => css`
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background-color: ${isSelected ? "#b6dfce" : "white"};
  font-weight: ${isSelected ? "bold" : "normal"};
`;

export const modalOverlayStyle = css`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1000;
`;
