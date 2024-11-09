import React, { useState } from "react";
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
} from "@mui/material";
import { CREATE_BUILDING } from "@/graphql/buildingMutations";

// make it an edit form also and block temperatureScale on edit
const BuildingForm = () => {
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [currentTemperature, setCurrentTemperature] = useState<number>(0);
  const [temperatureScale, setTemperatureScale] = useState<string>("Celsius");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setAddress(e.target.value);
  const handleTemperatureChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setCurrentTemperature(Number(e.target.value));
  const handleTemperatureScaleChange = (e: SelectChangeEvent<string>) =>
    setTemperatureScale(e.target.value);

  const [createBuilding, { loading, error }] = useMutation(CREATE_BUILDING);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const { data } = await createBuilding({
        variables: { name, address, currentTemperature, temperatureScale },
      });
      router.push(`/buildings/${data.createBuilding.id}`);
    } catch (err) {
      console.error("Error creating building:", err);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "60%",
        margin: "auto",
        minHeight: "100vh",
      }}
    >
      <Paper
        component="form"
        onSubmit={handleSubmit}
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          margin: "auto",
          padding: "50px",
          gap: "20px",
        }}
      >
        <TextField
          label="Building Name"
          value={name}
          onChange={handleNameChange}
          fullWidth
          variant="outlined"
          required
        />
        <TextField
          label="Address"
          value={address}
          onChange={handleAddressChange}
          fullWidth
          variant="outlined"
        />
        <TextField
          label="Current Temperature"
          type="number"
          value={currentTemperature}
          onChange={handleTemperatureChange}
          fullWidth
          variant="outlined"
          required
        />
        <FormControl fullWidth variant="outlined">
          <InputLabel>Temperature Scale</InputLabel>
          <Select
            value={temperatureScale}
            onChange={handleTemperatureScaleChange}
            label="Temperature Scale"
          >
            <MenuItem value="Celsius">Celsius</MenuItem>
            <MenuItem value="Fahrenheit">Fahrenheit</MenuItem>
          </Select>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Save"}
        </Button>
        {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
      </Paper>
    </Box>
  );
};

export default BuildingForm;
