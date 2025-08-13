import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Text,
  Anchor,
  Stack,
  Group,
  Divider,
  Container,
  Box,
  Select,
  NumberInput,
  Alert,
  Progress,
  Stepper,
  Card,
  Badge,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  IconMail,
  IconLock,
  IconEye,
  IconEyeOff,
  IconUser,
  IconPhone,
  IconStethoscope,
  IconId,
  IconMapPin,
  IconShield,
  IconCheck,
  IconX,
} from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";

interface RegisterFormData {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  // Professional Information
  specialization: string;
  medicalLicense: string;
  yearsOfExperience: number;

  // Clinic Address
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;

  // Account Security
  password: string;
  confirmPassword: string;
}

const medicalSpecialties = [
  "Cardiology",
  "Dermatology",
  "Emergency Medicine",
  "Family Medicine",
  "Gastroenterology",
  "Internal Medicine",
  "Neurology",
  "Obstetrics & Gynecology",
  "Oncology",
  "Ophthalmology",
  "Orthopedics",
  "Pediatrics",
  "Psychiatry",
  "Radiology",
  "Surgery",
  "Urology",
  "Other",
];

const usStates = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const form = useForm<RegisterFormData>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      specialization: "",
      medicalLicense: "",
      yearsOfExperience: 0,
      streetAddress: "",
      city: "",
      state: "",
      zipCode: "",
      password: "",
      confirmPassword: "",
    },
    validate: {
      firstName: (value) => {
        if (!value) return "First name is required";
        if (value.length < 2) return "First name must be at least 2 characters";
        if (value.length > 50)
          return "First name must be less than 50 characters";
        return null;
      },
      lastName: (value) => {
        if (!value) return "Last name is required";
        if (value.length < 2) return "Last name must be at least 2 characters";
        if (value.length > 50)
          return "Last name must be less than 50 characters";
        return null;
      },
      email: (value) => {
        if (!value) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Invalid email format";
        return null;
      },
      phone: (value) => {
        if (!value) return "Phone number is required";
        if (
          !/^\+?1?\s*\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}$/.test(
            value.replace(/\s/g, "")
          )
        ) {
          return "Invalid phone number format";
        }
        return null;
      },
      specialization: (value) => {
        if (!value) return "Specialization is required";
        if (value.length < 3)
          return "Specialization must be at least 3 characters";
        if (value.length > 100)
          return "Specialization must be less than 100 characters";
        return null;
      },
      medicalLicense: (value) => {
        if (!value) return "Medical license number is required";
        if (!/^[A-Za-z0-9]{6,15}$/.test(value)) {
          return "License must be 6-15 alphanumeric characters";
        }
        return null;
      },
      yearsOfExperience: (value) => {
        if (value === null || value === undefined)
          return "Years of experience is required";
        if (value < 0 || value > 50)
          return "Years of experience must be between 0 and 50";
        return null;
      },
      streetAddress: (value) => {
        if (!value) return "Street address is required";
        if (value.length > 200)
          return "Street address must be less than 200 characters";
        return null;
      },
      city: (value) => {
        if (!value) return "City is required";
        if (value.length > 100) return "City must be less than 100 characters";
        return null;
      },
      state: (value) => {
        if (!value) return "State is required";
        if (value.length > 50) return "State must be less than 50 characters";
        return null;
      },
      zipCode: (value) => {
        if (!value) return "ZIP code is required";
        if (!/^\d{5}(-\d{4})?$/.test(value)) return "Invalid ZIP code format";
        return null;
      },
      password: (value) => {
        if (!value) return "Password is required";
        if (value.length < 8) return "Password must be at least 8 characters";
        if (!/(?=.*[a-z])/.test(value))
          return "Password must contain at least one lowercase letter";
        if (!/(?=.*[A-Z])/.test(value))
          return "Password must contain at least one uppercase letter";
        if (!/(?=.*\d)/.test(value))
          return "Password must contain at least one number";
        if (!/(?=.*[!@#$%^&*])/.test(value))
          return "Password must contain at least one special character";
        return null;
      },
      confirmPassword: (value, values) => {
        if (!value) return "Please confirm your password";
        if (value !== values.password) return "Passwords do not match";
        return null;
      },
    },
  });

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/(?=.*[a-z])/.test(password)) strength += 25;
    if (/(?=.*[A-Z])/.test(password)) strength += 25;
    if (/(?=.*\d)/.test(password)) strength += 25;
    if (/(?=.*[!@#$%^&*])/.test(password)) strength += 25;
    return Math.min(strength, 100);
  };

  const getPasswordStrengthColor = (strength: number) => {
    if (strength < 50) return "red";
    if (strength < 75) return "yellow";
    return "green";
  };

  const getPasswordStrengthLabel = (strength: number) => {
    if (strength < 50) return "Weak";
    if (strength < 75) return "Fair";
    return "Strong";
  };

  const handleSubmit = async (values: RegisterFormData) => {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      notifications.show({
        title: "Registration Successful!",
        message:
          "Your account has been created successfully. Please check your email for verification.",
        color: "green",
        icon: <IconCheck size={16} />,
      });

      // Navigate to login after successful registration
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      notifications.show({
        title: "Registration Failed",
        message: "There was an error creating your account. Please try again.",
        color: "red",
        icon: <IconX size={16} />,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleStepChange = (nextStep: number) => {
    const currentStepFields = getStepFields(activeStep);

    // Validate only the current step fields
    const errors = form.validate();
    const hasCurrentStepErrors = currentStepFields.some(
      (field) => errors.errors[field]
    );

    if (!hasCurrentStepErrors) {
      setActiveStep(nextStep);
    }
  };

  const getStepFields = (step: number) => {
    switch (step) {
      case 0:
        return ["firstName", "lastName", "email", "phone"];
      case 1:
        return ["specialization", "medicalLicense", "yearsOfExperience"];
      case 2:
        return ["streetAddress", "city", "state", "zipCode"];
      case 3:
        return ["password", "confirmPassword"];
      default:
        return [];
    }
  };

  const canProceedToNext = () => {
    const currentStepFields = getStepFields(activeStep);
    const errors = form.errors;

    // Check if current step fields have errors
    return !currentStepFields.some((field) => errors[field]);
  };

  const canSubmit = () => {
    const errors = form.errors;
    return Object.keys(errors).length === 0;
  };

  const steps = [
    { label: "Personal Info", icon: <IconUser size={16} /> },
    { label: "Professional", icon: <IconStethoscope size={16} /> },
    { label: "Address", icon: <IconMapPin size={16} /> },
    { label: "Security", icon: <IconShield size={16} /> },
  ];

  return (
    <Container size="lg" py="xl">
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
          {/* Logo/Brand Area */}
          <Box ta="center" mb="md">
            <Title order={1} size="h2" c="blue.7" mb="xs">
              HealthFirst
            </Title>
            <Text size="sm" c="dimmed">
              Provider Registration
            </Text>
          </Box>

          {/* Welcome Text */}
          <Box ta="center" mb="xl">
            <Title order={2} size="h3" mb="xs">
              Join HealthFirst
            </Title>
            <Text size="sm" c="dimmed">
              Create your provider account in just a few steps
            </Text>
          </Box>

          {/* Stepper */}
          <Stepper
            active={activeStep}
            onStepClick={setActiveStep}
            allowNextStepsSelect={false}
            size="sm"
            mb="xl"
          >
            {steps.map((step, index) => (
              <Stepper.Step
                key={index}
                label={step.label}
                icon={step.icon}
                completedIcon={<IconCheck size={16} />}
              />
            ))}
          </Stepper>

          {/* Registration Form */}
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap="lg">
              {/* Step 1: Personal Information */}
              {activeStep === 0 && (
                <Card withBorder p="md">
                  <Title order={3} size="h4" mb="md" c="blue.7">
                    Personal Information
                  </Title>
                  <Stack gap="md">
                    <Group grow>
                      <TextInput
                        label="First Name"
                        placeholder="Enter your first name"
                        leftSection={<IconUser size={16} />}
                        {...form.getInputProps("firstName")}
                        required
                      />
                      <TextInput
                        label="Last Name"
                        placeholder="Enter your last name"
                        leftSection={<IconUser size={16} />}
                        {...form.getInputProps("lastName")}
                        required
                      />
                    </Group>
                    <TextInput
                      label="Email Address"
                      placeholder="Enter your email address"
                      leftSection={<IconMail size={16} />}
                      {...form.getInputProps("email")}
                      required
                    />
                    <TextInput
                      label="Phone Number"
                      placeholder="(555) 123-4567"
                      leftSection={<IconPhone size={16} />}
                      {...form.getInputProps("phone")}
                      required
                    />
                  </Stack>
                </Card>
              )}

              {/* Step 2: Professional Information */}
              {activeStep === 1 && (
                <Card withBorder p="md">
                  <Title order={3} size="h4" mb="md" c="blue.7">
                    Professional Information
                  </Title>
                  <Stack gap="md">
                    <Select
                      label="Specialization"
                      placeholder="Select your medical specialty"
                      leftSection={<IconStethoscope size={16} />}
                      data={medicalSpecialties}
                      searchable
                      {...form.getInputProps("specialization")}
                      required
                    />
                    <TextInput
                      label="Medical License Number"
                      placeholder="Enter your license number"
                      leftSection={<IconId size={16} />}
                      {...form.getInputProps("medicalLicense")}
                      required
                    />
                    <NumberInput
                      label="Years of Experience"
                      placeholder="Enter years of experience"
                      leftSection={<IconStethoscope size={16} />}
                      min={0}
                      max={50}
                      {...form.getInputProps("yearsOfExperience")}
                      required
                    />
                  </Stack>
                </Card>
              )}

              {/* Step 3: Clinic Address */}
              {activeStep === 2 && (
                <Card withBorder p="md">
                  <Title order={3} size="h4" mb="md" c="blue.7">
                    Clinic Address
                  </Title>
                  <Stack gap="md">
                    <TextInput
                      label="Street Address"
                      placeholder="Enter your clinic address"
                      leftSection={<IconMapPin size={16} />}
                      {...form.getInputProps("streetAddress")}
                      required
                    />
                    <Group grow>
                      <TextInput
                        label="City"
                        placeholder="Enter city"
                        leftSection={<IconMapPin size={16} />}
                        {...form.getInputProps("city")}
                        required
                      />
                      <Select
                        label="State"
                        placeholder="Select state"
                        leftSection={<IconMapPin size={16} />}
                        data={usStates}
                        searchable
                        {...form.getInputProps("state")}
                        required
                      />
                    </Group>
                    <TextInput
                      label="ZIP Code"
                      placeholder="12345 or 12345-6789"
                      leftSection={<IconMapPin size={16} />}
                      {...form.getInputProps("zipCode")}
                      required
                    />
                  </Stack>
                </Card>
              )}

              {/* Step 4: Account Security */}
              {activeStep === 3 && (
                <Card withBorder p="md">
                  <Title order={3} size="h4" mb="md" c="blue.7">
                    Account Security
                  </Title>
                  <Stack gap="md">
                    <PasswordInput
                      label="Password"
                      placeholder="Create a strong password"
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

                    {/* Password Strength Indicator */}
                    {form.values.password && (
                      <Box>
                        <Group justify="space-between" mb="xs">
                          <Text size="sm">Password strength</Text>
                          <Badge
                            color={getPasswordStrengthColor(
                              getPasswordStrength(form.values.password)
                            )}
                            variant="light"
                          >
                            {getPasswordStrengthLabel(
                              getPasswordStrength(form.values.password)
                            )}
                          </Badge>
                        </Group>
                        <Progress
                          value={getPasswordStrength(form.values.password)}
                          color={getPasswordStrengthColor(
                            getPasswordStrength(form.values.password)
                          )}
                          size="sm"
                        />
                        <Text size="xs" c="dimmed" mt="xs">
                          Password must contain at least 8 characters, one
                          uppercase letter, one lowercase letter, one number,
                          and one special character.
                        </Text>
                      </Box>
                    )}

                    <PasswordInput
                      label="Confirm Password"
                      placeholder="Confirm your password"
                      leftSection={<IconLock size={16} />}
                      rightSection={
                        <Button
                          variant="subtle"
                          size="xs"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          style={{ border: "none" }}
                        >
                          {showConfirmPassword ? (
                            <IconEyeOff size={16} />
                          ) : (
                            <IconEye size={16} />
                          )}
                        </Button>
                      }
                      {...form.getInputProps("confirmPassword")}
                      required
                    />
                  </Stack>
                </Card>
              )}

              {/* Navigation Buttons */}
              <Group justify="space-between" mt="xl">
                <Button
                  variant="outline"
                  onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                  disabled={activeStep === 0}
                >
                  Previous
                </Button>

                {activeStep < 3 ? (
                  <Button
                    onClick={() => handleStepChange(activeStep + 1)}
                    disabled={!canProceedToNext()}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    loading={isLoading}
                    disabled={!canSubmit()}
                  >
                    Create Account
                  </Button>
                )}
              </Group>
            </Stack>
          </form>

          {/* Sign In Link */}
          <Text ta="center" size="sm" c="dimmed">
            Already have an account?{" "}
            <Anchor component={Link} to="/login" size="sm">
              Sign in
            </Anchor>
          </Text>
        </Stack>
      </Paper>
    </Container>
  );
};

export default RegisterForm;
