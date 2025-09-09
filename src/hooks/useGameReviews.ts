// hooks/useGameReviews.ts
import { useEffect, useState } from "react";

export type GameReview = {
    id: number;
    user_id: number;
    username: string;
    rating: number;
    comment: string | null;
};

export function useGameReviews(gameId?: number) {
    const [reviews, setReviews] = useState<GameReview[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!gameId) return;
        let cancelled = false;

        (async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/games/${gameId}/reviews`);
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const data: GameReview[] = await res.json();
                if (!cancelled) setReviews(data);
            } catch (e: any) {
                if (!cancelled) setError(e.message || "Błąd ładowania recenzji");
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();

        return () => { cancelled = true; };
    }, [gameId]);

    return { reviews, loading, error };
}
