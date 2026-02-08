import {useContext} from "react";
import {AuthContext} from "../components/auth/js/AuthContext.js";

export function usePostActions(setData) {
    const {user, setUser} = useContext(AuthContext);

    const toggleFavorite = async (postId) => {
        if (!user) return;

        const isFav = user.favorites.includes(postId);
        const updatedFavorites = isFav
            ? user.favorites.filter(id => id !== postId)
            : [...user.favorites, postId];

        await fetch(`http://localhost:3000/users/${user.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ favorites: updatedFavorites })
        });

        setUser(prev => ({
            ...prev,
            favorites: updatedFavorites
        }));
    };

    const handleEditUpdate = (id, newTitle, newText) => {
        if (!setData) return;

        setData(prev =>
            prev.map(item =>
                item.id === id
                    ? { ...item, title: newTitle, text: newText }
                    : item
            )
        );
    };

    const handleDelete = async (postId) => {
        await fetch(`http://localhost:3000/posts/${postId}`, {
            method: "DELETE"
        });

        if (setData) {
            setData(prev => prev.filter(item => item.id !== postId));
        }
    };

    return { toggleFavorite, handleEditUpdate, handleDelete };
}
