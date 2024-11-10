import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import {
  Paper,
  TextField,
  Button,
  Box,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { CREATE_BUILDING, UPDATE_BUILDING } from "@/graphql/buildingMutations";
import { IBuilding } from "@/types/IBuilding";

interface IBuildingFormProps {
  building?: IBuilding;
  type: "create" | "update";
}

const BuildingForm = ({ building, type }: IBuildingFormProps) => {
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [currentTemperature, setCurrentTemperature] = useState<number | string>(
    ""
  );
  const [temperatureScale, setTemperatureScale] = useState<string>("Celsius");

  useEffect(() => {
    if (type === "update" && building) {
      setName(building.name || "");
      setAddress(building.address || "");
      setCurrentTemperature(building.currentTemperature || "");
      setTemperatureScale(building.temperatureScale || "Celsius");
    }
  }, [building, type]);

  const [createBuilding, { loading: loadingCreate, error: errorCreate }] =
    useMutation(CREATE_BUILDING);
  const [updateBuilding, { loading: loadingUpdate, error: errorUpdate }] =
    useMutation(UPDATE_BUILDING);

  const loading = loadingCreate || loadingUpdate;
  const error = errorCreate || errorUpdate;

  const handleChange = {
    name: (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value),
    address: (e: React.ChangeEvent<HTMLInputElement>) =>
      setAddress(e.target.value),
    temperature: (e: React.ChangeEvent<HTMLInputElement>) =>
      setCurrentTemperature(Number(e.target.value)),
    scale: (e: SelectChangeEvent<string>) =>
      setTemperatureScale(e.target.value),
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      let buildingId: number | undefined;

      if (type === "create") {
        const { data } = await createBuilding({
          variables: { name, address, currentTemperature, temperatureScale },
        });
        buildingId = data?.createBuilding?.id;
      } else if (type === "update") {
        buildingId = building?.id;
        await updateBuilding({
          variables: { id: buildingId, name, address, currentTemperature },
        });
      }

      if (buildingId) router.push(`/buildings/${buildingId}`);
    } catch (err) {
      // improve
      console.error("Error creating/updating building:", err);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "60%",
        minHeight: "100vh",
        margin: "auto",
        justifyContent: "center",
        gap: "20px",
      }}
    >
      <Typography variant="h5">
        {type === "create" ? "Create" : "Update"} Building
      </Typography>
      <Paper
        component="form"
        onSubmit={handleSubmit}
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          padding: "50px",
          gap: "20px",
        }}
      >
        <TextField
          label="Name"
          value={name}
          onChange={handleChange.name}
          fullWidth
          variant="outlined"
        />
        <TextField
          label="Address"
          value={address}
          onChange={handleChange.address}
          fullWidth
          variant="outlined"
          required={type === "create"}
        />
        <TextField
          label="Current Temperature"
          type="number"
          value={currentTemperature}
          onChange={handleChange.temperature}
          fullWidth
          variant="outlined"
          required={type === "create"}
        />
        {type === "create" ? (
          <FormControl fullWidth variant="outlined">
            <InputLabel>Temperature Scale</InputLabel>
            <Select
              value={temperatureScale}
              onChange={handleChange.scale}
              label="Temperature Scale"
            >
              <MenuItem value="Celsius">Celsius</MenuItem>
              <MenuItem value="Fahrenheit">Fahrenheit</MenuItem>
            </Select>
          </FormControl>
        ) : (
          <Typography>
            Temperature Scale: {building?.temperatureScale}
          </Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Save"}
        </Button>
        {error && <Typography color="error">Error: {error.message}</Typography>}
      </Paper>
    </Box>
  );
};

export default BuildingForm;
