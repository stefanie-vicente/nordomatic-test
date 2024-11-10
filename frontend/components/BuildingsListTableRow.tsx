import * as React from "react";
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
import TemperatureRecordsTable from "./TemperatureRecordsTable";

const Row = (props: { building: IBuilding }) => {
  const router = useRouter();
  const { building } = props;
  const [open, setOpen] = React.useState(false);

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
            {"° "}
            {building?.temperatureScale}
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
          {/* <Tooltip title="Delete building">
            <IconButton
              aria-label="delete building"
              size="small"
              onClick={() => console.log(building)}
            >
              <Delete />
            </IconButton>
          </Tooltip> */}
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
