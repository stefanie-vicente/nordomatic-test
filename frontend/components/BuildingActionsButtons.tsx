import React, { useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { Box, Button } from "@mui/material";
import { DELETE_BUILDING } from "@/graphql/buildingMutations";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";

const BuildingActionsButtons = ({ id }: { id: number }) => {
  const router = useRouter();

  const [deleteBuilding] = useMutation(DELETE_BUILDING);

  const [openDialog, setOpenDialog] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const handleDeleteButtonClick = (id: number) => {
    setDeleteId(id);
    setOpenDialog(true);
  };

  const confirmDelete = async () => {
    if (deleteId) {
      try {
        await deleteBuilding({ variables: { id: deleteId } });
      } catch (error) {
        console.error("Error deleting building", error);
      } finally {
        setOpenDialog(false);
        router.push("/buildings");
      }
    }
  };

  const cancelDelete = () => {
    setOpenDialog(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        marginTop: 4,
        flexDirection: "row",
        justifyContent: "end",
      }}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={() => router.push(`/buildings/edit/${id}`)}
      >
        Edit
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleDeleteButtonClick(id)}
      >
        Delete
      </Button>
      <DeleteConfirmationDialog
        openDialog={openDialog}
        cancelDelete={cancelDelete}
        confirmDelete={confirmDelete}
      />
    </Box>
  );
};

export default BuildingActionsButtons;
