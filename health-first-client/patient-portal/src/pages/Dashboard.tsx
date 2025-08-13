import React from "react";
import {
  Container,
  Title,
  Text,
  Button,
  Group,
  Card,
  Stack,
  Grid,
  Badge,
  Avatar,
  Box,
  Paper,
} from "@mantine/core";
import {
  IconUser,
  IconCalendar,
  IconStethoscope,
  IconPill,
  IconFileText,
  IconLogout,
  IconBell,
} from "@tabler/icons-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Container
      w={"100vw"}
      size="xl"
      style={{
        paddingTop: "var(--mantine-spacing-xl)",
        paddingBottom: "var(--mantine-spacing-xl)",
      }}
    >
      {/* Header */}
      <Group
        justify="space-between"
        style={{ marginBottom: "var(--mantine-spacing-xl)" }}
      >
        <Box>
          <Title
            order={1}
            size="h2"
            style={{ color: "var(--mantine-color-blue-7)" }}
          >
            Patient Dashboard
          </Title>
          <Text size="sm" style={{ color: "var(--mantine-color-dimmed)" }}>
            Welcome back, {user?.name}
          </Text>
        </Box>
        <Group>
          <Button variant="subtle" leftSection={<IconBell size={16} />}>
            Notifications
          </Button>
          <Button
            variant="outline"
            leftSection={<IconLogout size={16} />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Group>
      </Group>

      {/* Quick Stats */}
      <Grid style={{ marginBottom: "var(--mantine-spacing-xl)" }}>
        <Grid.Col span={{ base: 12, md: 3 }}>
          <Card
            shadow="sm"
            style={{ padding: "var(--mantine-spacing-lg)" }}
            radius="md"
            withBorder
          >
            <Group>
              <Avatar color="blue" radius="xl">
                <IconUser size={20} />
              </Avatar>
              <Box>
                <Text
                  size="xs"
                  style={{
                    color: "var(--mantine-color-dimmed)",
                    textTransform: "uppercase",
                    fontWeight: 500,
                  }}
                >
                  Next Appointment
                </Text>
                <Text size="lg" style={{ fontWeight: 700 }}>
                  Dr. Sarah Johnson
                </Text>
                <Text
                  size="sm"
                  style={{ color: "var(--mantine-color-dimmed)" }}
                >
                  Tomorrow, 2:00 PM
                </Text>
              </Box>
            </Group>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 3 }}>
          <Card
            shadow="sm"
            style={{ padding: "var(--mantine-spacing-lg)" }}
            radius="md"
            withBorder
          >
            <Group>
              <Avatar color="green" radius="xl">
                <IconPill size={20} />
              </Avatar>
              <Box>
                <Text
                  size="xs"
                  style={{
                    color: "var(--mantine-color-dimmed)",
                    textTransform: "uppercase",
                    fontWeight: 500,
                  }}
                >
                  Active Medications
                </Text>
                <Text size="lg" style={{ fontWeight: 700 }}>
                  3
                </Text>
                <Text
                  size="sm"
                  style={{ color: "var(--mantine-color-dimmed)" }}
                >
                  Prescriptions
                </Text>
              </Box>
            </Group>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 3 }}>
          <Card
            shadow="sm"
            style={{ padding: "var(--mantine-spacing-lg)" }}
            radius="md"
            withBorder
          >
            <Group>
              <Avatar color="orange" radius="xl">
                <IconFileText size={20} />
              </Avatar>
              <Box>
                <Text
                  size="xs"
                  style={{
                    color: "var(--mantine-color-dimmed)",
                    textTransform: "uppercase",
                    fontWeight: 500,
                  }}
                >
                  Recent Tests
                </Text>
                <Text size="lg" style={{ fontWeight: 700 }}>
                  2
                </Text>
                <Text
                  size="sm"
                  style={{ color: "var(--mantine-color-dimmed)" }}
                >
                  Pending Results
                </Text>
              </Box>
            </Group>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 3 }}>
          <Card
            shadow="sm"
            style={{ padding: "var(--mantine-spacing-lg)" }}
            radius="md"
            withBorder
          >
            <Group>
              <Avatar color="purple" radius="xl">
                <IconStethoscope size={20} />
              </Avatar>
              <Box>
                <Text
                  size="xs"
                  style={{
                    color: "var(--mantine-color-dimmed)",
                    textTransform: "uppercase",
                    fontWeight: 500,
                  }}
                >
                  Care Team
                </Text>
                <Text size="lg" style={{ fontWeight: 700 }}>
                  4
                </Text>
                <Text
                  size="sm"
                  style={{ color: "var(--mantine-color-dimmed)" }}
                >
                  Providers
                </Text>
              </Box>
            </Group>
          </Card>
        </Grid.Col>
      </Grid>

      {/* Main Content */}
      <Grid>
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Paper
            shadow="sm"
            style={{ padding: "var(--mantine-spacing-xl)" }}
            radius="md"
            withBorder
          >
            <Title
              order={2}
              size="h3"
              style={{ marginBottom: "var(--mantine-spacing-md)" }}
            >
              Recent Activity
            </Title>
            <Stack gap="md">
              <Card withBorder>
                <Group justify="space-between">
                  <Box>
                    <Text style={{ fontWeight: 500 }}>Blood Test Results</Text>
                    <Text
                      size="sm"
                      style={{ color: "var(--mantine-color-dimmed)" }}
                    >
                      Results from your recent blood work are now available
                    </Text>
                  </Box>
                  <Badge color="green">Completed</Badge>
                </Group>
              </Card>

              <Card withBorder>
                <Group justify="space-between">
                  <Box>
                    <Text style={{ fontWeight: 500 }}>
                      Appointment Confirmed
                    </Text>
                    <Text
                      size="sm"
                      style={{ color: "var(--mantine-color-dimmed)" }}
                    >
                      Your appointment with Dr. Johnson has been confirmed
                    </Text>
                  </Box>
                  <Badge color="blue">Scheduled</Badge>
                </Group>
              </Card>

              <Card withBorder>
                <Group justify="space-between">
                  <Box>
                    <Text style={{ fontWeight: 500 }}>Medication Refill</Text>
                    <Text
                      size="sm"
                      style={{ color: "var(--mantine-color-dimmed)" }}
                    >
                      Your prescription refill request is being processed
                    </Text>
                  </Box>
                  <Badge color="orange">Pending</Badge>
                </Group>
              </Card>
            </Stack>
          </Paper>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <Paper
            shadow="sm"
            style={{ padding: "var(--mantine-spacing-xl)" }}
            radius="md"
            withBorder
          >
            <Title
              order={2}
              size="h3"
              style={{ marginBottom: "var(--mantine-spacing-md)" }}
            >
              Quick Actions
            </Title>
            <Stack gap="md">
              <Button
                variant="light"
                leftSection={<IconCalendar size={16} />}
                fullWidth
              >
                Schedule Appointment
              </Button>
              <Button
                variant="light"
                leftSection={<IconPill size={16} />}
                fullWidth
              >
                Request Refill
              </Button>
              <Button
                variant="light"
                leftSection={<IconFileText size={16} />}
                fullWidth
              >
                View Medical Records
              </Button>
              <Button
                variant="light"
                leftSection={<IconStethoscope size={16} />}
                fullWidth
              >
                Message Provider
              </Button>
            </Stack>
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default Dashboard;
