import React, { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { Paper, TextField, Box, Typography } from "@mui/material";
import { CREATE_BUILDING, UPDATE_BUILDING } from "@/graphql/buildingMutations";
import { IBuilding } from "@/types/IBuilding";
import FormTemperatureFields from "./FormTemperatureFields";
import BuildingFormActionsButtons from "./BuildingFormActionsButtons";

interface IBuildingFormProps {
  building?: IBuilding;
  type: "create" | "update";
}

const BuildingForm = ({ building, type }: IBuildingFormProps) => {
  const router = useRouter();
  const [formValues, setFormValues] = useState({
    name: building?.name || "",
    address: building?.address || "",
    currentTemperature: building?.currentTemperature || "",
    temperatureScale: building?.temperatureScale || "Celsius",
  });

  useEffect(() => {
    if (type === "update" && building) {
      setFormValues({
        name: building.name || "",
        address: building.address || "",
        currentTemperature: building.currentTemperature || "",
        temperatureScale: building.temperatureScale || "Celsius",
      });
    }
  }, [building, type]);

  const [createBuilding, { loading: loadingCreate, error: errorCreate }] =
    useMutation(CREATE_BUILDING);
  const [updateBuilding, { loading: loadingUpdate, error: errorUpdate }] =
    useMutation(UPDATE_BUILDING);

  const loading = loadingCreate || loadingUpdate;
  const error = errorCreate || errorUpdate;

  const handleChange = (field: string, value: string | number) => {
    setFormValues({ ...formValues, [field]: value });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const variables = {
        name: formValues.name,
        address: formValues.address,
        currentTemperature: Number(formValues.currentTemperature),
        temperatureScale: formValues.temperatureScale,
      };
      const { data } =
        type === "create"
          ? await createBuilding({ variables })
          : await updateBuilding({
              variables: { ...variables, id: building?.id },
            });

      if (data)
        router.push(`/buildings/${data?.createBuilding?.id || building?.id}`);
    } catch (err) {
      console.error("Failed to submit building:", err);
    }
  };

  return (
    <Box sx={{ padding: 10 }}>
      <Typography variant="h5" sx={{ marginBottom: "30px" }}>
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
          value={formValues.name}
          onChange={(e) => handleChange("name", e.target.value)}
          fullWidth
          variant="outlined"
        />
        <TextField
          label="Address"
          value={formValues.address}
          onChange={(e) => handleChange("address", e.target.value)}
          fullWidth
          variant="outlined"
          required
        />
        <FormTemperatureFields
          currentTemperature={formValues.currentTemperature}
          temperatureScale={formValues.temperatureScale}
          type={type}
          handleChange={handleChange}
        />
        <BuildingFormActionsButtons id={building?.id} loading={loading} />
        {error && <Typography color="error">Error: {error.message}</Typography>}
      </Paper>
    </Box>
  );
};

export default BuildingForm;
