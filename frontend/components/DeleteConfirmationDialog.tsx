import React from "react";
import {
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";

interface IDeleteDialogProps {
  openDialog: boolean;
  cancelDelete: () => void;
  confirmDelete: () => void;
}

const DeleteConfirmationDialog = ({
  openDialog,
  cancelDelete,
  confirmDelete,
}: IDeleteDialogProps) => {
  return (
    <Dialog open={openDialog} onClose={cancelDelete}>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete this building? This action cannot be
          undone.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={cancelDelete} color="primary">
          Cancel
        </Button>
        <Button onClick={confirmDelete} color="secondary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
