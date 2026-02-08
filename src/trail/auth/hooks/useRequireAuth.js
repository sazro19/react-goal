import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useRequireAuth(user) {
    const navigate = useNavigate();

    useEffect(() => {
        if (user === undefined) return;
        if (!user) navigate("/");
    }, [user, navigate]);
}
