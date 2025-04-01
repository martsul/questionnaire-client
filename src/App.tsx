import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./components/layout/layout";
import { ThemeContextProvider } from "./contexts/theme-context/theme-context-provider";
import { LanguageContextProvider } from "./contexts/language-context/language-context-provider";
import { AuthorizationPage } from "./pages/authorization-page";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    path: "login",
                    element: <AuthorizationPage thereIsAccount={true} />,
                },
                {
                    path: "signup",
                    element: <AuthorizationPage thereIsAccount={false} />,
                },
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
