import { useState } from "react";

export default function useLogin() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async (email, password) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `http://localhost:3000/users?username=${email}&password=${password}`
            );

            const data = await response.json();

            if (data.length === 0) {
                setError("Invalid email or password");
                return null;
            }

            return data[0];
        } catch (err) {
            console.error("Login error:", err);
            setError("Server error. Try again later.");
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { login, loading, error };
}
