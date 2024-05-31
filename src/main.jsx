/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login.jsx";
import Registro from "./pages/Registro.jsx";
import Home from "./pages/Home.jsx";
import Menus from "./pages/Menus.jsx";
import Categorias from "./pages/Categorias.jsx";
import Platos from "./pages/Platos.jsx";
import MenuDetalle from "./pages/MenuDetalles.jsx";

const isAuthenticated = () => {
  // Verificar si hay un token en el localStorage
  const token = localStorage.getItem("token");
  return token ? true : false;
};

const PrivateRoute = ({ element, path }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute path="/menus" element={<Home />} />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Registro />,
  },
  {
    path: "/menus",
    element: <PrivateRoute path="/menus" element={<Menus />} />,
  },
  {
    path: "/detallemenu/:idMenu",
    element: (
      <PrivateRoute
        path="/detallemenu"
        element={<MenuDetalle />}
      ></PrivateRoute>
    ),
  },
  {
    path: "/categorias",
    element: <PrivateRoute path="/categorias" element={<Categorias />} />,
  },
  {
    path: "/platos",
    element: <PrivateRoute path="/platos" element={<Platos />} />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
