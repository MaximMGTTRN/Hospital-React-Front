import React, { useContext, useState } from "react";
import { TextField } from "@material-ui/core";
import { MenuItem, FormControl, Select } from "@mui/material";
import MyContext from "../../../MyContext";
import './SortBlock.scss'

const sortFunction = (sortType, array, key) => {
  if (sortType === "desc") {
    return array.sort((a, b) => {
      if (a[key] > b[key]) {
        return 1;
      }
      if (a[key] < b[key]) {
        return -1;
      }
      return 0;
    });
  }
  if (sortType === "asc") {
    return array.sort((a, b) => {
      if (a[key] < b[key]) {
        return 1;
      }
      if (a[key] > b[key]) {
        return -1;
      }
      return 0;
    });
  }
};

const sortName = [
  {
    name: "Имя",
    value: "userName",
    sortClass:'asc'
  },
  {
    name: "Доктор",
    value: "doctorName",
    sortClass:'asc'

  },
  {
    name: "Дата",
    value: "date",
    sortClass:'asc'

  },
  {
    name: "Жалоба",
    value: "complaint",
    sortClass:'asc'

  },
];
const SortBlock = () => {
  const {} = useContext(MyContext);
  const [sortInput, setSortInput] = useState({
    name: "",
    value: "",
    sortClass:'asc'
  });

  return (
    <div className="sort-block">
      <div className="sort-name">
        <FormControl sx={{ minWidth: 120 }}>
          <Select
            value={sortInput.name}
            onChange={(event) => setSortInput(...sortInput,{value:event.target.value})}
            displayEmpty={true}
            placeholder="Доктор"
            inputProps={{ "aria-label": "Without label" }}
            renderInput={(params) => <TextField {...params} />}
          >
            {sortName.map((item, index) => (
              <MenuItem value={item} key={`doc-${index}`}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default SortBlock;
