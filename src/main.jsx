import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Trail from "./trail/Trail.jsx";
import { ThemeProvider } from "./trail/components/theme/ThemeProvider.jsx";
import {AuthProvider} from "./trail/components/auth/AuthProvider.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ThemeProvider>
            <AuthProvider>
                <Trail />
            </AuthProvider>
        </ThemeProvider>
    </StrictMode>
);
