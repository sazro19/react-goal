import { useCallback, useEffect, useState } from "react";

export function useFavoritePosts(favourites, pageSize = 5) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [page, setPage] = useState(1);

    const fetchData = useCallback(async () => {
        if (!favourites || favourites.length === 0) {
            setData([]);
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        let cancelled = false;

        try {
            const posts = await Promise.all(
                favourites.map(id =>
                    fetch(`http://localhost:3000/posts/${id}`).then(r => {
                        if (!r.ok) throw new Error(`Failed to load post ${id}`);
                        return r.json();
                    })
                )
            );

            if (!cancelled) {
                setData(posts);
            }
        } catch (err) {
            if (!cancelled) {
                setError(err.message);
            }
        } finally {
            if (!cancelled) {
                setLoading(false);
            }
        }

        return () => {
            cancelled = true;
        };
    }, [favourites]);

    const retry = () => fetchData();

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const totalPages = Math.ceil(data.length / pageSize) || 1;

    useEffect(() => {
        setPage(prev => {
            if (prev > totalPages) return totalPages;
            if (prev < 1) return 1;
            return prev;
        });
    }, [totalPages]);

    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    const paginatedPosts = data.slice(start, end);

    return {
        posts: paginatedPosts,
        loading,
        error,
        retry,
        setData,
        page,
        setPage,
        totalPages
    };
}
