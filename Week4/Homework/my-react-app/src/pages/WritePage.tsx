import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import styled from "@emotion/styled";
import { createPost } from "../apis/post";

const WritePage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [step, setStep] = useState(1);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: () => createPost(title, content, author),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["posts"] });
      alert(`${author} 님 게시글 작성이 완료되었어요`);
      navigate("/posts");
    },
    onError: () => {
      alert("게시글 작성에 실패했습니다.");
    },
  });

  const handleNext = () => {
    setStep(step + 1);
  };

  const isDisabled =
    step === 1
      ? !title.trim() || title.length > 50
      : step === 2
        ? !content.trim() || content.length > 1000
        : !author.trim() || author.length > 20;

  return (
    <WriteBox>
      <h2>게시글 작성</h2>

      {step === 1 && (
        <>
          <Label>제목</Label>
          <Input
            placeholder="제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Count>{title.length} / 50</Count>
          {title.length > 50 && (
            <ErrorMessage>제목은 50글자 이하로 입력해 주세요.</ErrorMessage>
          )}
        </>
      )}

      {step === 2 && (
        <>
          <Label>본문</Label>
          <Textarea
            placeholder="본문을 입력하세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Count>{content.length} / 1000</Count>
          {content.length > 1000 && (
            <ErrorMessage>본문은 1000글자 이하로 입력해 주세요.</ErrorMessage>
          )}
        </>
      )}

      {step === 3 && (
        <>
          <Label>작성자</Label>
          <Input
            placeholder="작성자 이름을 입력하세요"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <Count>{author.length} / 20</Count>
          {author.length > 20 && (
            <ErrorMessage>작성자는 20글자 이하로 입력해 주세요.</ErrorMessage>
          )}
        </>
      )}

      <ButtonGroup>
        <BackButton onClick={() => navigate("/posts")}>목록으로</BackButton>

        {step < 3 ? (
          <SubmitButton disabled={isDisabled} onClick={handleNext}>
            다음
          </SubmitButton>
        ) : (
          <SubmitButton
            disabled={isDisabled || isPending}
            onClick={() => mutate()}
          >
            작성
          </SubmitButton>
        )}
      </ButtonGroup>
    </WriteBox>
  );
};

export default WritePage;

const WriteBox = styled.div`
  max-width: 860px;
  margin: 0 auto;
`;

const Label = styled.p`
  margin: 24px 0 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 14px;
  background-color: ${({ theme }) => theme.colors.card};
  color: ${({ theme }) => theme.colors.text};
  border: none;
  border-radius: 8px;
  box-sizing: border-box;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 250px;
  padding: 14px;
  background-color: ${({ theme }) => theme.colors.card};
  color: ${({ theme }) => theme.colors.text};
  border: none;
  border-radius: 8px;
  box-sizing: border-box;
`;

const Count = styled.p`
  text-align: right;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.subText};
`;

const ErrorMessage = styled.p`
  color: #ff6b6b;
  font-size: 13px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 30px;
`;

const BackButton = styled.button`
  padding: 12px 24px;
  background-color: ${({ theme }) => theme.colors.card};
  color: ${({ theme }) => theme.colors.text};
  border: none;
  border-radius: 8px;
`;

const SubmitButton = styled.button`
  padding: 12px 24px;
  background-color: ${({ theme }) => theme.colors.mainColor};
  border: none;
  border-radius: 8px;

  &:disabled {
    opacity: 0.5;
  }
`;
