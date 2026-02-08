import {useContext, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {AuthContext} from "./AuthContext.js";

export default function Logout() {
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);

    useEffect(() => {
        localStorage.removeItem("user");
        setUser(null)
        navigate("/");
    }, [navigate, setUser]);

    return null;
}
