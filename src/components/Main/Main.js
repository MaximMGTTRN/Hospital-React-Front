import React, { useContext, useEffect } from "react";
import axios from "axios";
import MyContext from "../../MyContext";
import DocTable from "./DocTable/DocTable";
import InputForm from "./InputForm/InputForm";
import "./Main.scss";

const Main = () => {
  const { row, setRow } = useContext(MyContext);

  useEffect(() => {
      axios
        .get("http://localhost:8000/allAppointments", {
          headers: {
            token: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          setRow(res.data.data);
        });
  }, [setRow]);

  return (
    <div className="main-page">
      <InputForm />
      <div className="table-block">
        <DocTable />
      </div>
    </div>
  );
};

export default Main;
