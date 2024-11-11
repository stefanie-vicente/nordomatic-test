import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import {
  Box,
  Collapse,
  IconButton,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  Edit,
  Delete,
} from "@mui/icons-material";
import { IBuilding } from "@/types/IBuilding";
import { DELETE_BUILDING } from "@/graphql/buildingMutations";
import TemperatureRecordsTable from "./TemperatureRecordsTable";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";
interface IRowProps {
  building: IBuilding;
  onDelete: (id: number) => void;
}

const Row = ({ building, onDelete }: IRowProps) => {
  const router = useRouter();
  const [deleteBuilding, { loading, error }] = useMutation(DELETE_BUILDING);

  const [open, setOpen] = useState(false);
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
        onDelete(deleteId);
      } catch (error) {
        console.error("Error deleting building", error);
      } finally {
        setOpenDialog(false);
      }
    }
  };

  const cancelDelete = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell>
          <Typography variant="body1">{building?.name}</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body1">{building?.address}</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body1">
            {building?.currentTemperature}
            {"°"} {building?.temperatureScale}
          </Typography>
        </TableCell>
        <TableCell>
          <Tooltip title="Edit building">
            <IconButton
              aria-label="edit building"
              size="small"
              onClick={() => router.push(`/buildings/edit/${building?.id}`)}
            >
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete building">
            <IconButton
              aria-label="delete building"
              size="small"
              onClick={() => handleDeleteButtonClick(building?.id)}
            >
              <Delete />
            </IconButton>
          </Tooltip>
          <DeleteConfirmationDialog
            openDialog={openDialog}
            cancelDelete={cancelDelete}
            confirmDelete={confirmDelete}
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <TemperatureRecordsTable building={building} />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default Row;
