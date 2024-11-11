import React from "react";
import { Snackbar, Alert } from "@mui/material";

interface IDeleteSuccessProps {
  openSnackBar: boolean;
  closeSnackbar: () => void;
}

const DeleteSuccessAlert = ({
  openSnackBar,
  closeSnackbar,
}: IDeleteSuccessProps) => {
  return (
    <Snackbar
      open={openSnackBar}
      autoHideDuration={3000}
      onClose={closeSnackbar}
    >
      <Alert onClose={closeSnackbar} severity="success" sx={{ width: "100%" }}>
        Building deleted successfully!
      </Alert>
    </Snackbar>
  );
};

export default DeleteSuccessAlert;

{
  /* <DeleteSuccessAlert
openSnackBar={openSnackBar}
closeSnackbar={closeSnackbar}
/> */
}
