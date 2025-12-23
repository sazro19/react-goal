import React, { forwardRef } from 'react';
import './ProductCard.css';

const ProductCard = forwardRef(({ title, text, statistics }, ref) => (
    <article ref={ref} className="product-card" tabIndex={0}>
        <header className="product-card-header">
            <h3 className="product-card-title">{title}</h3>
        </header>
        <p className="product-card-text">{text}</p>
        <footer className="product-card-stats">
            <span className="stat views">👁️ {statistics.views}</span>
            <span className="stat likes">👍 {statistics.likes}</span>
            <span className="stat dislikes">👎 {statistics.dislikes}</span>
        </footer>
    </article>
));

export default ProductCard;
