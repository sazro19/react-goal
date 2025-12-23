import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from './ProductCard';
import './ProductList.css';
import LoadingSpinner from "../loading/spinner/LoadingSpinner.jsx";
import ErrorMessage from "../loading/errors/ErrorMessage.jsx";
import { useFetch } from "../loading/useFetch.js";
import FilterBar from "./filter/FilterBar.jsx";

const ProductList = () => {
    const [page, setPage] = useState(1);
    const { data: products, loading, error, retry } = useFetch("http://localhost:3000/posts", page, 5);

    const [searchParams, setSearchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState(null);
    const [sortOrder, setSortOrder] = useState('desc');

    const loaderRef = useRef(null);

    // Load filters from URL
    useEffect(() => {
        const search = searchParams.get('search') || '';
        const sort = searchParams.get('sort') || null;
        const order = searchParams.get('order') || 'desc';
        setSearchTerm(search);
        setSortBy(sort);
        setSortOrder(order);
    }, []);

    // Update URL when filters change
    useEffect(() => {
        setPage(1);
        setSearchParams({
            search: searchTerm,
            sort: sortBy || '',
            order: sortOrder
        });
    }, [searchTerm, sortBy, sortOrder]);

    // Infinite scroll trigger
    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && !loading) {
                    setPage(prev => prev + 1);
                }
            },
            { threshold: 1 }
        );
        if (loaderRef.current) observer.observe(loaderRef.current);
        return () => observer.disconnect();
    }, [loading]);

    if (error) return <ErrorMessage message={error} onRetry={retry} />;

    const filtered = products.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.text.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sorted = [...filtered].sort((a, b) => {
        if (!sortBy) return 0;
        const key = sortBy === 'views' ? 'views' : 'likes';
        const valA = a.statistics[key];
        const valB = b.statistics[key];
        return sortOrder === 'asc' ? valA - valB : valB - valA;
    });

    return (
        <div className="product-list-container">
            <FilterBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                sortBy={sortBy}
                setSortBy={setSortBy}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
            />
            <div className="product-list">
                {sorted.length === 0 ? (
                    <p className="no-results">No posts match your search.</p>
                ) : (
                    sorted.map(product => (
                        <ProductCard key={product.id} {...product} />
                    ))
                )}
            </div>
            {/* Loader at bottom */}
            <div ref={loaderRef} style={{ height: '50px', margin: '20px 0' }}>
                {loading && <LoadingSpinner />}
            </div>
        </div>
    );
};

export default ProductList;
