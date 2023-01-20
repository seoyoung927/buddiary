import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import TodoPage from "./pages/TodoPage";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import PrivateRouter from "./PrivateRouter";
import FriendPage from "./pages/FriendPage";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
    {
        path: `${process.env.PUBLIC_URL}/`,
        element: <App />,
        children: [
            {
                path: "",
                element: <MainPage />
            },
            {
                path:"login/",
                element: <LoginPage />
            },
            {
                path:"todo/*",
                element: <PrivateRouter component={<TodoPage />} />
            },
            {
                path:"friend/*",
                element: <PrivateRouter component={<FriendPage />} />
            },
            {
                path:"*",
                element: <NotFound />
            }
        ]
    }
])

export default router;


