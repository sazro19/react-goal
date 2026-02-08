import {useEffect} from "react";

export default function useInfiniteScroll(loaderRef, loading, onIntersect) {
    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && !loading) {
                    onIntersect();
                }
            },
            {threshold: 1, rootMargin: "200px"}
        );

        if (loaderRef.current) observer.observe(loaderRef.current);
        return () => observer.disconnect();
    }, [loaderRef, loading, onIntersect]);
}
