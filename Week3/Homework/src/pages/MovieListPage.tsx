import { useEffect, useState, useRef } from "react";
import { getMovieList } from "../apis/MovieList";
import type { Movie } from "../apis/MovieList";
import Rating from "../components/Rating";
import MovieCard from "../components/MovieCard";
import styled from "styled-components";

function MovieList() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState(false);
  const [rating, setRating] = useState<{
    min?: number;
    max?: number;
  }>({});

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const controller = new AbortController();

    let nextPage = 1;
    let requesting = false;
    let hasMore = true;
    let failed = false;
    let frameId = 0;

    async function loadMovies() {
      if (requesting || !hasMore || failed || controller.signal.aborted) {
        return;
      }

      requesting = true;

      try {
        const data = await getMovieList(
          rating.min,
          rating.max,
          nextPage,
          controller.signal,
        );

        if (controller.signal.aborted) return;

        const results = data.results.filter((movie) => {
          const score = movie.vote_average;

          const matchesMin = rating.min === undefined || score >= rating.min;

          const matchesMax =
            rating.max === undefined ||
            (rating.min === undefined && rating.max === 6
              ? score < 6
              : score <= rating.max);

          return matchesMin && matchesMax;
        });

        setMovies((prev) => {
          const seenIds = new Set(prev.map((movie) => movie.id));

          const newMovies = results.filter((movie) => {
            if (seenIds.has(movie.id)) return false;

            seenIds.add(movie.id);
            return true;
          });

          return [...prev, ...newMovies];
        });

        hasMore =
          data.page < Math.min(data.total_pages, 500) &&
          data.results.length > 0;

        nextPage = data.page + 1;
      } catch {
        if (!controller.signal.aborted) {
          // 실패하면 자동 요청 중단
          failed = true;
          setError(true);
        }
      } finally {
        requesting = false;

        if (!controller.signal.aborted && hasMore && !failed) {
          // 목록이 화면보다 짧으면 다음 페이지를 한 번씩 추가
          frameId = requestAnimationFrame(() => {
            frameId = requestAnimationFrame(() => {
              const bottom = bottomRef.current;

              if (
                bottom &&
                bottom.getBoundingClientRect().top <= window.innerHeight + 150
              ) {
                void loadMovies();
              }
            });
          });
        }
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          void loadMovies();
        }
      },
      {
        rootMargin: "0px 0px 150px 0px",
      },
    );

    void loadMovies();

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    return () => {
      observer.disconnect();
      controller.abort();
      cancelAnimationFrame(frameId);
    };
  }, [rating.min, rating.max]);

  return (
    <div>
      <PageTitle>영화 둘러보기</PageTitle>

      <Rating
        onSelect={(min, max) => {
          setMovies([]);
          setError(false);
          setRating({ min, max });
        }}
      />
      {error && (
        <p role="alert">영화 목록을 불러오지 못했습니다. 다시 시도해 주세요.</p>
      )}

      <MovieGrid>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </MovieGrid>

      <div ref={bottomRef} style={{ height: "1px" }} />
    </div>
  );
}

export default MovieList;

//css=============================================================
const PageTitle = styled.h1`
  margin-top: -25px;
`;

const MovieGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 30px;
  @media (max-width: 2000px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  @media (max-width: 1700px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  @media (max-width: 1400px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (max-width: 1000px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`;
