import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Paper,
  TextInput,
  Button,
  Title,
  Text,
  Anchor,
  Stack,
  Box,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconMail, IconArrowLeft } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { authService } from "../services/authService";

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
        title: "Reset link sent",
        message:
          "If an account with that email exists, we have sent a password reset link.",
        color: "green",
        icon: "✓",
      });
    } catch {
      notifications.show({
        title: "Error",
        message: "Failed to send reset link. Please try again.",
        color: "red",
        icon: "✗",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
      <Container size="xs" style={{ width: "100%" }}>
        <Paper
          radius="lg"
          p="xl"
          withBorder
          style={{
            background: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          <Stack gap="lg">
            {/* Back to Login */}
            <Anchor component={Link} to="/login" size="sm" c="blue.7">
              <Box
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <IconArrowLeft size={16} />
                Back to login
              </Box>
            </Anchor>

            {/* Header */}
            <Box ta="center" mb="md">
              <Title order={1} size="h2" c="blue.7" mb="xs">
                Forgot Password?
              </Title>
              <Text size="sm" c="dimmed">
                Enter your email address and we'll send you a link to reset your
                password.
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
                  mt="md"
                >
                  Send reset link
                </Button>
              </Stack>
            </form>

            {/* Additional Info */}
            <Text ta="center" size="sm" c="dimmed">
              Remember your password?{" "}
              <Anchor component={Link} to="/login" size="sm">
                Sign in
              </Anchor>
            </Text>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default ForgotPassword;
