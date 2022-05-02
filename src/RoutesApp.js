import React from "react";
import { Navigate } from "react-router-dom";
import Main from "./components/Main/Main";
import Login from "./components/LoginPage/Login/Login";
import Register from "./components/LoginPage/Register/Register";

const RoutesApp = () => [
  {
    path: "/main",
    element: localStorage.getItem("token") ? (
      <Main />
    ) : (
      <Navigate to="/login" />
    ),
  },
  {
    path: "/login",
    element: localStorage.getItem("token") ? (
      <Navigate to="/main" />
    ) : (
      <Login />
    ),
  },
  {
    path: "/",
    element: localStorage.getItem("token") ? (
      <Navigate to="/main" />
    ) : (
      <Navigate to="/login" />
    ),
  },
  {
    path: "/registration",
    element: <Register />,
  },
  {
    path: "*",
    element: <Navigate to="/login" />,
  },
];

export default RoutesApp;
