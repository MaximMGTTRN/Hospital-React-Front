import React, { useContext } from "react";
import axios from "axios";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Box, Modal } from "@mui/material";
import { Button, TextField } from "@material-ui/core";
import { LocalizationProvider, DatePicker } from "@mui/lab";
import MyContext from "../../MyContext";
import DocList from "../Main/InputForm/ListComponent/DocList";
import "./ModalWindow.scss";

const ModalWindow = () => {
  const {
    modalOpen,
    setModalOpen,
    editAppointment,
    setEditAppointment,
    setRow,
    currentDate,
    setStatus,
    setSnackOpen,
    setMessage,
  } = useContext(MyContext);

  const handleClose = () => setModalOpen(false);

  const handleChange = (nameField, value) => {
    setEditAppointment({
      ...editAppointment,
      [nameField]: value,
    });
  };

  const handleEdit = async () => {
    if (
      editAppointment.userName.trim("") &&
      editAppointment.doctorName &&
      editAppointment.complaint.trim("")
    ) {
      await axios
        .patch("http://localhost:8000/editAppointment", editAppointment, {
          headers: {
            token: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          setRow(res.data.data);
          setEditAppointment({
            userName: "",
            doctorName: "",
            date: currentDate,
            complaint: "",
          });
          handleClose();
        });
    } else {
      setStatus("warning");
      setSnackOpen(true);
      setMessage("Введите все значения");
    }
  };

  const { date, complaint, userName } = editAppointment;

  return (
    <div>
      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="box-style">
          <div className="header-modal">Изменить прием</div>
          <div className="edit-main">
            <div className="input-block">
              <div className="block-name">Имя:</div>
              <TextField
                value={userName}
                type="text"
                inputProps={{ "aria-label": "Without label" }}
                className="userName edit"
                onChange={(e) => {
                  handleChange("userName", e.target.value);
                }}
              />
            </div>
            <div className="input-block">
              <div className="block-name">Врач:</div>
              <DocList item={editAppointment} className="edit" />
            </div>
            <div className="input-block">
              <div className="block-name">Дата:</div>
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
              >
                <DatePicker
                  inputFormat={"dd/MM/yyyy"}
                  value={date}
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
                value={complaint}
                type="text"
                className="edit"
                onChange={(e) => {
                  handleChange("complaint", e.target.value);
                }}
              />
            </div>
          </div>
          <div className="edit-block-buttons">
            <Button
              className="modal-edit-button back-button"
              onClick={handleClose}
            >
              Отмена
            </Button>
            <Button
              className="modal-edit-button add-button"
              onClick={handleEdit}
            >
              Добавить
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalWindow;
