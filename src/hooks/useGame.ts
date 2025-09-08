import { useEffect, useState } from 'react';
import axios from '../axios';
import {Game} from "../types/Game.ts";

export const useGame = (gameId: number | undefined) => {
    const [game, setGame] = useState<Game | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!gameId) return;
        const fetchGame = async () => {
            try {
                const res = await axios.get(`/api/games/${gameId}`);
                console.log(res);
                setGame(res.data);
            } catch (err) {
                console.error('❌ Błąd podczas pobierania gry:', err);
                setError('Nie udało się pobrać gry.');
            } finally {
                setLoading(false);
            }
        };

        fetchGame();
    }, [gameId]);

    return { game, loading, error };
};
