import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Paper,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  Text,
  Anchor,
  Stack,
  Group,
  Divider,
  Container,
  Box,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  IconMail,
  IconLock,
  IconEye,
  IconEyeOff,
  IconBrandGoogle,
} from "@tabler/icons-react";
import { useAuth } from "../context/AuthContext";

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormData>({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validate: {
      email: (value) => {
        if (!value) return "Email is required";
        if (!/^\S+@\S+$/.test(value)) return "Invalid email format";
        return null;
      },
      password: (value) => {
        if (!value) return "Password is required";
        if (value.length < 6) return "Password must be at least 6 characters";
        return null;
      },
    },
  });

  const handleSubmit = async (values: LoginFormData) => {
    setIsLoading(true);
    const success = await login(values.email, values.password);
    if (success) {
      navigate("/dashboard");
    }
    setIsLoading(false);
  };

  const handleSocialLogin = (provider: "google" | "microsoft") => {
    // Mock social login
    console.log(`Logging in with ${provider}`);
  };

  return (
    <Container
      size="xs"
      style={{
        paddingTop: "var(--mantine-spacing-xl)",
        paddingBottom: "var(--mantine-spacing-xl)",
      }}
    >
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
              Welcome back
            </Title>
            <Text size="sm" style={{ color: "var(--mantine-color-dimmed)" }}>
              Sign in to your patient account
            </Text>
          </Box>

          {/* Login Form */}
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap="md">
              <TextInput
                label="Email"
                placeholder="Enter your email"
                leftSection={<IconMail size={16} />}
                {...form.getInputProps("email")}
                required
              />

              <PasswordInput
                label="Password"
                placeholder="Enter your password"
                leftSection={<IconLock size={16} />}
                rightSection={
                  <Button
                    variant="subtle"
                    size="xs"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ border: "none" }}
                  >
                    {showPassword ? (
                      <IconEyeOff size={16} />
                    ) : (
                      <IconEye size={16} />
                    )}
                  </Button>
                }
                {...form.getInputProps("password")}
                required
              />

              <Group
                justify="space-between"
                style={{ marginTop: "var(--mantine-spacing-xs)" }}
              >
                <Checkbox
                  label="Remember me"
                  {...form.getInputProps("rememberMe", { type: "checkbox" })}
                />
                <Anchor component={Link} to="/forgot-password" size="sm">
                  Forgot password?
                </Anchor>
              </Group>

              <Button
                type="submit"
                loading={isLoading}
                size="md"
                fullWidth
                style={{ marginTop: "var(--mantine-spacing-md)" }}
              >
                Sign in
              </Button>
            </Stack>
          </form>

          {/* Divider */}
          <Divider label="or continue with" labelPosition="center" />

          {/* Social Login */}
          <Stack gap="sm">
            <Button
              variant="outline"
              leftSection={<IconBrandGoogle size={16} />}
              onClick={() => handleSocialLogin("google")}
              fullWidth
            >
              Continue with Google
            </Button>
            <Button
              variant="outline"
              onClick={() => handleSocialLogin("microsoft")}
              fullWidth
            >
              Continue with Microsoft
            </Button>
          </Stack>

          {/* Sign Up Link */}
          <Text
            style={{
              textAlign: "center",
              fontSize: "var(--mantine-font-size-sm)",
              color: "var(--mantine-color-dimmed)",
            }}
          >
            Don't have an account?{" "}
            <Anchor component={Link} to="/register" size="sm">
              Sign up
            </Anchor>
          </Text>
        </Stack>
      </Paper>
    </Container>
  );
};

export default LoginForm;
