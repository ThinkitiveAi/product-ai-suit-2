import React from "react";
import { Box, Container } from "@mantine/core";
import RegisterForm from "../components/RegisterForm";

const RegisterPage: React.FC = () => {
  return (
    <Box
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <Container size="md" style={{ width: "100%" }}>
        <RegisterForm />
      </Container>
    </Box>
  );
};

export default RegisterPage;
