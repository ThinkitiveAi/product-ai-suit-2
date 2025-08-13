import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Paper,
  TextInput,
  Select,
  Textarea,
  Checkbox,
  Button,
  Title,
  Text,
  Stack,
  Group,
  Container,
  Box,
  Stepper,
  Divider,
  FileInput,
  Grid,
  Alert,
  Modal,
  ActionIcon,
  Badge,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  IconUser,
  IconPhone,
  IconMail,
  IconShield,
  IconStethoscope,
  IconFileText,
  IconCheck,
  IconPlus,
  IconTrash,
  IconDownload,
  IconPrinter,
  IconAlertTriangle,
  IconCalendar,
} from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";

interface PatientFormData {
  // Demographics
  firstName: string;
  middleInitial: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  ssn: string;
  preferredLanguage: string;
  maritalStatus: string;

  // Contact Information
  homeAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  mailingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  sameAsHome: boolean;
  primaryPhone: string;
  secondaryPhone: string;
  email: string;
  preferredContactMethod: string;

  // Insurance
  primaryInsurance: {
    provider: string;
    policyNumber: string;
    groupNumber: string;
    subscriberName: string;
    relationship: string;
  };
  secondaryInsurance: {
    provider: string;
    policyNumber: string;
    groupNumber: string;
    subscriberName: string;
    relationship: string;
  };
  hasSecondaryInsurance: boolean;

  // Emergency Contacts
  emergencyContacts: Array<{
    name: string;
    relationship: string;
    phone: string;
  }>;
  medicalPowerOfAttorney: {
    name: string;
    relationship: string;
    phone: string;
  };

  // Medical History
  currentMedications: string;
  allergies: string;
  primaryCarePhysician: string;
  reasonForVisit: string;

  // Administrative
  referralSource: string;
  consentTreatment: boolean;
  consentPrivacy: boolean;
  consentBilling: boolean;
  electronicSignature: string;
  providerNotes: string;
}

