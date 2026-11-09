import apiClient from "./apiClient";

export type MovieDetailType = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  runtime: number | null;
  vote_count: number;
  status: string;
  original_title: string;
  original_language: string;
  origin_country: string[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  spoken_languages: {
    english_name: string;
    name: string;
    iso_639_1: string;
  }[];
  budget: number;
  revenue: number;
  genres: {
    id: number;
    name: string;
  }[];
};

// 영화 상세 정보 조회
export async function getMovieDetail(movieId: string) {
  const result = await apiClient.get<MovieDetailType>(`/movie/${movieId}`, {
    params: {},
  });

  return result.data;
}
