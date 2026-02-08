import {useContext, useEffect, useRef, useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import PostCard from '../card/PostCard.jsx';
import './css/PostList.css';
import LoadingSpinner from "../../spinner/LoadingSpinner.jsx";
import ErrorMessage from "../../errors/ErrorMessage.jsx";
import {useFetch} from "../../../hooks/useFetch.js";
import FilterBar from "../filter/FilterBar.jsx";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll.js";
import {AuthContext} from "../../auth/js/AuthContext.js";
import {usePostActions} from "../../../hooks/usePostActions.js";

const PostList = () => {
    const [page, setPage] = useState(1);
    const {data: posts, loading, error, retry, setData, hasMore} = useFetch("http://localhost:3000/posts", page, 5);
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

    const filtered = posts.filter(p =>
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
        <div>
            <FilterBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                sortBy={sortBy}
                setSortBy={setSortBy}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
            />
            <div className="post-list">
                {sorted.length === 0 ? (
                    <p className="no-results">No posts match your search.</p>
                ) : (
                    sorted.map(post => (
                        <PostCard key={post.id}
                                  {...post}
                                  isFavorite={user?.favorites?.includes(post.id)}
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

export default PostList;