const PatientRegistrationForm: React.FC = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [patientId, setPatientId] = useState("");

  const form = useForm<PatientFormData>({
    initialValues: {
      firstName: "",
      middleInitial: "",
      lastName: "",
      dateOfBirth: "",
      gender: "",
      ssn: "",
      preferredLanguage: "English",
      maritalStatus: "",

      homeAddress: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
      },
      mailingAddress: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
      },
      sameAsHome: false,
      primaryPhone: "",
      secondaryPhone: "",
      email: "",
      preferredContactMethod: "phone",

      primaryInsurance: {
        provider: "",
        policyNumber: "",
        groupNumber: "",
        subscriberName: "",
        relationship: "",
      },
      secondaryInsurance: {
        provider: "",
        policyNumber: "",
        groupNumber: "",
        subscriberName: "",
        relationship: "",
      },
      hasSecondaryInsurance: false,

      emergencyContacts: [
        { name: "", relationship: "", phone: "" },
        { name: "", relationship: "", phone: "" },
      ],
      medicalPowerOfAttorney: {
        name: "",
        relationship: "",
        phone: "",
      },

      currentMedications: "",
      allergies: "",
      primaryCarePhysician: "",
      reasonForVisit: "",

      referralSource: "",
      consentTreatment: false,
      consentPrivacy: false,
      consentBilling: false,
      electronicSignature: "",
      providerNotes: "",
    },
    validate: {
      firstName: (value) => (!value ? "First name is required" : null),
      lastName: (value) => (!value ? "Last name is required" : null),
      dateOfBirth: (value) => (!value ? "Date of birth is required" : null),
      gender: (value) => (!value ? "Gender is required" : null),
      primaryPhone: (value) => (!value ? "Primary phone is required" : null),
      email: (value) => {
        if (!value) return null;
        if (!/^\S+@\S+$/.test(value)) return "Invalid email format";
        return null;
      },
    },
  });

  // Auto-save functionality
  useEffect(() => {
    const interval = setInterval(() => {
      const formData = form.values;
      localStorage.setItem(
        "patientRegistrationDraft",
        JSON.stringify(formData)
      );
    }, 30000);

    return () => clearInterval(interval);
  }, [form.values]);

  // Load draft on component mount
  useEffect(() => {
    const savedDraft = localStorage.getItem("patientRegistrationDraft");
    if (savedDraft) {
      try {
        const draftData = JSON.parse(savedDraft);
        form.setValues(draftData);
        notifications.show({
          title: "Draft Loaded",
          message: "Your previous registration draft has been loaded.",
          color: "blue",
        });
      } catch (error) {
        console.error("Error loading draft:", error);
      }
    }
  }, []);

  const calculateAge = (birthDate: string): number => {
    if (!birthDate) return 0;
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }
    return age;
  };

  const formatPhoneNumber = (value: string): string => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6)
      return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(
      6,
      10
    )}`;
  };

  const formatSSN = (value: string): string => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 5)
      return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 5)}-${numbers.slice(
      5,
      9
    )}`;
  };

  const handleNext = () => {
    if (form.validate().hasErrors) return;
    setActiveStep((current) => Math.min(current + 1, 5));
  };

  const handlePrevious = () => {
    setActiveStep((current) => Math.max(current - 1, 0));
  };

  const handleSubmit = async (values: PatientFormData) => {
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Generate patient ID
    const generatedId = `P${Date.now().toString().slice(-6)}`;
    setPatientId(generatedId);

    // Clear draft
    localStorage.removeItem("patientRegistrationDraft");

    setIsLoading(false);
    setShowSuccessModal(true);
  };

  const handlePrintSummary = () => {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Patient Registration Summary</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              .header { text-align: center; margin-bottom: 30px; }
              .section { margin-bottom: 20px; }
              .field { margin-bottom: 10px; }
              .label { font-weight: bold; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>HealthFirst Patient Portal</h1>
              <h2>Patient Registration Summary</h2>
              <p>Patient ID: ${patientId}</p>
            </div>
            <div class="section">
              <h3>Patient Information</h3>
              <div class="field">
                <span class="label">Name:</span> ${form.values.firstName} ${form.values.middleInitial} ${form.values.lastName}
              </div>
              <div class="field">
                <span class="label">Date of Birth:</span> ${form.values.dateOfBirth}
              </div>
              <div class="field">
                <span class="label">Gender:</span> ${form.values.gender}
              </div>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const steps = [
    { label: "Demographics", icon: <IconUser size={18} /> },
    { label: "Contact", icon: <IconPhone size={18} /> },
    { label: "Insurance", icon: <IconShield size={18} /> },
    { label: "Emergency", icon: <IconPhone size={18} /> },
    { label: "Medical", icon: <IconStethoscope size={18} /> },
    { label: "Consent", icon: <IconFileText size={18} /> },
  ];

  return (
    <Container size="xl" style={{ padding: "20px" }}>
      <Paper
        radius="lg"
        style={{
          padding: "var(--mantine-spacing-xl)",
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
        withBorder
      >
        {/* Header */}
        <Box
          style={{
            textAlign: "center",
            marginBottom: "var(--mantine-spacing-xl)",
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
          <Text size="lg" style={{ color: "var(--mantine-color-dimmed)" }}>
            Patient Registration Form
          </Text>
          <Text size="sm" style={{ color: "var(--mantine-color-dimmed)" }}>
            Complete all sections to register new patient
          </Text>
        </Box>

        {/* Progress Stepper */}
        <Stepper
          active={activeStep}
          onStepClick={setActiveStep}
          allowNextStepsSelect={false}
          style={{ marginBottom: "var(--mantine-spacing-xl)" }}
        >
          {steps.map((step, index) => (
            <Stepper.Step key={index} label={step.label} icon={step.icon} />
          ))}
        </Stepper>

        {/* Form Sections */}
        <form onSubmit={form.onSubmit(handleSubmit)}>
          {/* Step 1: Demographics */}
          {activeStep === 0 && (
            <Stack gap="lg">
              <Title order={3} style={{ color: "var(--mantine-color-blue-7)" }}>
                <IconUser size={20} style={{ marginRight: "8px" }} />
                Patient Demographics
              </Title>

              <Grid>
                <Grid.Col span={{ base: 12, md: 4 }}>
                  <TextInput
                    label="First Name"
                    placeholder="Enter first name"
                    required
                    {...form.getInputProps("firstName")}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 2 }}>
                  <TextInput
                    label="Middle Initial"
                    placeholder="M.I."
                    maxLength={1}
                    {...form.getInputProps("middleInitial")}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <TextInput
                    label="Last Name"
                    placeholder="Enter last name"
                    required
                    {...form.getInputProps("lastName")}
                  />
                </Grid.Col>
              </Grid>

              <Grid>
                <Grid.Col span={{ base: 12, md: 4 }}>
                  <TextInput
                    label="Date of Birth"
                    placeholder="MM/DD/YYYY"
                    required
                    leftSection={<IconCalendar size={16} />}
                    {...form.getInputProps("dateOfBirth")}
                    rightSection={
                      form.values.dateOfBirth && (
                        <Badge variant="light" color="blue">
                          {calculateAge(form.values.dateOfBirth)} years
                        </Badge>
                      )
                    }
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }}>
                  <Select
                    label="Gender/Sex"
                    placeholder="Select gender"
                    required
                    data={[
                      { value: "male", label: "Male" },
                      { value: "female", label: "Female" },
                      { value: "other", label: "Other" },
                      {
                        value: "prefer-not-to-say",
                        label: "Prefer not to say",
                      },
                    ]}
                    {...form.getInputProps("gender")}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }}>
                  <TextInput
                    label="Social Security Number"
                    placeholder="XXX-XX-XXXX"
                    value={formatSSN(form.values.ssn)}
                    onChange={(e) => {
                      const numbers = e.target.value.replace(/\D/g, "");
                      form.setFieldValue("ssn", numbers);
                    }}
                    maxLength={11}
                  />
                </Grid.Col>
              </Grid>

              <Grid>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <Select
                    label="Preferred Language"
                    placeholder="Select language"
                    data={[
                      { value: "English", label: "English" },
                      { value: "Spanish", label: "Spanish" },
                      { value: "French", label: "French" },
                      { value: "German", label: "German" },
                      { value: "Chinese", label: "Chinese" },
                      { value: "Other", label: "Other" },
                    ]}
                    {...form.getInputProps("preferredLanguage")}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <Select
                    label="Marital Status"
                    placeholder="Select status"
                    data={[
                      { value: "single", label: "Single" },
                      { value: "married", label: "Married" },
                      { value: "divorced", label: "Divorced" },
                      { value: "widowed", label: "Widowed" },
                      { value: "separated", label: "Separated" },
                    ]}
                    {...form.getInputProps("maritalStatus")}
                  />
                </Grid.Col>
              </Grid>
            </Stack>
          )}

          {/* Step 2: Contact Information */}
          {activeStep === 1 && (
            <Stack gap="lg">
              <Title order={3} style={{ color: "var(--mantine-color-blue-7)" }}>
                <IconPhone size={20} style={{ marginRight: "8px" }} />
                Contact Information
              </Title>

              <Title order={4}>Home Address</Title>
              <Grid>
                <Grid.Col span={12}>
                  <TextInput
                    label="Street Address"
                    placeholder="Enter street address"
                    {...form.getInputProps("homeAddress.street")}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }}>
                  <TextInput
                    label="City"
                    placeholder="Enter city"
                    {...form.getInputProps("homeAddress.city")}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }}>
                  <Select
                    label="State"
                    placeholder="Select state"
                    data={[
                      { value: "CA", label: "California" },
                      { value: "NY", label: "New York" },
                      { value: "TX", label: "Texas" },
                      { value: "FL", label: "Florida" },
                      { value: "IL", label: "Illinois" },
                      { value: "PA", label: "Pennsylvania" },
                      { value: "OH", label: "Ohio" },
                      { value: "GA", label: "Georgia" },
                      { value: "NC", label: "North Carolina" },
                      { value: "MI", label: "Michigan" },
                    ]}
                    {...form.getInputProps("homeAddress.state")}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }}>
                  <TextInput
                    label="ZIP Code"
                    placeholder="Enter ZIP code"
                    {...form.getInputProps("homeAddress.zipCode")}
                  />
                </Grid.Col>
              </Grid>

              <Checkbox
                label="Mailing address same as home address"
                {...form.getInputProps("sameAsHome", { type: "checkbox" })}
              />

              <Grid>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <TextInput
                    label="Primary Phone"
                    placeholder="(555) 123-4567"
                    required
                    leftSection={<IconPhone size={16} />}
                    value={formatPhoneNumber(form.values.primaryPhone)}
                    onChange={(e) => {
                      const numbers = e.target.value.replace(/\D/g, "");
                      form.setFieldValue("primaryPhone", numbers);
                    }}
                    maxLength={14}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <TextInput
                    label="Secondary Phone"
                    placeholder="(555) 123-4567"
                    leftSection={<IconPhone size={16} />}
                    value={formatPhoneNumber(form.values.secondaryPhone)}
                    onChange={(e) => {
                      const numbers = e.target.value.replace(/\D/g, "");
                      form.setFieldValue("secondaryPhone", numbers);
                    }}
                    maxLength={14}
                  />
                </Grid.Col>
              </Grid>

              <Grid>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <TextInput
                    label="Email Address"
                    placeholder="patient@example.com"
                    leftSection={<IconMail size={16} />}
                    {...form.getInputProps("email")}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <Select
                    label="Preferred Contact Method"
                    placeholder="Select method"
                    data={[
                      { value: "phone", label: "Phone Call" },
                      { value: "email", label: "Email" },
                      { value: "text", label: "Text Message" },
                    ]}
                    {...form.getInputProps("preferredContactMethod")}
                  />
                </Grid.Col>
              </Grid>
            </Stack>
          )}

          {/* Step 3: Insurance Information */}
          {activeStep === 2 && (
            <Stack gap="lg">
              <Title order={3} style={{ color: "var(--mantine-color-blue-7)" }}>
                <IconShield size={20} style={{ marginRight: "8px" }} />
                Insurance Information
              </Title>

              <Title order={4}>Primary Insurance</Title>
              <Grid>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <Select
                    label="Insurance Provider"
                    placeholder="Select provider"
                    searchable
                    data={[
                      { value: "aetna", label: "Aetna" },
                      { value: "bluecross", label: "Blue Cross Blue Shield" },
                      { value: "cigna", label: "Cigna" },
                      { value: "humana", label: "Humana" },
                      { value: "kaiser", label: "Kaiser Permanente" },
                      { value: "medicare", label: "Medicare" },
                      { value: "medicaid", label: "Medicaid" },
                      { value: "unitedhealth", label: "UnitedHealthcare" },
                      { value: "other", label: "Other" },
                    ]}
                    {...form.getInputProps("primaryInsurance.provider")}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <TextInput
                    label="Policy Number"
                    placeholder="Enter policy number"
                    {...form.getInputProps("primaryInsurance.policyNumber")}
                  />
                </Grid.Col>
              </Grid>

              <Grid>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <TextInput
                    label="Group Number"
                    placeholder="Enter group number"
                    {...form.getInputProps("primaryInsurance.groupNumber")}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <TextInput
                    label="Subscriber Name"
                    placeholder="Enter subscriber name"
                    {...form.getInputProps("primaryInsurance.subscriberName")}
                  />
                </Grid.Col>
              </Grid>

              <Select
                label="Relationship to Patient"
                placeholder="Select relationship"
                data={[
                  { value: "self", label: "Self" },
                  { value: "spouse", label: "Spouse" },
                  { value: "parent", label: "Parent" },
                  { value: "child", label: "Child" },
                  { value: "other", label: "Other" },
                ]}
                {...form.getInputProps("primaryInsurance.relationship")}
              />

              <Checkbox
                label="Has secondary insurance"
                {...form.getInputProps("hasSecondaryInsurance", {
                  type: "checkbox",
                })}
              />

              <FileInput
                label="Insurance Card Upload"
                placeholder="Upload insurance card image"
                accept="image/*"
                leftSection={<IconDownload size={16} />}
              />
            </Stack>
          )}

          {/* Step 4: Emergency Contacts */}
          {activeStep === 3 && (
            <Stack gap="lg">
              <Title order={3} style={{ color: "var(--mantine-color-blue-7)" }}>
                <IconPhone size={20} style={{ marginRight: "8px" }} />
                Emergency Contacts
              </Title>

              {form.values.emergencyContacts.map((contact, index) => (
                <Box
                  key={index}
                  style={{
                    border: "1px solid #e9ecef",
                    borderRadius: "8px",
                    padding: "16px",
                  }}
                >
                  <Group
                    justify="space-between"
                    style={{ marginBottom: "16px" }}
                  >
                    <Title order={4}>Emergency Contact {index + 1}</Title>
                    {index > 0 && (
                      <ActionIcon
                        color="red"
                        variant="subtle"
                        onClick={() => {
                          const newContacts =
                            form.values.emergencyContacts.filter(
                              (_, i) => i !== index
                            );
                          form.setFieldValue("emergencyContacts", newContacts);
                        }}
                      >
                        <IconTrash size={16} />
                      </ActionIcon>
                    )}
                  </Group>

                  <Grid>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <TextInput
                        label="Full Name"
                        placeholder="Enter full name"
                        {...form.getInputProps(
                          `emergencyContacts.${index}.name`
                        )}
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <Select
                        label="Relationship"
                        placeholder="Select relationship"
                        data={[
                          { value: "spouse", label: "Spouse" },
                          { value: "parent", label: "Parent" },
                          { value: "child", label: "Child" },
                          { value: "sibling", label: "Sibling" },
                          { value: "friend", label: "Friend" },
                          { value: "other", label: "Other" },
                        ]}
                        {...form.getInputProps(
                          `emergencyContacts.${index}.relationship`
                        )}
                      />
                    </Grid.Col>
                  </Grid>

                  <TextInput
                    label="Phone Number"
                    placeholder="(555) 123-4567"
                    leftSection={<IconPhone size={16} />}
                    value={formatPhoneNumber(contact.phone)}
                    onChange={(e) => {
                      const numbers = e.target.value.replace(/\D/g, "");
                      form.setFieldValue(
                        `emergencyContacts.${index}.phone`,
                        numbers
                      );
                    }}
                    maxLength={14}
                  />
                </Box>
              ))}

              {form.values.emergencyContacts.length < 3 && (
                <Button
                  variant="outline"
                  leftSection={<IconPlus size={16} />}
                  onClick={() => {
                    const newContacts = [
                      ...form.values.emergencyContacts,
                      { name: "", relationship: "", phone: "" },
                    ];
                    form.setFieldValue("emergencyContacts", newContacts);
                  }}
                >
                  Add Another Emergency Contact
                </Button>
              )}

              <Divider />

              <Title order={4}>Medical Power of Attorney</Title>
              <Grid>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <TextInput
                    label="Full Name"
                    placeholder="Enter full name"
                    {...form.getInputProps("medicalPowerOfAttorney.name")}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <Select
                    label="Relationship"
                    placeholder="Select relationship"
                    data={[
                      { value: "spouse", label: "Spouse" },
                      { value: "parent", label: "Parent" },
                      { value: "child", label: "Child" },
                      { value: "sibling", label: "Sibling" },
                      { value: "attorney", label: "Attorney" },
                      { value: "other", label: "Other" },
                    ]}
                    {...form.getInputProps(
                      "medicalPowerOfAttorney.relationship"
                    )}
                  />
                </Grid.Col>
              </Grid>

              <TextInput
                label="Phone Number"
                placeholder="(555) 123-4567"
                leftSection={<IconPhone size={16} />}
                value={formatPhoneNumber(
                  form.values.medicalPowerOfAttorney.phone
                )}
                onChange={(e) => {
                  const numbers = e.target.value.replace(/\D/g, "");
                  form.setFieldValue("medicalPowerOfAttorney.phone", numbers);
                }}
                maxLength={14}
              />
            </Stack>
          )}

          {/* Step 5: Medical History */}
          {activeStep === 4 && (
            <Stack gap="lg">
              <Title order={3} style={{ color: "var(--mantine-color-blue-7)" }}>
                <IconStethoscope size={20} style={{ marginRight: "8px" }} />
                Medical History
              </Title>

              <Textarea
                label="Current Medications"
                placeholder="List all current medications, dosages, and frequency..."
                minRows={3}
                {...form.getInputProps("currentMedications")}
              />

              <Textarea
                label="Known Allergies"
                placeholder="List all known allergies and their severity (mild, moderate, severe)..."
                minRows={3}
                {...form.getInputProps("allergies")}
              />

              <TextInput
                label="Primary Care Physician"
                placeholder="Enter PCP name and contact information"
                {...form.getInputProps("primaryCarePhysician")}
              />

              <Textarea
                label="Reason for Visit / Chief Complaint"
                placeholder="Describe the primary reason for this visit..."
                minRows={3}
                required
                {...form.getInputProps("reasonForVisit")}
              />
            </Stack>
          )}

          {/* Step 6: Administrative & Consent */}
          {activeStep === 5 && (
            <Stack gap="lg">
              <Title order={3} style={{ color: "var(--mantine-color-blue-7)" }}>
                <IconFileText size={20} style={{ marginRight: "8px" }} />
                Administrative Information & Consent
              </Title>

              <Select
                label="How did you hear about us?"
                placeholder="Select referral source"
                data={[
                  { value: "referral", label: "Physician Referral" },
                  { value: "friend", label: "Friend/Family" },
                  { value: "internet", label: "Internet Search" },
                  { value: "advertisement", label: "Advertisement" },
                  { value: "insurance", label: "Insurance Provider" },
                  { value: "other", label: "Other" },
                ]}
                {...form.getInputProps("referralSource")}
              />

              <Alert
                icon={<IconAlertTriangle size={16} />}
                title="Required Consents"
                color="blue"
                variant="light"
              >
                Please review and acknowledge the following consent forms. These
                are required for treatment.
              </Alert>

              <Stack gap="md">
                <Checkbox
                  label="I consent to medical treatment and authorize HealthFirst to provide medical services"
                  required
                  {...form.getInputProps("consentTreatment", {
                    type: "checkbox",
                  })}
                />
                <Checkbox
                  label="I have read and agree to the Privacy Policy and HIPAA Notice of Privacy Practices"
                  required
                  {...form.getInputProps("consentPrivacy", {
                    type: "checkbox",
                  })}
                />
                <Checkbox
                  label="I authorize HealthFirst to bill my insurance and agree to pay any remaining balance"
                  required
                  {...form.getInputProps("consentBilling", {
                    type: "checkbox",
                  })}
                />
              </Stack>

              <TextInput
                label="Electronic Signature"
                placeholder="Type your full name to sign electronically"
                required
                {...form.getInputProps("electronicSignature")}
              />

              <Textarea
                label="Provider Notes (Internal Use)"
                placeholder="Additional notes for staff..."
                minRows={3}
                {...form.getInputProps("providerNotes")}
              />
            </Stack>
          )}

          {/* Navigation Buttons */}
          <Group
            justify="space-between"
            style={{ marginTop: "var(--mantine-spacing-xl)" }}
          >
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={activeStep === 0}
            >
              Previous
            </Button>

            <Group>
              {activeStep < 5 ? (
                <Button onClick={handleNext}>Next</Button>
              ) : (
                <Button
                  type="submit"
                  loading={isLoading}
                  leftSection={<IconCheck size={16} />}
                >
                  Complete Registration
                </Button>
              )}
            </Group>
          </Group>
        </form>
      </Paper>

      {/* Success Modal */}
      <Modal
        opened={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Registration Successful!"
        size="md"
        centered
      >
        <Stack gap="lg">
          <Alert
            icon={<IconCheck size={16} />}
            title="Patient Registered Successfully"
            color="green"
          >
            The patient has been successfully registered in our system.
          </Alert>

          <Box style={{ textAlign: "center" }}>
            <Title order={3} style={{ color: "var(--mantine-color-blue-7)" }}>
              Patient ID: {patientId}
            </Title>
            <Text size="sm" style={{ color: "var(--mantine-color-dimmed)" }}>
              Please save this ID for future reference
            </Text>
          </Box>

          <Group justify="center">
            <Button
              variant="outline"
              leftSection={<IconPrinter size={16} />}
              onClick={handlePrintSummary}
            >
              Print Summary
            </Button>
            <Button
              onClick={() => {
                setShowSuccessModal(false);
                navigate("/dashboard");
              }}
            >
              Return to Dashboard
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Container>
  );
};

export default PatientRegistrationForm;
