import React, { useContext } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import MyContext from "../../../MyContext";
import "./DocTable.scss";
import moment from "moment";

const DocTable = () => {
  const { row, setRow, setModalOpen, setEditAppointment } =
    useContext(MyContext);
  const columnName = ["Имя", "Врач", "Дата", "Жалоба", "", ""];

  const deleteAppointment = async (item) => {
    const { _id } = item;
    await axios
      .delete(`http://localhost:8000/deleteAppointment/?_id=${_id}`, {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        setRow(res.data.data);
      });
  };

  const editFunction = (item) => {
    setModalOpen(true);
    setEditAppointment(item);
  };

  return (
    <TableContainer className="table" component={Paper}>
      <Table className="table-main" aria-label="customized table">
        <TableHead className="table-head">
          <TableRow>
            {columnName.map((element, i) => (
              <TableCell key={`column-${i}`}>{element}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody className="table-body">
          {row.map((item, index) => (
            <TableRow key={`${index}-row`}>
              <TableCell className="name-block">{item.userName}</TableCell>
              <TableCell className="doctor-block">{item.doctorName}</TableCell>
              <TableCell className="date-block">
                {moment(item.date).format("DD.MM.YYYY")}
              </TableCell>
              <TableCell className="complaint-block">
                {item.complaint}
              </TableCell>

              <TableCell className="button-block">
                <div
                  onClick={() => deleteAppointment(item)}
                  className="delete-button"
                />
              </TableCell>
              <TableCell className="button-block">
                <div
                  onClick={() => editFunction(item)}
                  className="edit-button"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DocTable;
