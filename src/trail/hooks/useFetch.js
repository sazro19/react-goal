import {useCallback, useEffect, useState} from "react";

export function useFetch(url, page = 1, perPage = 10) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const [forceRefresh, setForceRefresh] = useState(false);
    const retry = () => {
        setForceRefresh(true);
        fetchData();
    };

    const fetchData = useCallback(() => {
        setLoading(true);
        setError(null);
        fetch(`${url}?_page=${page}&_per_page=${perPage}`)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch data");
                return res.json();
            })
            .then((newData) => {
                if (forceRefresh) {
                    const startIndex = (page - 1) * perPage;
                    setData(prev => {
                        const updated = [...prev];
                        updated.splice(startIndex, perPage, ...newData.data);
                        return updated;
                    });

                    setForceRefresh(false);
                    return;
                }

                if (hasMore) {
                    setData(prev => page === 1 ? newData.data : [...prev, ...newData.data]);
                    if (!newData.next) {
                        setHasMore(false);
                    }
                }
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [url, page, perPage, forceRefresh, hasMore]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return {data, loading, error, retry, setData, hasMore};
}
