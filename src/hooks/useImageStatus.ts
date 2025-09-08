import { useState } from 'react';

export const useImageStatus = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    const handleLoad = () => setIsLoaded(true);
    const handleError = () => {
        setIsLoaded(true);
        setHasError(true);
    };

    return {
        isLoaded,
        hasError,
        handleLoad,
        handleError,
    };
};
