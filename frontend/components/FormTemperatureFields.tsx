import React from "react";
import {
  TextField,
  Box,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
  Typography,
} from "@mui/material";

interface FormTemperatureFieldsProps {
  currentTemperature: number | string;
  temperatureScale: string;
  type: "create" | "update";
  handleChange: (field: string, value: string | number) => void;
}

const FormTemperatureFields = ({
  currentTemperature,
  temperatureScale,
  type,
  handleChange,
}: FormTemperatureFieldsProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: "10px",
        alignItems: "center",
      }}
    >
      <TextField
        label="Current Temperature"
        type="number"
        value={currentTemperature}
        onChange={(e) => handleChange("currentTemperature", e.target.value)}
        variant="outlined"
        required
      />
      <FormControl variant="outlined" disabled={type === "update"}>
        <InputLabel>Scale</InputLabel>
        <Select
          value={temperatureScale}
          onChange={(e) => handleChange("temperatureScale", e.target.value)}
          label="Temperature Scale"
        >
          <MenuItem value="Celsius">Celsius</MenuItem>
          <MenuItem value="Fahrenheit">Fahrenheit</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default FormTemperatureFields;
