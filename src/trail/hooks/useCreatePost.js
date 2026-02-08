import { useState } from "react";

export default function useCreatePost() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const createPost = async (title, text) => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await fetch("http://localhost:3000/posts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title,
                    text,
                    statistics: {
                        views: 0,
                        likes: 0,
                        dislikes: 0
                    }
                })
            });

            if (!response.ok) {
                setError("Failed to create post");
                return null;
            }

            const createdPost = await response.json();
            setSuccess("Post created successfully!");
            return createdPost;
        } catch (err) {
            setError("Error creating post");
            console.error(err);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { createPost, loading, error, success };
}
