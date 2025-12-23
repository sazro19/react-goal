import { useEffect, useState, useCallback } from "react";

export function useFetch(url, page = 1, perPage = 10) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasMore, setHasMore] = useState(true);

    const fetchData = useCallback(() => {
        setLoading(true);
        setError(null);
        console.log(`${url}?_page=${page}&_per_page=${perPage}`)
        fetch(`${url}?_page=${page}&_per_page=${perPage}`)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch data");
                return res.json();
            })
            .then((newData) => {
                if (hasMore) {
                    setData(prev => page === 1 ? newData.data : [...prev, ...newData.data]); // append new page
                    if (newData.next === undefined || newData.next === null) {
                        setHasMore(false);
                    }
                }
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [url, page, perPage]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, retry: fetchData };
}
