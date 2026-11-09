import styled from "styled-components";
import type { Movie } from "../apis/MovieList";
import { Link } from "react-router-dom";

type MovieCardProps = {
  movie: Movie;
};

const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <Link to={`/movie/${movie.id}`}>
      <Card>
        <span className="score">★ {movie.vote_average.toFixed(1)}</span>
        {movie.poster_path ? (
          <img
            className="poster"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={`${movie.title} 포스터`}
          />
        ) : (
          <div className="poster">포스터 없음</div>
        )}

        <Info>
          <h2 className="title">{movie.title}</h2> {/*제목*/}
          <p className="releaseDate">{movie.release_date}</p> {/*개봉일*/}
          <p className="overview">
            {movie.overview || "등록된 줄거리가 없습니다."}
          </p>{" "}
          {/*줄거리*/}
        </Info>
      </Card>
    </Link>
  );
};

export default MovieCard;

//css==============================================================

const Card = styled.article`
  position: relative;
  background-color: ${({ theme }) => theme.colors.card};
  padding: 3px;
  height: 590px;
  border-radius: 12px;
  border: 2px solid ${({ theme }) => theme.colors.card};

  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.05);
    border-color: #adf7dc;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  }
  .score {
    position: absolute;
    top: 15px;
    left: 15px;
  }

  .poster {
    width: 100%;
    height: 400px;
    border-radius: 8px 8px 0 0;
    object-fit: cover;
  }

  div.poster {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.colors.card};
    color: #adf7dc;
    font-size: 18px;
  }
`;

const Info = styled.div`
  padding: 0px 18px;

  .title {
    font-size: 23px;
    margin-top: 10px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }
  .releaseDate {
    margin-top: -10px;
    font-size: 18px;

    color: #adf7dc;
  }
  .overview {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    margin-top: -5px;
  }
`;
