import React, { useState, useRef, useContext, useEffect } from "react";
import { AuthContext } from "../../auth/js/AuthContext.js";
import "./css/AddPost.css";
import { useRequireAuth } from "../../../hooks/useRequireAuth.js";
import useCreatePost from "../../../hooks/useCreatePost.js";

const MAX_TITLE_LENGTH = 100;

const AddPost = () => {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const textareaRef = useRef(null);
    const { user } = useContext(AuthContext);
    useRequireAuth(user);

    const { createPost, loading, error: postError, success } = useCreatePost();

    const handleTitleChange = (e) => {
        const value = e.target.value;
        setTitle(value);

        if (value.length > MAX_TITLE_LENGTH) {
            setErrors((prev) => ({
                ...prev,
                title: `Title must be under ${MAX_TITLE_LENGTH} characters.`
            }));
        } else {
            setErrors((prev) => {
                const updated = { ...prev };
                delete updated.title;
                return updated;
            });
        }
    };

    const validate = () => {
        const newErrors = {};

        if (!title.trim()) {
            newErrors.title = "Title is required.";
        } else if (title.length > MAX_TITLE_LENGTH) {
            newErrors.title = `Title must be under ${MAX_TITLE_LENGTH} characters.`;
        }

        if (!text.trim()) {
            newErrors.text = "Text is required.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        if (!validate()) return;

        const created = await createPost(title, text);

        if (created) {
            setTitle("");
            setText("");
            setErrors({});
            setSubmitted(false);
        }
    };

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [text]);

    return (
        <form className="add-post-form" onSubmit={handleSubmit}>
            <h2 className="add-post-form__title">Create New Post</h2>

            <div className="add-post-form__group">
                <label className="add-post-form__label">Post Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    className={`add-post-form__input ${errors.title ? "invalid" : ""}`}
                    placeholder="Enter title"
                />
                {submitted && errors.title && (
                    <p className="add-post-form__error">{errors.title}</p>
                )}
            </div>

            <div className="add-post-form__group">
                <label className="add-post-form__label">Post Text</label>
                <textarea
                    ref={textareaRef}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className={`add-post-form__textarea ${
                        submitted && errors.text ? "invalid" : ""
                    }`}
                    placeholder="Enter post content"
                />
                {submitted && errors.text && (
                    <p className="add-post-form__error">{errors.text}</p>
                )}
            </div>

            <button
                type="submit"
                className={`add-post-form__button ${submitted && errors.text ? "error" : ""}`}
                disabled={loading}
            >
                {loading ? "Creating..." : "Create Post"}
            </button>

            {success && <p className="success">{success}</p>}
            {postError && <p className="error">{postError}</p>}
        </form>
    );
};

export default AddPost;
