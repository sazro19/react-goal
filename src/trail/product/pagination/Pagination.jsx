import React from "react";
import "./Pagination.css";

export default function Pagination({totalPages, page, setPage}) {
    if (totalPages <= 1) return null;

    return (
        <div className="pagination">
            {Array.from({length: totalPages}, (_, i) => {
                const pageNum = i + 1;
                const isActive = pageNum === page;

                return (
                    <button
                        key={pageNum}
                        onClick={() => setPage(pageNum)}
                        className={`page-btn ${isActive ? "active" : ""}`}
                    >
                        {pageNum}
                    </button>
                );
            })}
        </div>
    );
}
