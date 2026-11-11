import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import styled from "@emotion/styled";
import { getPosts } from "../apis/post";
import PostCard from "../components/PostCard";

const ListPage = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [keyword, setKeyword] = useState("");

  const { data, isPending, isError } = useQuery({
    queryKey: ["posts", keyword],
    queryFn: () => getPosts(keyword),
  });

  return (
    <Container>
      <SearchGroup>
        <SearchInput
          placeholder="제목으로 검색"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <SearchButton
          disabled={!input.trim()}
          onClick={() => setKeyword(input.trim())}
        >
          검색
        </SearchButton>
      </SearchGroup>

      {isPending ? (
        <Message>게시글을 불러오는 중...</Message>
      ) : isError ? (
        <Message>게시글을 불러오지 못했습니다.</Message>
      ) : data.posts.length === 0 ? (
        <Message>게시글이 없습니다.</Message>
      ) : (
        <PostList>
          {data.posts.map((post) => (
            <PostCard
              key={post.id}
              title={post.title}
              content={post.content}
              author={post.author}
              createdAt={post.createdAt}
              onClick={() => navigate(`/posts/${post.id}`)}
            />
          ))}
        </PostList>
      )}
    </Container>
  );
};

export default ListPage;

const Container = styled.main`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 32px 24px;
`;

const SearchGroup = styled.div`
  display: flex;
  gap: 10px;
  max-width: 860px;
  margin: 0 auto 24px;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 12px;
  background-color: ${({ theme }) => theme.colors.card};
  color: ${({ theme }) => theme.colors.text};
  border: none;
  border-radius: 8px;
`;

const SearchButton = styled.button`
  padding: 12px 24px;
  background-color: ${({ theme }) => theme.colors.mainColor};
  border: none;
  border-radius: 8px;

  
  }
`;

const PostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  max-width: 860px;
  margin: 0 auto;
`;

const Message = styled.p`
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  padding: 40px;
`;
