import React, { useContext } from "react";
import axios from "axios";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Button, TextField } from "@material-ui/core";
import { LocalizationProvider, DatePicker } from "@mui/lab";
import DocList from "./ListComponent/DocList";
import MyContext from "../../../MyContext";
import "./InputForm.scss";

const InputForm = () => {
  const {
    appointment,
    setAppointment,
    setRow,
    setStatus,
    setSnackOpen,
    setMessage,
    currentDate,
  } = useContext(MyContext);

  const handleChange = (nameField, value) => {
    setAppointment({
      ...appointment,
      [nameField]: value,
    });
  };

  const handleAdd = async () => {
    if (
      appointment.userName.trim("") &&
      appointment.doctorName &&
      appointment.complaint.trim("")
    ) {
      await axios
        .post("http://localhost:8000/createAppointment", appointment, {
          headers: {
            token: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          setRow(res.data.data);
          setAppointment({
            userName: "",
            doctorName: "",
            date: currentDate,
            complaint: "",
          });
        });
    } else {
      setStatus("warning");
      setSnackOpen(true);
      setMessage("Введите все значения");
    }
  };

  return (
    <div className="input-main">
      <div className="input-block">
        <div className="block-name">Имя:</div>
        <TextField
          value={appointment.userName}
          type="text"
          placeholder="Введите ФИО"
          inputProps={{ "aria-label": "Without label" }}
          className="userName"
          onChange={(e) => {
            handleChange("userName", e.target.value);
          }}
        />
      </div>
      <div className="input-block">
        <div className="block-name">Врач:</div>
        <DocList />
      </div>
      <div className="input-block">
        <div className="block-name">Дата:</div>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            className="userDate"
            inputFormat={"dd/MM/yyyy"}
            value={appointment["date"]}
            onChange={(e) => {
              handleChange("date", e);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>
      <div className="input-block">
        <div className="block-name">Жалоба:</div>
        <TextField
          value={appointment.complaint}
          type="text"
          name="userComments"
          placeholder="Ваша жалоба"
          onChange={(e) => {
            handleChange("complaint", e.target.value);
          }}
        />
      </div>
      <div className="input-block">
        <div className="block-name"></div>
        <Button variant="contained" className="button-add" onClick={handleAdd}>
          Добавить
        </Button>
      </div>
    </div>
  );
};

export default InputForm;
