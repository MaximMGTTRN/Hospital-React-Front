import React, { useContext } from "react";
import { Alert } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MyContext from "../../MyContext";

const Snack = () => {
  const { isSnackOpen, setSnackOpen, message, status } = useContext(MyContext);

  return (
    <Snackbar
      open={isSnackOpen}
      onClose={() => setSnackOpen(false)}
      autoHideDuration={3000}
    >
      <Alert severity={status}>{message}</Alert>
    </Snackbar>
  );
};

export default Snack;
 