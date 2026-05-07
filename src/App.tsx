import { useMemo, useState } from "react";
import "./App.css";
import { gameReviews } from "./data/reviews";
import type { GameGenre, GameReview } from "./types/review";

type GenreFilter = "All" | GameGenre;
type SortOption = "default" | "high" | "low";

function App() {
  const [searchText, setSearchText] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<GenreFilter>("All");
  const [sortOption, setSortOption] = useState<SortOption>("default");
  const [selectedReview, setSelectedReview] = useState<GameReview | null>(null);

  const genres: GenreFilter[] = ["All", "RPG", "FPS", "MOBA", "Action", "Adventure", "Simulation"];

  const filteredReviews = useMemo(() => {
    let reviews = gameReviews.filter((review) => {
      const matchesSearch = review.title
        .toLowerCase()
        .includes(searchText.toLowerCase());

      const matchesGenre =
        selectedGenre === "All" || review.genre === selectedGenre;

      return matchesSearch && matchesGenre;
    });

    if (sortOption === "high") {
      reviews = [...reviews].sort((a, b) => b.rating - a.rating);
    }

    if (sortOption === "low") {
      reviews = [...reviews].sort((a, b) => a.rating - b.rating);
    }

    return reviews;
  }, [searchText, selectedGenre, sortOption]);

  const averageRating =
    gameReviews.reduce((sum, review) => sum + review.rating, 0) /
    gameReviews.length;

  return (
    <main className="app">
      <section className="hero">
        <p className="eyebrow">Game Review Archive</p>
        <h1>게임 리뷰 아카이브</h1>
        <p className="description">
          React와 TypeScript를 활용하여 구현한 간단한 게임 리뷰 조회 시스템입니다.
          게임 제목 검색, 장르 필터링, 평점순 정렬 기능을 제공합니다.
        </p>
      </section>

      <section className="stats">
        <div className="stat-card">
          <span>전체 리뷰</span>
          <strong>{gameReviews.length}개</strong>
        </div>
        <div className="stat-card">
          <span>평균 평점</span>
          <strong>{averageRating.toFixed(1)} / 10</strong>
        </div>
        <div className="stat-card">
          <span>검색 결과</span>
          <strong>{filteredReviews.length}개</strong>
        </div>
      </section>

      <section className="controls">
        <input
          type="text"
          placeholder="게임 제목 검색"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />

        <select
          value={selectedGenre}
          onChange={(event) => setSelectedGenre(event.target.value as GenreFilter)}
        >
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre === "All" ? "전체 장르" : genre}
            </option>
          ))}
        </select>

        <select
          value={sortOption}
          onChange={(event) => setSortOption(event.target.value as SortOption)}
        >
          <option value="default">기본순</option>
          <option value="high">평점 높은순</option>
          <option value="low">평점 낮은순</option>
        </select>
      </section>

      <section className="review-grid">
        {filteredReviews.map((review) => (
          <article key={review.id} className="review-card">
            <div className="card-header">
              <div>
                <span className="genre">{review.genre}</span>
                <h2>{review.title}</h2>
              </div>
              <strong className="rating">{review.rating.toFixed(1)}</strong>
            </div>

            <p>{review.summary}</p>

            <div className="card-footer">
              <span className={review.recommended ? "recommend" : "not-recommend"}>
                {review.recommended ? "추천" : "비추천"}
              </span>
              <button onClick={() => setSelectedReview(review)}>상세 보기</button>
            </div>
          </article>
        ))}
      </section>

      {filteredReviews.length === 0 && (
        <p className="empty-message">조건에 맞는 게임 리뷰가 없습니다.</p>
      )}

      {selectedReview && (
        <div className="modal-backdrop" onClick={() => setSelectedReview(null)}>
          <div className="modal" onClick={(event) => event.stopPropagation()}>
            <span className="genre">{selectedReview.genre}</span>
            <h2>{selectedReview.title}</h2>
            <strong className="modal-rating">
              평점 {selectedReview.rating.toFixed(1)} / 10
            </strong>
            <p>{selectedReview.detail}</p>
            <button onClick={() => setSelectedReview(null)}>닫기</button>
          </div>
        </div>
      )}
    </main>
  );
}

export default App;