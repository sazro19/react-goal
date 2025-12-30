import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import Trail from "./trail/Trail.jsx";
import {ThemeProvider} from "./trail/theme/ThemeProvider.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ThemeProvider>
            <Trail/>
        </ThemeProvider>
    </StrictMode>
);
