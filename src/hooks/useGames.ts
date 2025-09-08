import { useEffect, useState } from 'react';
import axios from '../axios';
import {Game} from "../types/Game.ts";


export const useGames = () => {
    const [games, setGames] = useState<Game[]>([]);
    const [msg, setMsg] = useState('');
    const [error, setError] = useState('');

    const fetchGames = async () => {
        try {
            const res = await axios.get('api/games');
            console.log('🧾 Gry z backendu:', res.data);

            if (Array.isArray(res.data)) {
                setGames(res.data);
                setMsg('✅ Gry pobrane z serwera!');
            } else {
                console.warn('⚠️ Backend nie zwrócił tablicy:', res.data);
                setError('Dane z serwera są nieprawidłowe.');
            }
        } catch (err) {
            console.error('❌ Błąd przy pobieraniu gier:', err);
            setError('Nie udało się pobrać gier.');
        }
    };

    useEffect(() => {
        fetchGames();
    }, []);

    return { games, msg, error };
};
