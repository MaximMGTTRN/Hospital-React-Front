import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import MyContext from "../../../MyContext";
import HospitalImg from "../../../img/Hospital.png";
import "./Register.scss";

const Register = () => {
  const { setSnackOpen, setMessage, setStatus } = useContext(MyContext);
  const regExLogin = /^.{6,}$/;
  const regExPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  const navigate = useNavigate();

  const createUser = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formLogin = formData.get("email").trim("");
    const formPassword = formData.get("password");
    const formPasswordRepeat = formData.get("secondPass");

    if (regExLogin.test(formLogin)) {
      if (regExPassword.test(formPassword)) {
        if (formPassword === formPasswordRepeat) {
          await axios
            .post("http://localhost:8000/createUser", {
              email: formLogin,
              password: formPassword,
            })
            .then((res) => {
              setStatus("success");
              setSnackOpen(true);
              setMessage("Успешная регистрация!");
              localStorage.setItem("token", res.data);
              navigate(`/main`);
            })
            .catch((res) => {
              setStatus("error");
              setSnackOpen(true);
              setMessage("Произошла ошибка при регистрации");
            });
        } else {
          setStatus("warning");
          setSnackOpen(true);
          setMessage("Пароли не совпадают");
        }
      } else {
        setStatus("warning");
        setSnackOpen(true);
        setMessage("Введите верный Пароль");
      }
    } else {
      setStatus("warning"); 
      setSnackOpen(true);
      setMessage("Введите верный email");
    }
  };

  return (
    <div className="reg">
      <img src={HospitalImg} className="hospital-img" />
      <div className="reg-block">
        <div className="legend-form"> Регистрация</div>
        <form className="reg-form" onSubmit={createUser}>
          <label>Почта:</label>
          <input type="email" id="mail" name="email" placeholder="Почта" />
          <label>Пароль:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Пароль"
          />
          <label>Повторите пароль:</label>
          <input
            type="password"
            name="secondPass"
            id="secondPass"
            placeholder="Повторите пароль"
          />
          <div className="container">
            <button>Зарегестрироваться</button>
            <Link to="/login" className="autorization">
              Авторизация
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
