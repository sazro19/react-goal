import React from "react";

export default function PostCardStats({ statistics }) {
    return (
        <footer className="post-card-stats">
            <span className="stat views">👁️ {statistics.views}</span>
            <span className="stat likes">👍 {statistics.likes}</span>
            <span className="stat dislikes">👎 {statistics.dislikes}</span>
        </footer>
    );
}
