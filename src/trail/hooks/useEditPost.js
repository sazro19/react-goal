import { useState } from "react";

export default function useEditPost() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const editPost = async (id, title, text) => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`http://localhost:3000/posts/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, text })
            });

            if (!res.ok) {
                setError("Failed to update post");
                return null;
            }

            return await res.json();
        } catch (err) {
            setError("Server error: " + err);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { editPost, loading, error };
}
