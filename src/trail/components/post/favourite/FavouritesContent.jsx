import {useFavoritePosts} from "../../../hooks/useFavoritePosts.js";
import ErrorMessage from "../../errors/ErrorMessage.jsx";
import PostCard from "../card/PostCard.jsx";
import {usePostActions} from "../../../hooks/usePostActions.js";
import LoadingSpinner from "../../spinner/LoadingSpinner.jsx";
import Pagination from "../pagination/Pagination.jsx";
import {useCallback, useEffect} from "react";
import "./css/FavouritesContent.css";

const FavouritesContent = ({user, setUser}) => {
    const handleCleanFavorites = useCallback((missingIds) => {
        setUser(prev => ({
            ...prev,
            favorites: Array.isArray(prev.favorites)
                ? prev.favorites.filter(id => !missingIds.includes(id))
                : []
        }));
    }, [setUser]);

    const {
        posts,
        loading,
        error,
        retry,
        page,
        setPage,
        totalPages
    } = useFavoritePosts(user.favorites, 3, handleCleanFavorites);

    useEffect(() => {
        window.scrollTo({top: 0, behavior: "smooth"});
    }, [page]);

    const {toggleFavorite} = usePostActions();

    if (error) return <ErrorMessage message={error} onRetry={retry}/>;
    if (loading) return <LoadingSpinner/>;
    if (!loading && posts.length === 0) return <div>No favourite posts yet</div>;

    return (
        <div className="favorite-page">
            <Pagination
                totalPages={totalPages}
                page={page}
                setPage={setPage}
            />

            <div className="favourites-list">
                {posts.map(post => (
                    <PostCard
                        key={post.id}
                        {...post}
                        isFavorite={user.favorites.includes(post.id)}
                        onToggleFavorite={toggleFavorite}
                        onDelete={null}
                        onEdit={null}
                    />
                ))}
            </div>
        </div>
    );
};

export default FavouritesContent;
