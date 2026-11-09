import styled from "styled-components";

export const ScoreBadge = styled.span`
  display: grid;
  place-items: center;
  width: 65px;
  height: 30px;
  border-radius: 8px;
  font-weight: bold;
  color: black;
  background: ${({ theme }) => theme.colors.mint};
`;

export const Overview = styled.p`
  color: ${({ theme }) => theme.colors.text};
`;
