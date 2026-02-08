import React, {forwardRef, useContext, useLayoutEffect, useRef, useState} from 'react';
import './ProductCard.css';
import {AuthContext} from "../auth/AuthContext.js";

const ProductCard = forwardRef(({id, title, text, statistics, isFavorite, onToggleFavorite, onEdit, onDelete}, ref) => {
    const {user} = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(title);
    const [editText, setEditText] = useState(text);
    const pRef = useRef(null);
    const [size, setSize] = useState({width: 0, height: 0});
    useLayoutEffect(() => {
        if (!pRef.current) return;
        const rect = pRef.current.getBoundingClientRect();
        setSize({width: rect.width, height: rect.height});
    }, [text]);

    const handleFavorite = () => {
        onToggleFavorite(id);
    };

    const handleEdit = async () => {
        if (!isEditing) {
            // First click → enter edit mode
            setIsEditing(true);
            return;
        }

        await fetch(`http://localhost:3000/posts/${id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                title: editTitle,
                text: editText
            })
        });

        setIsEditing(false);
        onEdit?.(id, editTitle, editText);
    };

    const handleDelete = () => {
        onDelete(id)
    };

    const actions = user ? (
        <div className="product-card-actions">
            <button className={`action-btn favorite ${isFavorite ? "active" : ""}`} onClick={handleFavorite}>♥</button>
            {onEdit && <button className="action-btn edit" onClick={handleEdit}>✏️</button>}
            {onDelete && <button className="action-btn delete" onClick={handleDelete}>🗑️</button>}
        </div>
    ) : null;

    return (<article ref={ref} className="product-card" tabIndex={0}>
        <header className="product-card-header">
            {isEditing ? (
                <input value={editTitle}
                       onChange={e => setEditTitle(e.target.value)}
                />
            ) : (
                <h3 className="product-card-title">{title}</h3>
            )}
        </header>

        {isEditing ? (
            <textarea
                className="product-card-text product-card-textarea"
                value={editText}
                onChange={e => setEditText(e.target.value)}
                style={{
                    width: size.width,
                    height: size.height,
                    resize: "none"
                }}
            />
        ) : (
            <p ref={pRef} className="product-card-text">{text}</p>
        )}

        <footer className="product-card-stats">
            <span className="stat views">👁️ {statistics.views}</span>
            <span className="stat likes">👍 {statistics.likes}</span>
            <span className="stat dislikes">👎 {statistics.dislikes}</span>
        </footer>
        {actions}
    </article>);
});

export default ProductCard;
