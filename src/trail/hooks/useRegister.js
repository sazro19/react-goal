import { useState } from "react";

export default function useRegister() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const register = async (email, password) => {
        setLoading(true);
        setError(null);

        try {
            const checkRes = await fetch(
                `http://localhost:3000/users?email=${email}`
            );
            const existingUsers = await checkRes.json();

            if (existingUsers.length > 0) {
                setError("A user with this email already exists");
                return null;
            }

            const newUser = {
                email,
                password,
                favorites: []
            };

            const res = await fetch("http://localhost:3000/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newUser)
            });

            if (!res.ok) {
                setError("Registration failed");
                return null;
            }

            return await res.json();
        } catch (err) {
            setError("Server error: " + err);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { register, loading, error };
}
