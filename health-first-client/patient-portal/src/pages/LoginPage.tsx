import React from "react";
import { Box, Container } from "@mantine/core";
import LoginForm from "../components/LoginForm";

const LoginPage: React.FC = () => {
  return (
    <Box
      w={"100vw"}
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <Container size="sm" style={{ width: "100%" }}>
        <LoginForm />
      </Container>
    </Box>
  );
};

export default LoginPage;
