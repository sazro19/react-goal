import React, {forwardRef, useContext, useLayoutEffect, useRef, useState} from "react";
import "./css/PostCard.css";
import {AuthContext} from "../../auth/js/AuthContext.js";
import useEditPost from "../../../hooks/useEditPost.js";
import PostCardActions from "./PostCardActions.jsx";
import PostCardStats from "./PostCardStats.jsx";

const PostCard = forwardRef(
    (
        {
            id,
            title,
            text,
            statistics,
            isFavorite,
            onToggleFavorite,
            onEdit,
            onDelete
        },
        ref
    ) => {
        const {user} = useContext(AuthContext);

        const [isEditing, setIsEditing] = useState(false);
        const [editTitle, setEditTitle] = useState(title);
        const [editText, setEditText] = useState(text);

        const pRef = useRef(null);
        const [size, setSize] = useState({width: 0, height: 0});

        const {editPost, loading: editLoading, error: editError} =
            useEditPost();

        useLayoutEffect(() => {
            if (!pRef.current) return;
            const rect = pRef.current.getBoundingClientRect();
            setSize({width: rect.width, height: rect.height});
        }, [text]);

        const handleFavorite = onToggleFavorite ? () => {
            onToggleFavorite(id);
        } : null;

        const handleEdit = onEdit ? async () => {
            if (!isEditing) {
                setIsEditing(true);
                return;
            }

            const updated = await editPost(id, editTitle, editText);

            if (updated) {
                setIsEditing(false);
                onEdit?.(id, editTitle, editText);
            }
        } : null;

        const handleDelete = onDelete ? () => {
            onDelete(id);
        } : null;

        const actions = user ? (
            <PostCardActions
                isFavorite={isFavorite}
                onFavorite={handleFavorite}
                onEdit={handleEdit}
                onDelete={handleDelete}
                editLoading={editLoading}
            />
        ) : null;

        return (
            <article ref={ref} className="post-card" tabIndex={0}>
                <header className="post-card-header">
                    {isEditing ? (
                        <input
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                        />
                    ) : (
                        <h3 className="post-card-title">{title}</h3>
                    )}
                </header>

                {isEditing ? (
                    <textarea
                        className="post-card-text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        style={{
                            width: size.width,
                            height: size.height,
                            resize: "none"
                        }}
                    />
                ) : (
                    <p ref={pRef} className="post-card-text">
                        {text}
                    </p>
                )}

                <PostCardStats statistics={statistics} />

                {editError && (
                    <p className="post-card-error">Error: {editError}</p>
                )}

                {actions}
            </article>
        );
    }
);

export default PostCard;
