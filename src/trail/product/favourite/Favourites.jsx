import {useContext} from "react";
import {AuthContext} from "../../auth/AuthContext.js";
import FavouritesContent from "./FavouritesContent.jsx";
import {useRequireAuth} from "../../auth/hooks/useRequireAuth.js";

const Favourites = () => {
    const {user} = useContext(AuthContext);
    useRequireAuth(user)

    if (user === undefined) return null;
    if (!user) return null;

    return <FavouritesContent user={user}/>;
};

export default Favourites;
