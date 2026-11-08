import axios from "axios";

interface ListResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  data: {
    nextCursor: number | null;
    hasNext: boolean;
  };
}

// 게시글 목록 조회 API
export const getPosts = async (keyword = "") => {
  const response = await axios.get<ListResponse>(
    "https://playsopt.o-r.kr/api/v1/posts",
    {
      params: {
        keyword: keyword || undefined,
        size: 10,
      },
    },
  );
  return response.data.data;
};

interface PostDetail {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

interface DetailResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  data: PostDetail;
}

// 게시글 상세 조회 API
export const getPostDetail = async (id: string) => {
  const response = await axios.get<DetailResponse>(
    `https://playsopt.o-r.kr/api/v1/posts/${id}`,
  );

  return response.data.data;
};

// 게시글 수정 API
export const updatePost = async (
  id: string,
  title: string,
  content: string,
) => {
  const code = localStorage.getItem("authorizationCode");

  const response = await axios.put(
    `https://playsopt.o-r.kr/api/v1/posts/${id}`,
    { title, content },
    {
      headers: {
        Authorization: code,
      },
    },
  );

  return response.data.data;
};

// 게시글 삭제 API
export const deletePost = async (id: string) => {
  const code = localStorage.getItem("authorizationCode");

  await axios.delete(`https://playsopt.o-r.kr/api/v1/posts/${id}`, {
    headers: {
      Authorization: code,
    },
  });
};

// 게시글 작성 API
export const createPost = async (
  title: string,
  content: string,
  author: string,
) => {
  const code = localStorage.getItem("authorizationCode");

  const response = await axios.post(
    "https://playsopt.o-r.kr/api/v1/posts",
    { title, content, author },
    {
      headers: {
        Authorization: code,
      },
    },
  );

  return response.data.data;
};
