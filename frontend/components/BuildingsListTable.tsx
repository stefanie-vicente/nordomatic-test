import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
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
import { GET_BUILDINGS } from "../graphql/buildingQueries";
import { IBuilding } from "@/types/IBuilding";
import { useRouter } from "next/router";

const BuildingsListTable = () => {
  const router = useRouter();

  const { data, loading, error, refetch } = useQuery(GET_BUILDINGS, {
    fetchPolicy: "network-only",
  });

  const [currentBuildings, setCurrentBuildings] = useState<IBuilding[]>([]);

  useEffect(() => {
    if (data?.buildings) {
      setCurrentBuildings(data.buildings);
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, [router, refetch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleDeleteBuilding = (id: number) => {
    setCurrentBuildings((prevBuildings) =>
      prevBuildings.filter((building) => building.id !== id)
    );
  };

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
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {currentBuildings?.map((building: IBuilding) => (
            <Row
              key={building.id}
              building={building}
              onDelete={handleDeleteBuilding}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BuildingsListTable;
