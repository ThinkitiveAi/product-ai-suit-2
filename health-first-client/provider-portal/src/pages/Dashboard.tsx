import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Title,
  Text,
  Button,
  Stack,
  Group,
  Box,
  Card,
  Grid,
  Badge,
} from "@mantine/core";
import { IconCalendar, IconUsers, IconFileText } from "@tabler/icons-react";
import { useAuth } from "../context/AuthContext";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        {/* Header */}
        <Paper p="xl" radius="lg" withBorder>
          <Box>
            <Title order={1} size="h2" c="blue.7" mb="xs">
              Welcome back, {user?.name}!
            </Title>
            <Text size="sm" c="dimmed">
              Here's what's happening with your patients today
            </Text>
          </Box>
        </Paper>

        {/* Stats Cards */}
        <Grid>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Card p="xl" radius="lg" withBorder>
              <Group>
                <Box
                  style={{
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    borderRadius: "50%",
                    width: 60,
                    height: 60,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <IconCalendar size={24} color="white" />
                </Box>
                <Box>
                  <Text size="lg" fw={600}>
                    Today's Appointments
                  </Text>
                  <Title order={2} size="h1" c="blue.7">
                    8
                  </Title>
                  <Text size="sm" c="dimmed">
                    +2 from yesterday
                  </Text>
                </Box>
              </Group>
            </Card>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Card p="xl" radius="lg" withBorder>
              <Group>
                <Box
                  style={{
                    background:
                      "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                    borderRadius: "50%",
                    width: 60,
                    height: 60,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <IconUsers size={24} color="white" />
                </Box>
                <Box>
                  <Text size="lg" fw={600}>
                    Active Patients
                  </Text>
                  <Title order={2} size="h1" c="green.7">
                    24
                  </Title>
                  <Text size="sm" c="dimmed">
                    +3 this week
                  </Text>
                </Box>
              </Group>
            </Card>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Card
              p="xl"
              radius="lg"
              withBorder
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/availability")}
            >
              <Group>
                <Box
                  style={{
                    background:
                      "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                    borderRadius: "50%",
                    width: 60,
                    height: 60,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <IconCalendar size={24} color="white" />
                </Box>
                <Box>
                  <Text size="lg" fw={600}>
                    Manage Availability
                  </Text>
                  <Text size="sm" c="dimmed">
                    Set schedules & block times
                  </Text>
                  <Button variant="light" size="sm" mt="xs" color="orange">
                    Configure
                  </Button>
                </Box>
              </Group>
            </Card>
          </Grid.Col>
        </Grid>

        {/* Recent Activity */}
        <Paper p="xl" radius="lg" withBorder>
          <Title order={3} size="h3" mb="lg">
            Recent Activity
          </Title>
          <Stack gap="md">
            {[
              {
                id: 1,
                action: "Patient consultation completed",
                patient: "John Smith",
                time: "2 hours ago",
                status: "completed",
              },
              {
                id: 2,
                action: "Lab results received",
                patient: "Sarah Johnson",
                time: "4 hours ago",
                status: "pending",
              },
              {
                id: 3,
                action: "Prescription updated",
                patient: "Mike Wilson",
                time: "6 hours ago",
                status: "completed",
              },
              {
                id: 4,
                action: "Appointment scheduled",
                patient: "Emily Davis",
                time: "1 day ago",
                status: "scheduled",
              },
            ].map((activity) => (
              <Group
                key={activity.id}
                justify="space-between"
                p="md"
                style={{ border: "1px solid #f1f3f4", borderRadius: "8px" }}
              >
                <Box>
                  <Text fw={500}>{activity.action}</Text>
                  <Text size="sm" c="dimmed">
                    Patient: {activity.patient} • {activity.time}
                  </Text>
                </Box>
                <Badge
                  color={
                    activity.status === "completed"
                      ? "green"
                      : activity.status === "pending"
                      ? "yellow"
                      : "blue"
                  }
                  variant="light"
                >
                  {activity.status}
                </Badge>
              </Group>
            ))}
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
};

export default Dashboard;
