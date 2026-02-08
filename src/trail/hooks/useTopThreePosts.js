import { useEffect, useState } from "react";

export function useTopThreePosts(url) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);

        fetch(url)
            .then(res => {
                if (!res.ok) throw new Error("Failed to fetch posts");
                return res.json();
            })
            .then(json => {
                const arr = json.data || json;

                const topThree = [...arr]
                    .sort((a, b) => b.statistics.views - a.statistics.views)
                    .slice(0, 3);

                setPosts(topThree);
            })
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, [url]);

    return { posts, loading, error, setPosts };
}
