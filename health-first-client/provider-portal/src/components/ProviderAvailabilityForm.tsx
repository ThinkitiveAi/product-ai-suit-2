import React, { useState } from "react";
import {
  Paper,
  Title,
  Text,
  Select,
  Button,
  Group,
  Stack,
  Grid,
  Divider,
  ActionIcon,
  Box,
  Container,
  TextInput,
  Badge,
  Flex,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  IconClock,
  IconCalendar,
  IconTrash,
  IconPlus,
  IconUser,
  IconSettings,
  IconX,
  IconArrowLeft,
} from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";

interface DayAvailability {
  id: string;
  day: string;
  fromTime: string;
  tillTime: string;
}

interface BlockedDay {
  id: string;
  date: string;
  fromTime: string;
  tillTime: string;
}

interface ProviderAvailabilityFormData {
  provider: string;
  timeZone: string;
  dayAvailabilities: DayAvailability[];
  blockedDays: BlockedDay[];
}

const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const TIME_ZONES = [
  "UTC-08:00 Pacific Time (US & Canada)",
  "UTC-07:00 Mountain Time (US & Canada)",
  "UTC-06:00 Central Time (US & Canada)",
  "UTC-05:00 Eastern Time (US & Canada)",
  "UTC+00:00 Greenwich Mean Time",
  "UTC+01:00 Central European Time",
  "UTC+05:30 India Standard Time",
  "UTC+08:00 China Standard Time",
];

const PROVIDERS = [
  "John Doe",
  "Jane Smith",
  "Dr. Michael Johnson",
  "Dr. Sarah Williams",
  "Dr. Robert Brown",
];

interface ProviderAvailabilityFormProps {
  onBack?: () => void;
}

