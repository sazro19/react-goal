import './FilterBar.css';

const FilterBar = ({ searchTerm, setSearchTerm, sortBy, setSortBy, sortOrder, setSortOrder }) => {
    const toggleSort = (type) => {
        if (sortBy === type) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(type);
            setSortOrder('desc');
        }
    };

    return (
        <div className="filter-bar">
            <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="sort-buttons">
                <button
                    className={`sort-button ${sortBy === 'views' ? 'active' : ''}`}
                    onClick={() => toggleSort('views')}
                >
                    Views {sortBy === 'views' && (sortOrder === 'asc' ? '↑' : '↓')}
                </button>
                <button
                    className={`sort-button ${sortBy === 'likes' ? 'active' : ''}`}
                    onClick={() => toggleSort('likes')}
                >
                    Likes {sortBy === 'likes' && (sortOrder === 'asc' ? '↑' : '↓')}
                </button>
            </div>
        </div>
    );
};

export default FilterBar;
