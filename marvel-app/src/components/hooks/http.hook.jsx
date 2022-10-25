import { useState, useCallback } from "react";

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback(async (url, method = 'GET', body = null, headers = { 'Content-Type': 'aplication/json' }) => {

        setLoading(loading => true);

        try {
            const response = await fetch(url, { method, body, headers });

            if (!response.ok) {
                throw new Error(`Coud not fetch ${url}, status: ${response.status}`)
            }

            const data = await response.json();

            setLoading(loading => false);
            return data
        } catch (error) {
            setLoading(loading => false);
            setError(error.message);
            throw error;
        }
        // eslint-disable-next-line
    }, []);

    const clearError = useCallback(() => setError(null), []);

    return { loading, request, error, clearError }
}