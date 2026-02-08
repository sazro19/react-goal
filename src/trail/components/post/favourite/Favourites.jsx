import {useContext} from "react";
import {AuthContext} from "../../auth/js/AuthContext.js";
import FavouritesContent from "./FavouritesContent.jsx";
import {useRequireAuth} from "../../../hooks/useRequireAuth.js";

const Favourites = () => {
    const {user, setUser} = useContext(AuthContext);
    useRequireAuth(user)

    if (user === undefined) return null;
    if (!user) return null;

    return <FavouritesContent user={user} setUser={setUser}/>;
};

export default Favourites;
