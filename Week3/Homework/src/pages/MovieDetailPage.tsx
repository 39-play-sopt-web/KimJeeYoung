import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getMovieDetail } from "../apis/MovieDetail";
import type { MovieDetailType } from "../apis/MovieDetail";
import { useEffect, useState } from "react";
import styled from "styled-components";

function MovieDetail() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState<MovieDetailType | null>(null);

  useEffect(() => {
    async function loadMovie() {
      if (!movieId) return;

      try {
        const data = await getMovieDetail(movieId);
        setMovie(data);
      } catch (error) {
        console.error("영화 상세 정보 조회 실패:", error);
      }
    }

    loadMovie();
  }, [movieId]);

  if (!movie) return null;
  return (
    <div>
      <h2>
        <Link to="/" style={{ color: "#adf7dc", fontSize: "20px" }}>
          ← 목록으로 돌아가기
        </Link>
      </h2>
      <Top $backdrop={movie.backdrop_path}>
        <img
          className="poster"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <Right>
          <h1 className="title">{movie.title}</h1> {/*제목*/}
          <Info>
            <p className="score">★ {movie.vote_average.toFixed(1)}</p>{" "}
            {/*평점*/}
            <p className="releaseDate">{movie.release_date}</p> {/*개봉일*/}
            <p className="runTime">
              {movie.runtime !== null
                ? `${Math.floor(movie.runtime / 60)}시간 ${movie.runtime % 60}분`
                : "정보 없음"}
            </p>{" "}
            {/*러닝타임*/}
            <p className="vote_count">
              투표 {movie.vote_count.toLocaleString("ko-KR")}명
            </p>{" "}
            {/*투표수*/}
            <p className="status">{movie.status}</p> {/*개봉상태*/}
          </Info>
          <Genres>
            {movie.genres.map((genre) => (
              <span key={genre.id}>{genre.name}</span>
            ))}{" "}
            {/*장르*/}
          </Genres>
        </Right>
      </Top>
      <h2 style={{ marginTop: "60px" }}>줄거리</h2>
      <p className="overview">
        {movie.overview || "등록된 줄거리가 없습니다."}
      </p>{" "}
      {/*줄거리*/}
      <h2 style={{ marginTop: "60px" }}>기본 정보</h2>
      <BasicInfo>
        <p className="orignial_title">
          <span>원제</span>
          <br />
          {movie.original_title}
        </p>{" "}
        <p className="original_language">
          <span>원어</span>
          <br />
          {movie.original_language}
        </p>{" "}
        {/*원어*/}
        <p className="production_countries">
          <span>제작국가</span>
          <br />
          {movie.production_countries.map((country) => country.name).join(", ")}
        </p>
        {/*제작국가*/}
        <p className="spoken_languages">
          <span>사용언어</span>
          <br />
          {movie.spoken_languages.map((language) => language.name).join(", ")}
        </p>
        {/*사용언어*/}
        <p className="budget">
          <span>예산</span>
          <br />${movie.budget.toLocaleString("ko-KR")}
        </p>{" "}
        {/*예산*/}
        <p className="revenue">
          <span>수익</span>
          <br />${movie.revenue.toLocaleString("ko-KR")}
        </p>{" "}
        {/*수익*/}
      </BasicInfo>
    </div>
  );
}

export default MovieDetail;

//css=============================================================

//상단부 전체
const Top = styled.div<{ $backdrop: string | null }>`
  background-image:
    linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(22, 23, 30, 1)),
    url(${({ $backdrop }) =>
      $backdrop ? `https://image.tmdb.org/t/p/original${$backdrop}` : ""});

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  border-radius: 20px;
  padding: 40px;

  display: flex;
  gap: 30px;

  .poster {
    border-radius: 10px;
    width: 300px;
    height: 450px;
  }
  .status {
    border: 1px solid #ffffffb5;
    border-radius: 10px;
    padding: 4px 8px;
  }
`;

//상단부 오른쪽
const Right = styled.div``;

//상단부 오른쪽 정보
const Info = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.colors.text};
`;

//상단부 오른쪽 장르
const Genres = styled.div`
  display: flex;
  gap: 10px;
  span {
    border: 1px solid #48635f;
    border-radius: 20px;
    padding: 5px 10px;

    background-color: #48635f;
    color: #80e3e0;
  }
`;

//하단부 기본 정보
const BasicInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 25px;

  p {
    height: 80px;
    border: 1px solid ${({ theme }) => theme.colors.card};
    border-radius: 10px;
    padding: 20px;
    font-weight: bold;
    line-height: 2;
    background-color: ${({ theme }) => theme.colors.card};
  }
  span {
    color: ${({ theme }) => theme.colors.text};
  }
`;
