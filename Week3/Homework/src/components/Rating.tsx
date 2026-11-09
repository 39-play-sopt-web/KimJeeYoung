import styled from "styled-components";
import { useState } from "react";

type RatingProps = {
  onSelect: (min?: number, max?: number) => void;
};
interface RatingFilter {
  label: string;
  min?: number;
  max?: number;
}

const ratingFilters: RatingFilter[] = [
  { label: "전체" },
  { label: "9점 이상", min: 9 },
  { label: "8~9점", min: 8, max: 9 },
  { label: "7~8점", min: 7, max: 8 },
  { label: "6~7점", min: 6, max: 7 },
  { label: "6점 미만", max: 6 },
];

const Rating = ({ onSelect }: RatingProps) => {
  const [selected, setSelected] = useState("전체");
  return (
    <RatingButton>
      {ratingFilters.map((filter) => (
        <button
          key={filter.label}
          type="button"
          onClick={() => {
            onSelect(filter.min, filter.max);
            setSelected(filter.label);
          }}
          className={selected === filter.label ? "active" : ""}
          aria-pressed={selected === filter.label}
        >
          {filter.label}
        </button>
      ))}
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
