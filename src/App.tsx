import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Reset from "./pages/Reset/Reset";
import Dashboard from "./pages/Dashboard/Dashboard";
import Detail from "./pages/Detail/Detail";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import Search from "./pages/Search/Search";
import Favourites from "./pages/Favourites/Favourites";
import NowWatching from "./pages/NowWatching/NowWatching";
import { RootState } from "./store";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "./redux/theme/darkmode.slice";
import { UserContextProvider } from "./context/UserContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Search />
      </ProtectedRoute>
    ),
  },
  {
    path: "/search",
    element: (
      <ProtectedRoute>
        <Search />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/reset",
    element: <Reset />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/favourites/",
    element: (
      <ProtectedRoute>
        <Favourites />
      </ProtectedRoute>
    ),
  },
  {
    path: "/watching/",
    element: (
      <ProtectedRoute>
        <NowWatching />
      </ProtectedRoute>
    ),
  },
  {
    path: "/search/:showId",
    element: (
      <ProtectedRoute>
        <Detail />
      </ProtectedRoute>
    ),
  },
]);

function App() {
  const themeColor = useSelector((state: RootState) => {
    return state.theme.themeColor;
  });

  const dispatch = useDispatch();

  return (
    <UserContextProvider>
      <div
        className={`${themeColor ? "lightTheme" : "darkTheme"}`}
        style={{ minHeight: "100vh" }}
      >
        <button onClick={() => dispatch(toggleTheme())} className="button">
          Theme
        </button>
        <RouterProvider router={router} />
      </div>
    </UserContextProvider>
  );
}

export default App;
