import { Button } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import image from "../../img/Logo.png";
import "./Header.scss";

const Header = () => {
  const navigate = useNavigate();

  let headerText = "";
  let classExit = "";
  const location = useLocation();

  switch (location.pathname) {
    case "/login":
      headerText = "Войти в систему";
      classExit = "exit-none";

      break;
    case "/registration":
      headerText = "Зарегистрироваться";
      classExit = "exit-none";

      break;
    case "/main":
      headerText = "Приемы";
      classExit = "exit-button";

      break;
    default:
      headerText = "Страница не найдена";
      classExit = "exit-none";

      break;
  }

  const exitFunc = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="header">
      <div className="page-logo">
        <div className="header-img">
          <img src={image} className="img" />
        </div>
        <div className="page-legend">{headerText}</div>
      </div>
      <Button className={classExit} onClick={exitFunc}>
        Выход
      </Button>
    </div>
  );
};

export default Header;
