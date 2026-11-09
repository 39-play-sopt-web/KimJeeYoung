// 영화 목록 조회
import apiClient from "./apiClient";

export type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
};

type MovieListResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export async function getMovieList(
  minRating?: number,
  maxRating?: number,
  page: number = 1,
  signal?: AbortSignal,
) {
  const result = await apiClient.get<MovieListResponse>("/discover/movie", {
    params: {
      "vote_average.gte": minRating,
      "vote_average.lte": maxRating,
      page,
    },
    signal,
  });

  return result.data;
}
