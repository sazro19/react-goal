import React, {forwardRef, useContext, useRef, useState} from "react";
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
        const [editSave, setEditSave] = useState(false);

        const pRef = useRef(null);

        const {editPost, loading: editLoading, error: editError} =
            useEditPost();

        const handleFavorite = onToggleFavorite ? () => {
            onToggleFavorite(id);
        } : null;

        const handleEdit = onEdit ? async () => {
            if (!isEditing) {
                setIsEditing(true);
                setEditSave(true);
                return;
            }

            setEditSave(false);
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
                editSave={editSave}
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
                        className="post-card-text post-card-textarea"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
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
