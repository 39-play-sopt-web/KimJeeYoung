import styled from "@emotion/styled";

interface PostCardProps {
  title: string;
  content: string;
  author: string;
  createdAt: string;
  onClick: () => void;
}

const PostCard = ({
  title,
  content,
  author,
  createdAt,
  onClick,
}: PostCardProps) => {
  return (
    <Card onClick={onClick}>
      <Title>{title}</Title>
      <Content>{content}</Content>

      <Info>
        <span>{author}</span>
        <span>{new Date(createdAt).toLocaleString("ko-KR")}</span>
      </Info>
    </Card>
  );
};

export default PostCard;

const Card = styled.article`
  background-color: ${({ theme }) => theme.colors.card};
  border: 1px solid transparent;
  border-radius: 14px;
  padding: 24px;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;

  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.hover};
    transform: scale(1.015);
    box-shadow: 0 0 20px rgba(52, 213, 173, 0.15);
  }
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 12px;
`;

const Content = styled.p`
  font-size: 14px;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.subText};
  margin: 0 0 14px;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.subText};

  span:first-of-type {
    color: ${({ theme }) => theme.colors.mainColor};
    font-weight: 600;
  }
`;
