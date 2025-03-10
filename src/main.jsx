import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import store from "./store/store.js";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  AuthLayout,
  Login,
  Signup,
  Home,
  EditPost,
  Post,
  AddPost,
  AllPost,
} from "./componets/index.js";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/login",
          element: (
            <AuthLayout authentication={false}>
              <Login />
            </AuthLayout>
          ),
        },
        {
          path: "/signup",
          element: (
            <AuthLayout authentication={false}>
              <Signup />
            </AuthLayout>
          ),
        },
        {
          path: "/all-posts",
          element: (
            <AuthLayout authentication>
              <AllPost />
            </AuthLayout>
          ),
        },
        {
          path: "/add-post",
          element: (
            <AuthLayout authentication>
              <AddPost />
            </AuthLayout>
          ),
        },
        {
          path: "/edit-post/:slug",
          element: (
            <AuthLayout authentication>
              <EditPost />
            </AuthLayout>
          ),
        },
        {
          path: "/post/:slug",
          element: <Post />,
        },
      ],
    },
  ],
  {
    basename: "/Blog-App", // <-- This is the important part
  }
);
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
