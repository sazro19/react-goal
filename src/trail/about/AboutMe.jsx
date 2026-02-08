import React, {useContext} from "react";
import "./AboutMe.css";
import {AuthContext} from "../auth/AuthContext.js";
import {useRequireAuth} from "../auth/hooks/useRequireAuth.js";
import InfiniteSlider from "./InfiniteSlider.jsx";
import ProductCard from "../product/ProductCard.jsx";
import {useTopThreePosts} from "../loading/useTopThreePosts.js";
import LoadingSpinner from "../loading/spinner/LoadingSpinner.jsx";
import {usePostActions} from "../loading/usePostActions.js";

export default function AboutMe() {
    const {user} = useContext(AuthContext);
    useRequireAuth(user)

    const {posts, loading, setPosts} = useTopThreePosts("http://localhost:3000/posts");
    const {toggleFavorite, _handleEditUpdate, _handleDelete} = usePostActions(setPosts);

    return (
        <div className="aboutme-layout">
            <section className="aboutme-card">
                <h2>About Me</h2>
                <p>
                    Hello! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                    quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate
                    commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed
                    eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam
                    nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet
                    quis magna.
                </p>
            </section>

            <section className="top-three">
                <h2>Top 3 Popular</h2>
                {loading === true ? <LoadingSpinner/> :
                    <InfiniteSlider
                        items={posts}
                        renderItem={(product) => (
                            <ProductCard
                                key={product.id}
                                {...product}
                                isFavorite={user?.favorites?.includes(product.id)}
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
