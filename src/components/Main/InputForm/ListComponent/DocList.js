import { React, useContext } from "react";
import { TextField } from "@material-ui/core";
import { MenuItem, FormControl, Select } from "@mui/material";
import MyContext from "../../../../MyContext";

export default function SelectLabels() {
  const {
    docName,
    appointment,
    setAppointment,
    modalOpen,
    editAppointment,
    setEditAppointment,
  } = useContext(MyContext);

  const handleChange = (value, nameField) => {
    if (modalOpen) {
      setEditAppointment({
        ...editAppointment,
        [nameField]: value,
      });
    } else {
      setAppointment({
        ...appointment,
        [nameField]: value,
      });
    }
  };

  return (
    <div>
      <FormControl sx={{ minWidth: 120 }}>
        <Select
          value={
            modalOpen ? editAppointment.doctorName : appointment.doctorName
          }
          onChange={(event) => handleChange(event.target.value, "doctorName")}
          displayEmpty={true}
          placeholder="Доктор"
          inputProps={{ "aria-label": "Without label" }}
          renderInput={(params) => <TextField {...params} />}
        >
          {docName.map((item, index) => (
            <MenuItem value={item} key={`doc-${index}`}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
