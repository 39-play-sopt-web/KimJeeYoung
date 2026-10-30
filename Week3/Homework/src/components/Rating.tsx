//const [Rating, setRating] = useState("all")
import styled from "styled-components";
import { useState } from "react";

type RatingProps = {
  onSelect: (min?: number, max?: number) => void;
};
const Rating = ({ onSelect }: RatingProps) => {
  const [selected, setSelected] = useState("전체");
  return (
    <RatingButton>
      <button
        type="button"
        onClick={() => {
          onSelect();
          setSelected("전체");
        }}
        className={selected === "전체" ? "active" : ""}
      >
        전체
      </button>

      <button
        type="button"
        onClick={() => {
          onSelect(9);
          setSelected("9점 이상");
        }}
        className={selected === "9점 이상" ? "active" : ""}
      >
        9점 이상
      </button>

      <button
        type="button"
        onClick={() => {
          onSelect(8, 9);
          setSelected("8~9점");
        }}
        className={selected === "8~9점" ? "active" : ""}
      >
        8~9점
      </button>

      <button
        type="button"
        onClick={() => {
          onSelect(7, 8);
          setSelected("7~8점");
        }}
        className={selected === "7~8점" ? "active" : ""}
      >
        7~8점
      </button>

      <button
        type="button"
        onClick={() => {
          onSelect(6, 7);
          setSelected("6~7점");
        }}
        className={selected === "6~7점" ? "active" : ""}
      >
        6~7점
      </button>

      <button
        type="button"
        onClick={() => {
          onSelect(undefined, 6);
          setSelected("6점 미만");
        }}
        className={selected === "6점 미만" ? "active" : ""}
      >
        6점 미만
      </button>
    </RatingButton>
  );
};

export default Rating;

//css=============================================================================
const RatingButton = styled.div`
  display: flex;
  justify-content: left;
  gap: 10px;
  margin-bottom: 30px;

  button {
    border-radius: 20px;
    height: 40px;
    width: auto;
    padding: 0 20px;
    font-size: 16px;
    font-weight: bold;
    background: ${({ theme }) => theme.colors.card};
    color: white;
    border: 1px ${({ theme }) => theme.colors.card};
  }
  button.active {
    background: ${({ theme }) => theme.colors.mint};
    color: black;
  }
  button:hover {
    background: ${({ theme }) => theme.colors.mint};
    color: black;
  }
`;
