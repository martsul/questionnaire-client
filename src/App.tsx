import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./components/layout/layout";
import { ThemeContextProvider } from "./contexts/theme-context/theme-context-provider";
import { LanguageContextProvider } from "./contexts/language-context/language-context-provider";
import { AuthorizationPage } from "./pages/authorization-page";
import { MessageContextProvider } from "./contexts/message-context/message-context-provider";
import { AuthorizationContextProvider } from "./contexts/authorization-context/aithorization-context-provider";
import { LoadingContextProvider } from "./contexts/loading-context/loading-context-provider";
import { AdminPage } from "./pages/admin-page";
import { FormPage } from "./pages/form-page";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { enableMapSet } from "immer";
import { AnswersPage } from "./pages/answers-page";
import { StatisticPage } from "./pages/statistic-page";
import { AnswerPage } from "./pages/answer-page";
import { HomePage } from "./pages/home-page";
import { ProfileLayout } from "./components/profile-layout/profile-layout";
import { ProfileFormsPage } from "./pages/profile-forms-page";
import { ProfileAnswersPage } from "./pages/profile-answers-page";
import { SearchContextProvider } from "./contexts/search-context/search-context-provider";
import { FormLayoutContainer } from "./components/form-layout/form-layout-container";
import { GithubAuthPage } from "./pages/github-auth-page";
import { SalesforceForm } from "./components/salesforce-form/salesforce-form";

function App() {
    enableMapSet();

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            children: [
                { index: true, element: <HomePage /> },
                {
                    path: "profile",
                    element: <ProfileLayout />,
                    children: [
                        { index: true, element: <ProfileFormsPage /> },
                        {
                            path: "answers",
                            element: <ProfileAnswersPage />,
                        },
                    ],
                },
                {
                    path: "login",
                    element: <AuthorizationPage thereIsAccount={true} />,
                },
                {
                    path: "signup",
                    element: <AuthorizationPage thereIsAccount={false} />,
                },
                {
                    path: "admin",
                    element: <AdminPage />,
                },
                {
                    path: "form/:formId",
                    element: <FormLayoutContainer />,
                    children: [
                        {
                            index: true,
                            element: <FormPage />,
                        },
                        {
                            path: "answers",
                            element: <AnswersPage />,
                        },
                        {
                            path: "statistic",
                            element: <StatisticPage />,
                        },
                    ],
                },
                {
                    path: "answer/:answerId",
                    element: <AnswerPage />,
                },
                {path: "salesforce", element: <SalesforceForm/>}
            ],
        },
        {
            path: "github/:token",
            element: <GithubAuthPage />,
        },
    ]);

    return (
        <Provider store={store}>
            <SearchContextProvider>
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
            </SearchContextProvider>
        </Provider>
    );
}

export default App;
