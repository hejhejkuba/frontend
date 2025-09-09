import { useParams } from 'react-router-dom';
import { useGame } from '../hooks/useGame';
import GameImage from "./GameImage.tsx";
import '../styles/gameViewDetails.css'
import GameReviews from "./GameReviews.tsx";

const GameViewDetails = () => {
    const { id } = useParams();
    const gameId = id ? parseInt(id) : undefined;
    const { game, loading, error } = useGame(gameId);

    if (loading) return <p>🔄 Ładowanie gry...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (!game) return <p>Gra nie została znaleziona.</p>;

    // obliczenie ceny po rabacie
    const finalPrice =
        game.price * (1 - game.discount / 100);

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
                        Cena:{" "}
                        {`${game.price.toFixed(2)} zł`}
                    </p>

                    {game.discount > 0 && (
                        <p className="game-details-discount">
                            Zniżka: {game.discount}% <br />
                            Cena po zniżce:{" "}
                            {finalPrice ? `${finalPrice.toFixed(2)} zł` : "Brak danych"}
                        </p>
                    )}

                    {game.genres && game.genres.length > 0 && (
                        <p className="game-details-genres">
                            {game.genres.join(", ")}
                        </p>
                    )}

                    {game.tags && game.tags.length > 0 && (
                        <p className="game-details-tags">
                            {game.tags.join(", ")}
                        </p>
                    )}
                </div>
            </div>
            <div className="game-details-info">
                {/* ...opis, cena, zniżka, gatunki, tagi... */}
                {gameId !== undefined && <GameReviews gameId={gameId} />}
            </div>

        </div>
    );
};

export default GameViewDetails;
