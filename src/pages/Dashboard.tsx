import { useGames } from '../hooks/useGames';
import GameImage from '../components/GameImage';
import { Link } from 'react-router-dom';
import '../styles/dashboard.css';

const Dashboard = () => {
    const { games, msg, error } = useGames();

    return (
        <div className="dashboard-container">
            <h2 className="dashboard-title">🎮 Lista gier</h2>

            {msg && <p className="dashboard-msg">{msg}</p>}
            {error && <p className="dashboard-error">{error}</p>}

            {games.length > 0 ? (
                <div className="games-grid">
                    {games.map((game) => (
                        <div key={game.id} className="game-card">
                            <GameImage gameId={game.id} title={game.title} />

                            <h3 className="game-title">
                                <Link to={`/games/${game.id}`} className="game-link">
                                    {game.title}
                                </Link>
                            </h3>

                            <p className="game-description">{game.description}</p>

                            <p className="game-price">
                                Cena: {typeof game.price === 'number' ? `${game.price.toFixed(2)} zł` : 'Brak danych'}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Brak gier do wyświetlenia.</p>
            )}
        </div>
    );
};

export default Dashboard;
