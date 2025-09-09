// components/GameReviews.tsx
import { useGameReviews } from "../hooks/useGameReviews";

export default function GameReviews({ gameId }: { gameId: number }) {
    const { reviews, loading, error } = useGameReviews(gameId);

    if (loading) return <p>Ładowanie recenzji…</p>;
    if (error) return <p style={{ color: "salmon" }}>{error}</p>;

    const avg =
        reviews.length > 0
            ? reviews.reduce((s, r) => s + (r.rating || 0), 0) / reviews.length
            : 0;

    return (
        <div className="game-reviews">
            <h3>Recenzje</h3>

            <div className="game-reviews-stats">
                <span>Średnia: {avg.toFixed(1)} / 5</span>
                <span>·</span>
                <span>Liczba recenzji: {reviews.length}</span>
            </div>

            <ul className="game-reviews-list">
                {reviews.map((r) => (
                    <li key={r.id} className="game-review-item">
                        <div className="game-review-header">
                            <strong>{r.username ?? "Użytkownik"}</strong>
                            <span className="stars">
                {"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}
              </span>
                        </div>
                        {r.comment && <p className="game-review-comment">{r.comment}</p>}
                    </li>
                ))}
                {reviews.length === 0 && <li>Brak recenzji.</li>}
            </ul>
        </div>
    );
}
