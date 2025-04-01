import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./components/layout/layout";
import { AuthorizationForm } from "./components/authorization-form/authorization-form";

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

    return <RouterProvider router={router} />;
}

export default App;
