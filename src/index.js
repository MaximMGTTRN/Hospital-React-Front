import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import ThemeContext from "./MyContext";
import "./index.css";

const Main = () => {
  const [editAppointment, setEditAppointment] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [isSnackOpen, setSnackOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("warning");
  const [row, setRow] = useState([]);
  const docName = ["Доктор Перввый", "Доктор Второй", "Доктор Третий"];
  const currentDate = new Date();
  const [appointment, setAppointment] = useState({
    userName: "",
    doctorName: "",
    date: currentDate,
    complaint: "",
  });

  return (
    <React.StrictMode>
      <ThemeContext.Provider
        value={{
          editAppointment,
          setEditAppointment,
          modalOpen,
          setModalOpen,
          appointment,
          setAppointment,
          currentDate,
          docName,
          isSnackOpen,
          setSnackOpen,
          message,
          setMessage,
          status,
          setStatus,
          row,
          setRow,
        }}
      >
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeContext.Provider>
    </React.StrictMode>
  );
};
ReactDOM.render(<Main />, document.getElementById("root"));
