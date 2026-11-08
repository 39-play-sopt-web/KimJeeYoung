import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import styled from "@emotion/styled";
import { getPostDetail, updatePost } from "../apis/post";

const EditPage = () => {
  const { id } = useParams();

  const { data, isPending, isError } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getPostDetail(id!),
  });

  if (isPending) {
    return <Message>불러오는 중...</Message>;
  }

  if (isError || !data) {
    return <Message>게시글을 불러오지 못했습니다.</Message>;
  }

  return <EditForm id={id!} title={data.title} content={data.content} />;
};

interface EditFormProps {
  id: string;
  title: string;
  content: string;
}

const EditForm = ({ id, title, content }: EditFormProps) => {
  const navigate = useNavigate();
  const [newTitle, setNewTitle] = useState(title);
  const [newContent, setNewContent] = useState(content);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => updatePost(id, newTitle, newContent),

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["posts"] });
      await queryClient.invalidateQueries({ queryKey: ["post", id] });

      alert("수정되었습니다.");
      navigate(`/posts/${id}`);
    },

    onError: () => {
      alert("게시글을 수정하지 못했습니다.");
    },
  });

  return (
    <EditBox>
      <h2>게시글 수정</h2>

      <Label>제목</Label>
      <Input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />

      <Label>본문</Label>
      <Textarea
        value={newContent}
        onChange={(e) => setNewContent(e.target.value)}
      />

      <ButtonGroup>
        <BackButton onClick={() => navigate(`/posts/${id}`)}>취소</BackButton>

        <SubmitButton disabled={isPending} onClick={() => mutate()}>
          수정 완료
        </SubmitButton>
      </ButtonGroup>
    </EditBox>
  );
};

export default EditPage;

const EditBox = styled.main`
  max-width: 860px;
  margin: 0 auto;
  padding: 40px 24px;
  color: ${({ theme }) => theme.colors.text};
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

  }
`;

const SubmitButton = styled.button`
  padding: 12px 24px;
  background-color: ${({ theme }) => theme.colors.mainColor};
  border: none;
  border-radius: 8px;
  
  }

  &:disabled {
    opacity: 0.5;
  }
`;

const Message = styled.p`
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  padding: 40px;
`;
