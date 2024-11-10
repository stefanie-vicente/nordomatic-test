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
import { IBuilding } from "@/types/IBuilding";

const BuildingTable = ({ building }: { building: IBuilding }) => {
  return (
    <>
      <Typography
        sx={{ margin: "30px 0 10px" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Temperature Records
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Timestamp</TableCell>
              <TableCell>Temperature</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {building?.temperatureRecords?.map((record, index: number) => (
              <TableRow key={index}>
                <TableCell>
                  {record.createdAt &&
                    new Date(record.createdAt).toLocaleString()}
                </TableCell>
                <TableCell>
                  {record.temperature}° {building?.temperatureScale}
                </TableCell>
                <TableCell>{record.action}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default BuildingTable;
