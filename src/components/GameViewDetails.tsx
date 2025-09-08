import { useParams } from 'react-router-dom';
import { useGame } from '../hooks/useGame';
import GameImage from "./GameImage.tsx";
import '../styles/gameViewDetails.css'

const GameViewDetails = () => {
    const { id } = useParams();
    const gameId = id ? parseInt(id) : undefined;
    const { game, loading, error } = useGame(gameId);
    if (loading) return <p>🔄 Ładowanie gry...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    if (!game) return <p>Gra nie została znaleziona.</p>;
    return (
        <div className="game-details-container">
            <h2 className="game-details-header">{game.title}</h2>
            <div className="game-details-content">
                <div className="game-details-image">
                    <GameImage gameId={gameId} title={game.title} fullSize />
                </div>
                <div className="game-details-info">
                    <p className="game-details-description">{game.description}</p>
                    <p className="game-details-price">
                        Cena: {typeof game.price === 'number' ? `${game.price.toFixed(2)} zł` : 'Brak danych'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default GameViewDetails;