import * as React from "react";
import {
  Collapse,
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { IBuilding } from "@/types/IBuilding";
import TemperatureRecordsTable from "./TemperatureRecordsTable";

const Row = (props: { building: IBuilding }) => {
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
          <Typography variant="body1">{building.name}</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body1">{building.address}</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body1">{building.currentTemperature}</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body1">{building.temperatureScale}</Typography>
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
