import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./header/Header.jsx";
import './Trail.css';
import LoadingSpinner from "./loading/spinner/LoadingSpinner.jsx";

// Lazy-load ProductList
const ProductList = React.lazy(() => import("./product/ProductList.jsx"));

export default function Trail() {
    return (
        <BrowserRouter>
            <Header />
            <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                    <Route path="/" element={<ProductList />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}
