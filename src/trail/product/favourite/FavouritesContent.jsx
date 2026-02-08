import { useFavoritePosts } from "../../loading/useFavoritePosts.js";
import ErrorMessage from "../../loading/errors/ErrorMessage.jsx";
import ProductCard from "../ProductCard.jsx";
import { usePostActions } from "../../loading/usePostActions.js";
import LoadingSpinner from "../../loading/spinner/LoadingSpinner.jsx";
import Pagination from "../pagination/Pagination.jsx";
import { useEffect } from "react";
import "./FavouritesContent.css";

const FavouritesContent = ({ user }) => {
    const {
        posts,
        loading,
        error,
        retry,
        page,
        setPage,
        totalPages
    } = useFavoritePosts(user.favorites, 3);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [page]);

    const { toggleFavorite } = usePostActions();

    if (error) return <ErrorMessage message={error} onRetry={retry} />;
    if (loading) return <LoadingSpinner />;
    if (!loading && posts.length === 0) return <div>No favourite posts yet</div>;

    return (
        <div className="favorite-page">
            <Pagination
                totalPages={totalPages}
                page={page}
                setPage={setPage}
            />
            
            <div className="favourites-list">
                {posts.map(product => (
                    <ProductCard
                        key={product.id}
                        {...product}
                        isFavorite={user.favorites.includes(product.id)}
                        onToggleFavorite={toggleFavorite}
                    />
                ))}
            </div>
        </div>
    );
};

export default FavouritesContent;
