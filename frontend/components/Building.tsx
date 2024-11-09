import { useQuery } from "@apollo/client";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  // Button,
} from "@mui/material";
import { GET_BUILDING } from "@/graphql/buildingQueries";

// add edit button
// add go back to buildings list button
const Building = () => {
  const { data, loading, error } = useQuery(GET_BUILDING, {
    variables: { id: 6 },
  });
  console.log(data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { building } = data;

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        {building.name}
      </Typography>
      <Typography variant="h6" color="textSecondary" gutterBottom>
        {building.address}
      </Typography>
      <Paper elevation={3} sx={{ padding: 2, marginBottom: 3 }}>
        <Typography variant="h6" gutterBottom>
          Current Temperature: {building.currentTemperature}°{" "}
          {building.temperatureScale}
        </Typography>
        {/* <Button variant="contained" color="primary">
          Update Temperature
        </Button> */}
      </Paper>
      <Typography variant="h5" gutterBottom>
        Temperature Records
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Action</TableCell>
              <TableCell>Temperature</TableCell>
              <TableCell>Timestamp</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {building.temperatureRecords.map((record: any, index: number) => (
              <TableRow key={index}>
                <TableCell>{record.action}</TableCell>
                <TableCell>
                  {record.temperature}° {building.temperatureScale}
                </TableCell>
                <TableCell>
                  {new Date(record.createdAt).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Building;
