import React from "react";
import { Box } from "@mantine/core";
import PatientRegistrationForm from "../components/PatientRegistrationForm";

const RegisterPage: React.FC = () => {
  return (
    <Box
      w={"100vw"}
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "20px",
      }}
    >
      <PatientRegistrationForm />
    </Box>
  );
};

export default RegisterPage;
