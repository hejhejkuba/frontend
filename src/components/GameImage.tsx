import { useImageStatus } from '../hooks/useImageStatus';
import '../styles/gameImage.css';


const GameImage = ({
                       gameId,
                       title,
                       fullSize = false,
                   }: {
    gameId: number | undefined;
    title: string;
    fullSize?: boolean;
}) => {
    const { isLoaded, hasError, handleLoad, handleError } = useImageStatus();
    const imageUrl = `/api/games/${gameId}/image`;

    const imageClass = fullSize ? 'game-image-full' : 'game-image';

    return (
        <div className="game-image-wrapper">
            {!isLoaded && !hasError && <p>🔄 Ładowanie obrazka...</p>}

            {!hasError ? (
                <img
                    className={imageClass}
                    src={imageUrl}
                    alt={title}
                    onLoad={handleLoad}
                    onError={handleError}
                    style={{ display: isLoaded ? 'block' : 'none' }}
                />
            ) : (
                <img
                    className={imageClass}
                    src="/public/placeholder.jpg"
                    alt="Brak obrazka"
                />
            )}
        </div>
    );
};

export default GameImage;
