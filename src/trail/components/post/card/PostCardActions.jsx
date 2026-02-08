import React from "react";

export default function PostCardActions({
                                            isFavorite,
                                            onFavorite,
                                            onEdit,
                                            onDelete,
                                            editLoading
                                        }) {
    return (
        <div className="post-card-actions">
            {onFavorite && (
                <button
                    className={`action-btn favorite ${isFavorite ? "active" : ""}`}
                    onClick={onFavorite}
                >
                    ♥
                </button>
            )}

            {onEdit && (
                <button
                    className="action-btn edit"
                    onClick={onEdit}
                    disabled={editLoading}
                >
                    ✏️
                </button>
            )}

            {onDelete && (
                <button className="action-btn delete" onClick={onDelete}>
                    🗑️
                </button>
            )}
        </div>
    );
}
