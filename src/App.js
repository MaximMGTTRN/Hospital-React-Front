import React from "react";
import { useRoutes } from "react-router-dom";
import Header from "./components/Header/Header";
import Snack from "./components/Snackbar/Snackbar";
import RoutesApp from "./RoutesApp";
import ModalWindow from "./components/ModalWindow/ModalWindow";
import "./App.scss";

const App = () => {
  const routing = useRoutes(RoutesApp());

  return (
    <div className="app">
      <Header />
      {routing}
      <Snack />
      <ModalWindow />
    </div>
  );
};

export default App;
