import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import styled from "@emotion/styled";
import { issueAuthorizationCode } from "../apis/code";

const CodePage = () => {
  const [part, setPart] = useState("");
  const [issued, setIssued] = useState(false);

  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: issueAuthorizationCode,

    onSuccess: (authorizationCode) => {
      localStorage.setItem("authorizationCode", authorizationCode);
      localStorage.setItem("part", part);
      setIssued(true);
      navigate("/posts");
    },

    onError: () => {
      alert("코드 발급에 실패했습니다.");
    },
  });

  return (
    <Box>
      <Title>
        PLAY SOPT <span>게시판</span>
      </Title>

      <Text>먼저 파트를 선택하고 코드를 발급받아 주세요.</Text>

      <Label>파트 선택</Label>

      <Select
        value={part}
        onChange={(e) => {
          setPart(e.target.value);
          setIssued(false);
          localStorage.removeItem("authorizationCode");
          localStorage.removeItem("part");
        }}
      >
        <option value="">파트를 선택하세요</option>
        <option value="WEB">WEB</option>
        <option value="iOS">iOS</option>
        <option value="ANDROID">ANDROID</option>
      </Select>

      <GetCodeButton disabled={!part || isPending} onClick={() => mutate(part)}>
        {isPending ? "발급 중..." : "코드 발급받기"}
      </GetCodeButton>

      <ListButton
        onClick={() => {
          if (!issued) {
            alert("먼저 파트를 선택하고 코드를 발급해 주세요.");
            return;
          }
          navigate("/posts");
        }}
      >
        게시판 목록 보기
      </ListButton>
    </Box>
  );
};

export default CodePage;

const Box = styled.div`
  width: 100%;
  max-width: 420px;
  padding: 36px;
  background-color: ${({ theme }) => theme.colors.card};
  border-radius: 12px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  font-size: 28px;
  text-align: center;
  margin: 0 0 16px;

  span {
    color: ${({ theme }) => theme.colors.mainColor};
  }
`;

const Text = styled.p`
  color: ${({ theme }) => theme.colors.subText};
  text-align: center;
  font-size: 14px;
  margin-bottom: 32px;
`;

const Label = styled.p`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 10px;
`;

const Select = styled.select`
  width: 100%;
  padding: 14px;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  margin-bottom: 20px;
`;

const GetCodeButton = styled.button`
  width: 100%;
  padding: 14px;
  background-color: ${({ theme }) => theme.colors.mainColor};
  color: #19191f;
  border-radius: 8px;
  margin-bottom: 12px;
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.hover};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ListButton = styled.button`
  width: 100%;
  padding: 14px;
  background: none;
  color: ${({ theme }) => theme.colors.mainColor};
  border: 1px solid ${({ theme }) => theme.colors.mainColor};
  border-radius: 8px;
`;
