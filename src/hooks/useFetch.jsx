import { useState, useEffect } from 'react';

export const useFetch = (url, options) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(url, options);
                const json = await res.json();
                setResponse(json);
                setLoading(false)
            } catch (error) {
                setError(error);
                setLoading(false)
            }
        };
        fetchData();
    }, []);
    return { response, error, isLoading };
};