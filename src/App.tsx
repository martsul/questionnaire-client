import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./components/layout/layout";
import { AuthorizationForm } from "./components/authorization-form/authorization-form";
import { ThemeContextProvider } from "./contexts/theme-context/theme-context-provider";
import { LanguageContextProvider } from "./contexts/language-context/language-context-provider";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            children: [
                { path: "authorization", element: <AuthorizationForm /> },
            ],
        },
    ]);

    return (
        <LanguageContextProvider>
            <ThemeContextProvider>
                <RouterProvider router={router} />
            </ThemeContextProvider>
        </LanguageContextProvider>
    );
}

export default App;
