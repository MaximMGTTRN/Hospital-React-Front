import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import MyContext from "../../../MyContext";
import HospitalImg from "../../../img/Hospital.png";
import "./Login.scss";

const Login = () => {
  const { setSnackOpen, setMessage, setStatus } = useContext(MyContext);
  const regExLogin = /^.{6,}$/;
  const regExPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  const navigate = useNavigate();

  const loginUser = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formLogin = formData.get("email").trim("");
    const formPassword = formData.get("password");

    if (regExLogin.test(formLogin)) {
      if (regExPassword.test(formPassword)) {
        await axios
          .post("http://localhost:8000/loginUser", {
            email: formLogin,
            password: formPassword,
          })
          .then((res) => {
            setStatus("success");
            setSnackOpen(true);
            setMessage("Успешный вход!");
            localStorage.setItem("token", res.data);
            navigate(`/main`);
          })
          .catch((res) => {
            setStatus("error");
            setSnackOpen(true);
            setMessage("Не верная почта или пароль!");
          });
      } else {
        setStatus("warning");
        setSnackOpen(true);
        setMessage("Введите верный пароль!");
      }
    } else {
      setStatus("warning");
      setSnackOpen(true);
      setMessage("Введите почту!");
    }
  };

  return (
    <div className="login">
      <img src={HospitalImg} className="hospital-img" />
      <div className="login-block">
        <div className="legend-form"> Войти в систему</div>
        <form className="login-form" onSubmit={loginUser}>
          <label className="login-lable">Почта:</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Почта"
            className="login-input"
          />
          <label className="login-lable">Пароль:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Пароль"
            className="login-input"
          />
          <div className="container">
            <button className="login-button">Войти</button>
            <Link to="/registration" className="registration">
              Регистрация
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
