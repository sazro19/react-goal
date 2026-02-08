import {useContext, useEffect, useRef, useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import ProductCard from './ProductCard';
import './ProductList.css';
import LoadingSpinner from "../loading/spinner/LoadingSpinner.jsx";
import ErrorMessage from "../loading/errors/ErrorMessage.jsx";
import {useFetch} from "../loading/useFetch.js";
import FilterBar from "./filter/FilterBar.jsx";
import useInfiniteScroll from "../loading/useInfiniteScroll.js";
import {AuthContext} from "../auth/AuthContext.js";
import {usePostActions} from "../loading/usePostActions.js";

const ProductList = () => {
    const [page, setPage] = useState(1);
    const {data: products, loading, error, retry, setData, hasMore} = useFetch("http://localhost:3000/posts", page, 5);
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState(null);
    const [sortOrder, setSortOrder] = useState('desc');
    const loaderRef = useRef(null);
    const {user} = useContext(AuthContext);
    const {toggleFavorite, handleEditUpdate, handleDelete} = usePostActions(setData);

    useEffect(() => {
        const search = searchParams.get('search') || '';
        const sort = searchParams.get('sort') || null;
        const order = searchParams.get('order') || 'desc';
        setSearchTerm(search);
        setSortBy(sort);
        setSortOrder(order);
    }, [searchParams]);

    useEffect(() => {
        setPage(1);
        setSearchParams({
            search: searchTerm,
            sort: sortBy || '',
            order: sortOrder
        });
    }, [searchTerm, setSearchParams, sortBy, sortOrder]);

    useInfiniteScroll(loaderRef, loading, () => {
        setPage(prev => prev + 1);
    });

    if (error) return <ErrorMessage message={error} onRetry={retry}/>;

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
                        <ProductCard key={product.id}
                                     {...product}
                                     isFavorite={user?.favorites?.includes(product.id)}
                                     onToggleFavorite={toggleFavorite}
                                     onEdit={handleEditUpdate}
                                     onDelete={handleDelete}/>
                    ))
                )}
            </div>
            <div ref={loaderRef} className="loader-ref">
                {hasMore && loading && <LoadingSpinner/>}
            </div>
        </div>
    );
};

export default ProductList;
