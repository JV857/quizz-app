import React from "react";
import Settings from "../components/Settings";
import { Typography } from "@mui/material";

const SelectionScreenPage = () => {
  return (
    <div>
      <Typography variant="h2" fontWeight="bold" mt={5}>
        Quiz App
      </Typography>
      <Settings />
    </div>
  );
};

export default SelectionScreenPage;
