import React, { useState } from "react";
import {
  Container,
  Title,
  Text,
  Button,
  Paper,
  Stack,
  Group,
  Box,
} from "@mantine/core";
import { IconCalendarPlus } from "@tabler/icons-react";
import AppointmentSchedulingForm from "../components/AppointmentSchedulingForm";

const AppointmentPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <Box>
          <Title order={1} mb="md">
            Appointment Management
          </Title>
          <Text c="dimmed" size="lg">
            Schedule and manage patient appointments efficiently
          </Text>
        </Box>

        <Paper p="xl" withBorder>
          <Stack gap="lg">
            <Title order={3}>Quick Actions</Title>
            <Group>
              <Button
                leftSection={<IconCalendarPlus size={20} />}
                size="lg"
                onClick={() => setIsModalOpen(true)}
              >
                Schedule New Appointment
              </Button>
            </Group>
          </Stack>
        </Paper>

        <Paper p="xl" withBorder>
          <Stack gap="lg">
            <Title order={3}>Recent Appointments</Title>
            <Text c="dimmed">
              No recent appointments. Click the button above to schedule a new
              one.
            </Text>
          </Stack>
        </Paper>
      </Stack>

      <AppointmentSchedulingForm
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Container>
  );
};

export default AppointmentPage;
