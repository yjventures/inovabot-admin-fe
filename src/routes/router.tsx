import { createBrowserRouter } from "react-router-dom";
import Login from "@/pages/Login/Login";
import Register from "@/pages/Register/Register";
import Home from "@/pages/Home/Home";
import Company from "@/pages/Company/Company";
import Bot from "@/pages/Bot/Bot";
import Chat from "@/pages/Chat/Chat";
import NotFound from "@/pages/NotFound/NotFound";
import BasicLayout from "@/layout/Basic/BasicLayout";
import DashboardLayout from "@/layout/DashboardLayout/DashboardLayout";

export const router = createBrowserRouter([
    {
        path: "",
        element: <BasicLayout />,
        children: [
            {
                path: "",
                element: <DashboardLayout />,
                children: [
                    {
                        path: "",
                        element: <Home />
                    },
                    {
                        path: "home",
                        element: <Home />
                    },
                    {
                        path: "company",
                        element: <Company />
                    },
                    {
                        path: "bot",
                        element: <Bot />
                    },
                    {
                        path: "chat",
                        element: <Chat />
                    },
                    {
                        path: "*",
                        element: <NotFound />
                    }
                ],
                errorElement: <div>Something went wrong</div>
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "register",
                element: <Register />
            },
            {
                path: "*",
                element: <NotFound />,
            },
        ],
        errorElement: <div>Something went wrong</div>
    }
])