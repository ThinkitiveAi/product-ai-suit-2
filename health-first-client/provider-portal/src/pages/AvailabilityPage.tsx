import React, { useState } from "react";
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
  TextInput,
  Select,
  Checkbox,
  Badge,
  ActionIcon,
  Modal,
} from "@mantine/core";
import {
  IconCalendar,
  IconClock,
  IconPlus,
  IconEdit,
  IconTrash,
  IconCheck,
  IconX,
} from "@tabler/icons-react";
import ProviderAvailabilityForm from "../components/ProviderAvailabilityForm";

interface TimeSlot {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  isBlocked: boolean;
}

const AvailabilityPage: React.FC = () => {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([
    {
      id: "1",
      day: "Monday",
      startTime: "09:00",
      endTime: "17:00",
      isAvailable: true,
      isBlocked: false,
    },
    {
      id: "2",
      day: "Tuesday",
      startTime: "09:00",
      endTime: "17:00",
      isAvailable: true,
      isBlocked: false,
    },
    {
      id: "3",
      day: "Wednesday",
      startTime: "09:00",
      endTime: "17:00",
      isAvailable: true,
      isBlocked: false,
    },
    {
      id: "4",
      day: "Thursday",
      startTime: "09:00",
      endTime: "17:00",
      isAvailable: true,
      isBlocked: false,
    },
    {
      id: "5",
      day: "Friday",
      startTime: "09:00",
      endTime: "17:00",
      isAvailable: true,
      isBlocked: false,
    },
  ]);

  const [showProviderForm, setShowProviderForm] = useState(false);
  const [editModalOpened, setEditModalOpened] = useState(false);
  const [editingSlot, setEditingSlot] = useState<TimeSlot | null>(null);

  const handleEditSlot = () => {
    if (editingSlot) {
      setTimeSlots(
        timeSlots.map((slot) =>
          slot.id === editingSlot.id ? editingSlot : slot
        )
      );
      setEditModalOpened(false);
      setEditingSlot(null);
    }
  };

  const handleDeleteSlot = (id: string) => {
    setTimeSlots(timeSlots.filter((slot) => slot.id !== id));
  };

  const toggleAvailability = (id: string) => {
    setTimeSlots(
      timeSlots.map((slot) =>
        slot.id === id ? { ...slot, isAvailable: !slot.isAvailable } : slot
      )
    );
  };

  const toggleBlocked = (id: string) => {
    setTimeSlots(
      timeSlots.map((slot) =>
        slot.id === id ? { ...slot, isBlocked: !slot.isBlocked } : slot
      )
    );
  };

  // If showing provider form, render it instead of the main page
  if (showProviderForm) {
    return (
      <ProviderAvailabilityForm onBack={() => setShowProviderForm(false)} />
    );
  }

  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        {/* Header */}
        <Paper p="xl" radius="lg" withBorder>
          <Group justify="space-between" align="center">
            <Box>
              <Title order={1} size="h2" c="blue.7" mb="xs">
                Manage Availability
              </Title>
              <Text size="sm" c="dimmed">
                Set your working hours and block unavailable times
              </Text>
            </Box>
            <Button
              leftSection={<IconPlus size={16} />}
              onClick={() => setShowProviderForm(true)}
            >
              Add Time Slot
            </Button>
          </Group>
        </Paper>

        {/* Current Schedule */}
        <Paper p="xl" radius="lg" withBorder>
          <Title order={3} size="h3" mb="lg">
            Current Schedule
          </Title>
          <Stack gap="md">
            {timeSlots.map((slot) => (
              <Card key={slot.id} p="md" radius="md" withBorder>
                <Group justify="space-between" align="center">
                  <Group>
                    <IconCalendar
                      size={20}
                      color="var(--mantine-color-blue-6)"
                    />
                    <Box>
                      <Text fw={500} size="lg">
                        {slot.day}
                      </Text>
                      <Text size="sm" c="dimmed">
                        {slot.startTime} - {slot.endTime}
                      </Text>
                    </Box>
                  </Group>

                  <Group>
                    <Badge
                      color={slot.isAvailable ? "green" : "red"}
                      variant="light"
                      leftSection={
                        slot.isAvailable ? (
                          <IconCheck size={12} />
                        ) : (
                          <IconX size={12} />
                        )
                      }
                    >
                      {slot.isAvailable ? "Available" : "Unavailable"}
                    </Badge>

                    {slot.isBlocked && (
                      <Badge color="orange" variant="light">
                        Blocked
                      </Badge>
                    )}

                    <Group gap="xs">
                      <Checkbox
                        checked={slot.isAvailable}
                        onChange={() => toggleAvailability(slot.id)}
                        label="Available"
                      />
                      <Checkbox
                        checked={slot.isBlocked}
                        onChange={() => toggleBlocked(slot.id)}
                        label="Blocked"
                      />
                    </Group>

                    <Group gap="xs">
                      <ActionIcon
                        variant="light"
                        color="blue"
                        onClick={() => {
                          setEditingSlot(slot);
                          setEditModalOpened(true);
                        }}
                      >
                        <IconEdit size={16} />
                      </ActionIcon>
                      <ActionIcon
                        variant="light"
                        color="red"
                        onClick={() => handleDeleteSlot(slot.id)}
                      >
                        <IconTrash size={16} />
                      </ActionIcon>
                    </Group>
                  </Group>
                </Group>
              </Card>
            ))}
          </Stack>
        </Paper>

        {/* Quick Actions */}
        <Grid>
          <Grid.Col span={{ base: 12, md: 6 }}>
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
                    Block Time
                  </Text>
                  <Text size="sm" c="dimmed">
                    Temporarily block specific time slots
                  </Text>
                  <Button variant="light" size="sm" mt="xs">
                    Block Time
                  </Button>
                </Box>
              </Group>
            </Card>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6 }}>
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
                  <IconClock size={24} color="white" />
                </Box>
                <Box>
                  <Text size="lg" fw={600}>
                    Set Break Times
                  </Text>
                  <Text size="sm" c="dimmed">
                    Configure lunch and break schedules
                  </Text>
                  <Button variant="light" size="sm" mt="xs" color="green">
                    Configure
                  </Button>
                </Box>
              </Group>
            </Card>
          </Grid.Col>
        </Grid>
      </Stack>

      {/* Edit Time Slot Modal */}
      <Modal
        opened={editModalOpened}
        onClose={() => setEditModalOpened(false)}
        title="Edit Time Slot"
        size="md"
      >
        {editingSlot && (
          <Stack gap="md">
            <Select
              label="Day"
              placeholder="Select a day"
              data={["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]}
              value={editingSlot.day}
              onChange={(value) =>
                setEditingSlot({ ...editingSlot, day: value || "" })
              }
              required
            />
            <TextInput
              label="Start Time"
              placeholder="Start time"
              value={editingSlot.startTime}
              onChange={(event) =>
                setEditingSlot({
                  ...editingSlot,
                  startTime: event.currentTarget.value,
                })
              }
              required
            />
            <TextInput
              label="End Time"
              placeholder="End time"
              value={editingSlot.endTime}
              onChange={(event) =>
                setEditingSlot({
                  ...editingSlot,
                  endTime: event.currentTarget.value,
                })
              }
              required
            />
            <Group justify="flex-end">
              <Button
                variant="outline"
                onClick={() => setEditModalOpened(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleEditSlot}>Save Changes</Button>
            </Group>
          </Stack>
        )}
      </Modal>
    </Container>
  );
};

export default AvailabilityPage;
