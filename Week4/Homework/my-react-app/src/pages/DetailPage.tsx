import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import styled from "@emotion/styled";
import { getPostDetail, deletePost } from "../apis/post";

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data, isPending, isError } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getPostDetail(id!),
  });
  const { mutate, isPending: isDeleting } = useMutation({
    mutationFn: () => deletePost(id!),

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["posts"] });

      alert("삭제되었습니다.");
      navigate("/posts");
    },

    onError: () => {
      alert("게시글을 삭제하지 못했습니다.");
    },
  });

  const handleDelete = () => {
    if (window.confirm("정말 삭제할까요?")) {
      mutate();
    }
  };
  if (isPending) {
    return <Text>불러오는 중...</Text>;
  }

  if (isError) {
    return <Text>게시글을 불러오지 못했습니다.</Text>;
  }

  return (
    <Content>
      <BackButton onClick={() => navigate("/posts")}>← 목록으로</BackButton>

      <PostBox>
        <Title>{data.title}</Title>

        <Info>
          <span>{data.author}</span>
          <span>{new Date(data.createdAt).toLocaleString("ko-KR")}</span>
        </Info>

        <PostContent>{data.content}</PostContent>

        <ButtonGroup>
          <EditButton onClick={() => navigate(`/posts/${id}/edit`)}>
            수정
          </EditButton>
          <DeleteButton disabled={isDeleting} onClick={handleDelete}>
            삭제
          </DeleteButton>
        </ButtonGroup>
      </PostBox>
    </Content>
  );
};

export default DetailPage;
const Text = styled.main`
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;

const Content = styled.div`
  max-width: 860px;
  margin: 0 auto;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.mainColor};
  cursor: pointer;
  margin-bottom: 24px;
`;

const PostBox = styled.div`
  background-color: ${({ theme }) => theme.colors.card};
  padding: 30px;
  border-radius: 12px;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 16px;
`;

const Info = styled.div`
  display: flex;
  gap: 16px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.subText};
  margin-bottom: 30px;
`;

const PostContent = styled.p`
  font-size: 16px;
  line-height: 1.8;
  white-space: pre-wrap;
  margin-bottom: 40px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const EditButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
`;

const DeleteButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.mainColor};
  color: white;
`;