const ProviderAvailabilityForm: React.FC<ProviderAvailabilityFormProps> = ({
  onBack,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ProviderAvailabilityFormData>({
    initialValues: {
      provider: "John Doe",
      timeZone: "",
      dayAvailabilities: DAYS_OF_WEEK.map((day, index) => ({
        id: `day-${index}`,
        day,
        fromTime: "09:00",
        tillTime: "18:00",
      })),
      blockedDays: [
        {
          id: "block-1",
          date: "",
          fromTime: "",
          tillTime: "",
        },
        {
          id: "block-2",
          date: "",
          fromTime: "",
          tillTime: "",
        },
      ],
    },
    validate: {
      provider: (value) => (!value ? "Provider is required" : null),
      timeZone: (value) => (!value ? "Time zone is required" : null),
    },
  });

  const addDayAvailability = () => {
    const newDay = {
      id: `day-${Date.now()}`,
      day: "Monday",
      fromTime: "09:00",
      tillTime: "18:00",
    };
    form.insertListItem("dayAvailabilities", newDay);
  };

  const removeDayAvailability = (index: number) => {
    form.removeListItem("dayAvailabilities", index);
  };

  const addBlockedDay = () => {
    const newBlockedDay = {
      id: `block-${Date.now()}`,
      date: "",
      fromTime: "",
      tillTime: "",
    };
    form.insertListItem("blockedDays", newBlockedDay);
  };

  const removeBlockedDay = (index: number) => {
    form.removeListItem("blockedDays", index);
  };

  const handleSubmit = async (values: ProviderAvailabilityFormData) => {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      notifications.show({
        title: "Success!",
        message: "Provider availability has been saved successfully.",
        color: "green",
        icon: <IconSettings size={16} />,
      });

      console.log("Form submitted:", values);
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Failed to save provider availability. Please try again.",
        color: "red",
        icon: <IconX size={16} />,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    // Handle close action - could navigate back or close modal
    console.log("Closing form");
  };

  return (
    <Container size="xl" py="xl">
      <Paper radius="lg" p="xl" withBorder shadow="md">
        <Stack gap="xl">
          {/* Header */}
          <Box>
            <Group justify="space-between" align="center" mb="md">
              {onBack && (
                <Button
                  variant="subtle"
                  leftSection={<IconArrowLeft size={16} />}
                  onClick={onBack}
                  size="sm"
                >
                  Back to Availability
                </Button>
              )}
            </Group>
            <Title order={1} size="h2" c="blue.7" mb="xs">
              Provider Availability Management
            </Title>
            <Text size="sm" c="dimmed">
              Set up weekly schedules and manage blocked time periods
            </Text>
          </Box>

          {/* Main Form */}
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Grid gutter="xl">
              {/* Left Panel - Day Wise Availability */}
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Paper p="lg" withBorder radius="md">
                  <Stack gap="lg">
                    {/* Provider Selection */}
                    <Box>
                      <Text size="sm" fw={500} mb="xs" c="dimmed">
                        Provider
                      </Text>
                      <Select
                        data={PROVIDERS}
                        placeholder="Select Provider"
                        leftSection={<IconUser size={16} />}
                        {...form.getInputProps("provider")}
                      />
                    </Box>

                    {/* Day Wise Availability Title */}
                    <Title order={3} size="h4" c="blue.7">
                      Day Wise Availability
                    </Title>

                    {/* Weekly Schedule Grid */}
                    <Stack gap="md">
                      {form.values.dayAvailabilities.map((item, index) => (
                        <Paper
                          key={item.id}
                          p="md"
                          withBorder
                          radius="sm"
                          bg="gray.0"
                        >
                          <Grid gutter="xs" align="center">
                            <Grid.Col span={3}>
                              <Select
                                data={DAYS_OF_WEEK}
                                placeholder="Select Day"
                                {...form.getInputProps(
                                  `dayAvailabilities.${index}.day`
                                )}
                                size="sm"
                              />
                            </Grid.Col>
                            <Grid.Col span={3}>
                              <TextInput
                                type="time"
                                leftSection={<IconClock size={14} />}
                                placeholder="From"
                                {...form.getInputProps(
                                  `dayAvailabilities.${index}.fromTime`
                                )}
                                size="sm"
                              />
                            </Grid.Col>
                            <Grid.Col span={3}>
                              <TextInput
                                type="time"
                                leftSection={<IconClock size={14} />}
                                placeholder="Till"
                                {...form.getInputProps(
                                  `dayAvailabilities.${index}.tillTime`
                                )}
                                size="sm"
                              />
                            </Grid.Col>
                            <Grid.Col span={3}>
                              <ActionIcon
                                variant="subtle"
                                color="red"
                                onClick={() => removeDayAvailability(index)}
                                size="sm"
                              >
                                <IconTrash size={16} />
                              </ActionIcon>
                            </Grid.Col>
                          </Grid>
                        </Paper>
                      ))}
                    </Stack>
                  </Stack>
                </Paper>
              </Grid.Col>

              {/* Right Panel - Slot Creation Setting */}
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Paper p="lg" withBorder radius="md">
                  <Stack gap="lg">
                    {/* Slot Creation Setting Title */}
                    <Title order={3} size="h4" c="blue.7">
                      Slot Creation Setting
                    </Title>

                    {/* Time Zone Section */}
                    <Box>
                      <Text size="sm" fw={500} mb="xs" c="dimmed">
                        Time Zone
                      </Text>
                      <Select
                        data={TIME_ZONES}
                        placeholder="Select Time Zone"
                        leftSection={<IconClock size={16} />}
                        {...form.getInputProps("timeZone")}
                      />
                    </Box>

                    {/* Block Days Configuration */}
                    <Box>
                      <Title order={4} size="h5" mb="md">
                        Block Days
                      </Title>

                      <Stack gap="md">
                        {form.values.blockedDays.map((item, index) => (
                          <Paper
                            key={item.id}
                            p="md"
                            withBorder
                            radius="sm"
                            bg="gray.0"
                          >
                            <Grid gutter="xs" align="center">
                              <Grid.Col span={3}>
                                <TextInput
                                  leftSection={<IconCalendar size={14} />}
                                  placeholder="Select Date"
                                  type="date"
                                  {...form.getInputProps(
                                    `blockedDays.${index}.date`
                                  )}
                                  size="sm"
                                />
                              </Grid.Col>
                              <Grid.Col span={3}>
                                <TextInput
                                  type="time"
                                  leftSection={<IconClock size={14} />}
                                  placeholder="From"
                                  {...form.getInputProps(
                                    `blockedDays.${index}.fromTime`
                                  )}
                                  size="sm"
                                />
                              </Grid.Col>
                              <Grid.Col span={3}>
                                <TextInput
                                  type="time"
                                  leftSection={<IconClock size={14} />}
                                  placeholder="Till"
                                  {...form.getInputProps(
                                    `blockedDays.${index}.tillTime`
                                  )}
                                  size="sm"
                                />
                              </Grid.Col>
                              <Grid.Col span={3}>
                                <ActionIcon
                                  variant="subtle"
                                  color="red"
                                  onClick={() => removeBlockedDay(index)}
                                  size="sm"
                                >
                                  <IconTrash size={16} />
                                </ActionIcon>
                              </Grid.Col>
                            </Grid>
                          </Paper>
                        ))}
                      </Stack>

                      <Button
                        variant="outline"
                        leftSection={<IconPlus size={16} />}
                        onClick={addBlockedDay}
                        mt="md"
                        size="sm"
                      >
                        Add Block Days
                      </Button>
                    </Box>
                  </Stack>
                </Paper>
              </Grid.Col>
            </Grid>

            {/* Bottom Action Bar */}
            <Divider my="xl" />
            <Flex justify="flex-end" gap="md">
              <Button variant="outline" onClick={handleClose} size="md">
                Close
              </Button>
              <Button type="submit" loading={isLoading} size="md">
                Save
              </Button>
            </Flex>
          </form>
        </Stack>
      </Paper>
    </Container>
  );
};

export default ProviderAvailabilityForm;
