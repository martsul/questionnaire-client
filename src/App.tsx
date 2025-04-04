import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./components/layout/layout";
import { ThemeContextProvider } from "./contexts/theme-context/theme-context-provider";
import { LanguageContextProvider } from "./contexts/language-context/language-context-provider";
import { AuthorizationPage } from "./pages/authorization-page";
import { MessageContextProvider } from "./contexts/message-context/message-context-provider";
import { AuthorizationContextProvider } from "./contexts/authorization-context/aithorization-context-provider";
import { LoadingContextProvider } from "./contexts/loading-context/loading-context-provider";

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
        <LoadingContextProvider>
            <AuthorizationContextProvider>
                <MessageContextProvider>
                    <LanguageContextProvider>
                        <ThemeContextProvider>
                            <RouterProvider router={router} />
                        </ThemeContextProvider>
                    </LanguageContextProvider>
                </MessageContextProvider>
            </AuthorizationContextProvider>
        </LoadingContextProvider>
    );
}

export default App;
