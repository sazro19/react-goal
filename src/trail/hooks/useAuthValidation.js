import {
    validateEmail,
    validatePassword,
    validateConfirmPassword
} from "../utils/validateAuth";

import { useState } from "react";

export default function useAuthValidation() {
    const [errors, setErrors] = useState({});

    const validateLogin = (email, password) => {
        const newErrors = {};

        const emailError = validateEmail(email);
        if (emailError) newErrors.email = emailError;

        const passwordError = validatePassword(password);
        if (passwordError) newErrors.password = passwordError;

        setErrors(newErrors);
        return newErrors;
    };

    const validateRegister = (email, password, confirmPassword) => {
        const newErrors = {};

        const emailError = validateEmail(email);
        if (emailError) newErrors.email = emailError;

        const passwordError = validatePassword(password);
        if (passwordError) newErrors.password = passwordError;

        const confirmError = validateConfirmPassword(password, confirmPassword);
        if (confirmError) newErrors.confirmPassword = confirmError;

        setErrors(newErrors);
        return newErrors;
    };

    return {
        errors,
        setErrors,
        validateLogin,
        validateRegister
    };
}
