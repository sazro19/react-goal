import React, { useState } from "react";
import "./InfiniteSlider.css";

export default function InfiniteSlider({ items, renderItem }) {
    const [index, setIndex] = useState(0);

    const next = () => {
        setIndex((prev) => (prev + 1) % items.length);
    };

    const prev = () => {
        setIndex((prev) => (prev - 1 + items.length) % items.length);
    };

    return (
        <div className="slider">
            <button className="slider-arrow left" onClick={prev}>‹</button>

            <div className="slider-content">
                {renderItem(items[index])}
            </div>

            <button className="slider-arrow right" onClick={next}>›</button>
        </div>
    );
}
