import {useCallback, useEffect, useState} from "react";

export function useFavoritePosts(favorites, pageSize = 5, onCleanFavorites) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);

    const fetchData = useCallback(async () => {
        if (!Array.isArray(favorites) || favorites.length === 0) {
            setData([]);
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        let cancelled = false;

        try {
            const missingIds = [];

            const posts = (
                await Promise.all(
                    favorites.map(async (id) => {
                        const res = await fetch(`http://localhost:3000/posts/${id}`);

                        if (!res.ok) {
                            missingIds.push(id);
                            return null;
                        }

                        return res.json();
                    })
                )
            ).filter(Boolean);

            if (!cancelled) {
                setData(posts);

                if (
                    missingIds.length > 0
                ) {
                    const stillMissing = favorites.filter((id) =>
                        missingIds.includes(id)
                    );

                    if (stillMissing.length > 0) {
                        onCleanFavorites(stillMissing);
                    }
                }
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
    }, [favorites, onCleanFavorites]);

    const retry = () => fetchData();

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const totalPages = Math.ceil(data.length / pageSize) || 1;

    useEffect(() => {
        setPage((prev) => {
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
