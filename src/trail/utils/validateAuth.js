export function validateEmail(email) {
    if (!email.trim()) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Invalid email format";
    return null;
}

export function validatePassword(password) {
    if (!password.trim()) return "Password is required";
    return null;
}

export function validateConfirmPassword(password, confirmPassword) {
    if (password !== confirmPassword) return "Passwords do not match";
    return null;
}
