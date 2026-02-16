import React from "react";

export default function PostCardActions({
                                            isFavorite,
                                            onFavorite,
                                            onEdit,
                                            onDelete,
                                            editLoading,
                                            editSave
                                        }) {
    const editStyle = "action-btn edit" + (editSave ? " edit-save" : "");
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
                    className={editStyle}
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
