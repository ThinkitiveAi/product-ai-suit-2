import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Paper,
  TextInput,
  Button,
  Title,
  Text,
  Anchor,
  Stack,
  Container,
  Box,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconMail } from "@tabler/icons-react";
import { authService } from "../services/authService";
import { notifications } from "@mantine/notifications";

interface ForgotPasswordData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ForgotPasswordData>({
    initialValues: {
      email: "",
    },
    validate: {
      email: (value) => {
        if (!value) return "Email is required";
        if (!/^\S+@\S+$/.test(value)) return "Invalid email format";
        return null;
      },
    },
  });

  const handleSubmit = async (values: ForgotPasswordData) => {
    setIsLoading(true);
    try {
      await authService.forgotPassword(values.email);
      notifications.show({
        title: "Reset email sent",
        message: "Please check your email for password reset instructions.",
        color: "green",
        icon: "✓",
      });
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Failed to send reset email. Please try again.",
        color: "red",
        icon: "✗",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
      <Container size="xs" style={{ width: "100%" }}>
        <Paper
          radius="lg"
          style={{
            padding: "var(--mantine-spacing-xl)",
            background: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}
          withBorder
        >
          <Stack gap="lg">
            {/* Logo/Brand Area */}
            <Box
              style={{
                textAlign: "center",
                marginBottom: "var(--mantine-spacing-md)",
              }}
            >
              <Title
                order={1}
                size="h2"
                style={{
                  color: "var(--mantine-color-blue-7)",
                  marginBottom: "var(--mantine-spacing-xs)",
                }}
              >
                HealthFirst
              </Title>
              <Text size="sm" style={{ color: "var(--mantine-color-dimmed)" }}>
                Patient Portal
              </Text>
            </Box>

            {/* Welcome Text */}
            <Box
              style={{
                textAlign: "center",
                marginBottom: "var(--mantine-spacing-xl)",
              }}
            >
              <Title
                order={2}
                size="h3"
                style={{ marginBottom: "var(--mantine-spacing-xs)" }}
              >
                Forgot Password?
              </Title>
              <Text size="sm" style={{ color: "var(--mantine-color-dimmed)" }}>
                Enter your email to receive reset instructions
              </Text>
            </Box>

            {/* Form */}
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <Stack gap="md">
                <TextInput
                  label="Email"
                  placeholder="Enter your email"
                  leftSection={<IconMail size={16} />}
                  {...form.getInputProps("email")}
                  required
                />

                <Button
                  type="submit"
                  loading={isLoading}
                  size="md"
                  fullWidth
                  style={{ marginTop: "var(--mantine-spacing-md)" }}
                >
                  Send Reset Link
                </Button>
              </Stack>
            </form>

            {/* Back to Login */}
            <Text
              style={{
                textAlign: "center",
                fontSize: "var(--mantine-font-size-sm)",
                color: "var(--mantine-color-dimmed)",
              }}
            >
              Remember your password?{" "}
              <Anchor component={Link} to="/login" size="sm">
                Back to login
              </Anchor>
            </Text>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default ForgotPassword;
