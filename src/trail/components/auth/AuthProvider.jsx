import {useEffect, useState} from "react";
import {AuthContext} from "./js/AuthContext.js";

export function AuthProvider({children}) {
    const [user, _setUser] = useState(() => {
        const stored = localStorage.getItem("user");
        return stored ? JSON.parse(stored) : null;
    });

    const setUser = (value) => {
        _setUser(prev => {
            const next = typeof value === "function" ? value(prev) : value;

            if (!next || typeof next !== "object" || !next.id) {
                return null;
            }

            const {password: _password, ...safeUser} = next;
            return safeUser;
        });
    };

    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
    }, [user]);

    return (
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    );
}

