import React, { useState } from "react";
import {
  Modal,
  Title,
  Text,
  Select,
  Button,
  Group,
  Stack,
  Grid,
  TextInput,
  Textarea,
  Radio,
  ActionIcon,
  Box,
  Container,
  useMantineTheme,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconX, IconCalendar, IconSearch } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";

interface AppointmentFormData {
  patientName: string;
  appointmentMode: "in-person" | "video-call" | "home";
  provider: string;
  estimatedAmount: string;
  reasonForVisit: string;
  appointmentType: string;
  dateTime: string;
}

interface AppointmentSchedulingFormProps {
  opened: boolean;
  onClose: () => void;
}

// Mock data for dropdowns
const PATIENTS = [
  "Sanskruti Suresh Kunjir",
  "John Smith",
  "Jane Doe",
  "Michael Johnson",
  "Sarah Williams",
];

const PROVIDERS = [
  "Dr. John Doe",
  "Dr. Jane Smith",
  "Dr. Michael Johnson",
  "Dr. Sarah Williams",
  "Dr. Robert Brown",
];

const APPOINTMENT_TYPES = [
  "General Checkup",
  "Follow-up",
  "Consultation",
  "Emergency",
  "Routine Visit",
  "Specialist Consultation",
];

const AppointmentSchedulingForm: React.FC<AppointmentSchedulingFormProps> = ({
  opened,
  onClose,
}) => {
  const theme = useMantineTheme();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<AppointmentFormData>({
    initialValues: {
      patientName: "",
      appointmentMode: "in-person",
      provider: "",
      estimatedAmount: "",
      reasonForVisit: "",
      appointmentType: "",
      dateTime: "",
    },
    validate: {
      patientName: (value) => (!value ? "Patient name is required" : null),
      provider: (value) => (!value ? "Provider is required" : null),
      appointmentType: (value) =>
        !value ? "Appointment type is required" : null,
      dateTime: (value) => (!value ? "Date and time is required" : null),
      estimatedAmount: (value) => {
        if (!value) return null;
        const amount = parseFloat(value);
        if (isNaN(amount) || amount < 0) {
          return "Please enter a valid amount";
        }
        return null;
      },
    },
  });

  const handleSubmit = async (values: AppointmentFormData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      notifications.show({
        title: "Success",
        message: "Appointment scheduled successfully!",
        color: "green",
      });

      form.reset();
      onClose();
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Failed to schedule appointment. Please try again.",
        color: "red",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      size="xl"
      centered
      closeOnClickOutside={false}
      closeOnEscape={false}
      title={<Title order={4}>Schedule New Appointment</Title>}
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Modal.Body p="1.5rem">
          <Grid gutter="xl">
            {/* Left Column */}
            <Grid.Col span={6}>
              <Stack gap="lg">
                {/* Patient Name */}
                <Select
                  label="Patient Name"
                  placeholder="Search & Select Patient"
                  data={PATIENTS}
                  searchable
                  clearable
                  leftSection={<IconSearch size={16} />}
                  rightSection={<IconSearch size={16} />}
                  {...form.getInputProps("patientName")}
                  styles={{
                    label: {
                      color: theme.colors.gray[7],
                      fontWeight: 500,
                      marginBottom: "0.5rem",
                    },
                    input: {
                      borderColor: theme.colors.gray[3],
                      "&:focus": {
                        borderColor: theme.colors.violet[6],
                      },
                    },
                  }}
                />

                {/* Appointment Mode */}
                <Box>
                  <Text size="sm" fw={500} c="gray.7" mb="0.5rem">
                    Appointment Mode
                  </Text>
                  <Radio.Group
                    value={form.values.appointmentMode}
                    onChange={(value) =>
                      form.setFieldValue("appointmentMode", value as any)
                    }
                    name="appointmentMode"
                  >
                    <Group gap="lg">
                      <Radio
                        value="in-person"
                        label="In-Person"
                        styles={{
                          label: {
                            color: theme.colors.gray[7],
                          },
                        }}
                      />
                      <Radio
                        value="video-call"
                        label="Video Call"
                        styles={{
                          label: {
                            color: theme.colors.gray[7],
                          },
                        }}
                      />
                      <Radio
                        value="home"
                        label="Home"
                        styles={{
                          label: {
                            color: theme.colors.gray[7],
                          },
                        }}
                      />
                    </Group>
                  </Radio.Group>
                </Box>

                {/* Provider */}
                <Select
                  label="Provider"
                  placeholder="Search Provider"
                  data={PROVIDERS}
                  searchable
                  clearable
                  leftSection={<IconSearch size={16} />}
                  rightSection={<IconSearch size={16} />}
                  {...form.getInputProps("provider")}
                  styles={{
                    label: {
                      color: theme.colors.gray[7],
                      fontWeight: 500,
                      marginBottom: "0.5rem",
                    },
                    input: {
                      borderColor: theme.colors.gray[3],
                      "&:focus": {
                        borderColor: theme.colors.violet[6],
                      },
                    },
                  }}
                />

                {/* Estimated Amount */}
                <TextInput
                  label="Estimated Amount ($)"
                  placeholder="Enter Amount"
                  type="number"
                  min={0}
                  step={0.01}
                  {...form.getInputProps("estimatedAmount")}
                  styles={{
                    label: {
                      color: theme.colors.gray[7],
                      fontWeight: 500,
                      marginBottom: "0.5rem",
                    },
                    input: {
                      borderColor: theme.colors.gray[3],
                      "&:focus": {
                        borderColor: theme.colors.violet[6],
                      },
                    },
                  }}
                />

                {/* Reason for Visit */}
                <Textarea
                  label="Reason for Visit"
                  placeholder="Enter Reason"
                  minRows={3}
                  maxRows={5}
                  {...form.getInputProps("reasonForVisit")}
                  styles={{
                    label: {
                      color: theme.colors.gray[7],
                      fontWeight: 500,
                      marginBottom: "0.5rem",
                    },
                    input: {
                      borderColor: theme.colors.gray[3],
                      "&:focus": {
                        borderColor: theme.colors.violet[6],
                      },
                    },
                  }}
                />
              </Stack>
            </Grid.Col>

            {/* Right Column */}
            <Grid.Col span={6}>
              <Stack gap="lg">
                {/* Appointment Type */}
                <Select
                  label="Appointment Type"
                  placeholder="Select Type"
                  data={APPOINTMENT_TYPES}
                  clearable
                  {...form.getInputProps("appointmentType")}
                  styles={{
                    label: {
                      color: theme.colors.gray[7],
                      fontWeight: 500,
                      marginBottom: "0.5rem",
                    },
                    input: {
                      borderColor: theme.colors.gray[3],
                      "&:focus": {
                        borderColor: theme.colors.violet[6],
                      },
                    },
                  }}
                />

                {/* Date & Time */}
                <TextInput
                  label="Date & Time"
                  placeholder="Choose Date"
                  type="datetime-local"
                  leftSection={<IconCalendar size={16} />}
                  {...form.getInputProps("dateTime")}
                  styles={{
                    label: {
                      color: theme.colors.gray[7],
                      fontWeight: 500,
                      marginBottom: "0.5rem",
                    },
                    input: {
                      borderColor: theme.colors.gray[3],
                      "&:focus": {
                        borderColor: theme.colors.violet[6],
                      },
                    },
                  }}
                />
              </Stack>
            </Grid.Col>
          </Grid>
        </Modal.Body>

        {/* Footer with Save & Close Button */}
        <Box
          p="1.5rem"
          style={{
            borderTop: `1px solid ${theme.colors.gray[2]}`,
            backgroundColor: theme.colors.gray[0],
          }}
        >
          <Group justify="flex-end">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
              styles={{
                root: {
                  borderColor: theme.colors.gray[4],
                  color: theme.colors.gray[7],
                  "&:hover": {
                    backgroundColor: theme.colors.gray[1],
                  },
                },
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={isLoading}
              styles={{
                root: {
                  backgroundColor: theme.colors.blue[7],
                  "&:hover": {
                    backgroundColor: theme.colors.blue[8],
                  },
                },
              }}
            >
              Save & Close
            </Button>
          </Group>
        </Box>
      </form>
    </Modal>
  );
};

export default AppointmentSchedulingForm;
