import React, {useState, useRef, useEffect, useContext, use} from 'react';
import { AuthContext } from '../auth/AuthContext';
import './AddProduct.css';
import {useRequireAuth} from "../auth/hooks/useRequireAuth.js";

const MAX_TITLE_LENGTH = 100;

const AddProduct = () => {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState(null);
    const [buttonError, setButtonError] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const textareaRef = useRef(null);

    const { user } = useContext(AuthContext);
    useRequireAuth(user)

    const handleTitleChange = (e) => {
        const value = e.target.value;
        setTitle(value);
        if (value.length > MAX_TITLE_LENGTH) {
            setErrors((prev) => ({
                ...prev,
                title: `Title must be under ${MAX_TITLE_LENGTH} characters.`
            }));
            return;
        }

        setErrors((prev) => {
            const updated = { ...prev };
            if (updated.title && updated.title.includes("under")) {
                delete updated.title;
            }
            return updated;
        });
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

        const isValid = validate();
        setButtonError(!isValid);

        if (!isValid) return;

        try {
            const response = await fetch('http://localhost:3000/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title,
                    text,
                    statistics: {
                        views: 0,
                        likes: 0,
                        dislikes: 0
                    }
                }),
            });

            if (!response.ok) throw new Error('Failed to create post');

            setStatus('Post created successfully!');
            setTitle('');
            setText('');
            setErrors({});
            setButtonError(false);
            setSubmitted(false);
        } catch (error) {
            setStatus('Error creating post.');
            console.error(error);
        }
    };

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [text]);

    return (
        <form className="add-product-form" onSubmit={handleSubmit}>
            <h2 className="add-product-form__title">Create New Post</h2>

            <div className="add-product-form__group">
                <label className="add-product-form__label">Post Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    className={`add-product-form__input ${
                        errors.title ? 'invalid' : ''
                    }`}
                    placeholder="Enter title"
                />

                {submitted && !title.trim() && errors.title === "Title is required." && (
                    <p className="add-product-form__error">{errors.title}</p>
                )}

                {title.length > MAX_TITLE_LENGTH && (
                    <p className="add-product-form__error">
                        Title must be under {MAX_TITLE_LENGTH} characters.
                    </p>
                )}
            </div>

            <div className="add-product-form__group">
                <label className="add-product-form__label">Post Text</label>
                <textarea
                    ref={textareaRef}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className={`add-product-form__textarea ${
                        submitted && !text.trim() ? 'invalid' : ''
                    }`}
                    placeholder="Enter post content"
                />

                {submitted && !text.trim() && (
                    <p className="add-product-form__error">Text is required.</p>
                )}
            </div>

            <button
                type="submit"
                className={`add-product-form__button ${buttonError ? 'error' : ''}`}
            >
                Create Post
            </button>

            {status && <p>{status}</p>}
        </form>
    );
};

export default AddProduct;
