import * as React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Row from "./BuildingsListTableRow";
import { IBuilding } from "@/types/IBuilding";

const BuildingsListTable = ({ buildings }: { buildings: IBuilding[] }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>
              <Typography variant="h6">Name</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Address</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Temperature</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Scale</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {buildings?.map((building) => (
            <Row key={building.id} building={building} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BuildingsListTable;
