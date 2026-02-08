import React, {useContext} from "react";
import "./css/AboutMe.css";
import {AuthContext} from "../auth/js/AuthContext.js";
import {useRequireAuth} from "../../hooks/useRequireAuth.js";
import InfiniteSlider from "./InfiniteSlider.jsx";
import PostCard from "../post/card/PostCard.jsx";
import {useTopThreePosts} from "../../hooks/useTopThreePosts.js";
import LoadingSpinner from "../spinner/LoadingSpinner.jsx";
import {usePostActions} from "../../hooks/usePostActions.js";
import AboutMeCard from "./AboutMeCard.jsx";

export default function AboutMe() {
    const {user} = useContext(AuthContext);
    useRequireAuth(user)

    const {posts, loading, setPosts} = useTopThreePosts("http://localhost:3000/posts");
    const {toggleFavorite, _handleEditUpdate, _handleDelete} = usePostActions(setPosts);

    return (
        <div className="aboutme-layout">
            <AboutMeCard/>

            <section className="top-three">
                <h2>Top 3 Popular</h2>
                {loading === true ? <LoadingSpinner/> :
                    <InfiniteSlider
                        items={posts}
                        renderItem={(post) => (
                            <PostCard
                                key={post.id}
                                {...post}
                                isFavorite={user?.favorites?.includes(post.id)}
                                onToggleFavorite={toggleFavorite}
                                onEdit={null}
                                onDelete={null}
                            />
                        )}
                    />
                }
            </section>
        </div>
    );
}
