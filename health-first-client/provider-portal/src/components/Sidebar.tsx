import React from "react";
import { Stack, Text, Box, UnstyledButton } from "@mantine/core";
import {
  IconDashboard,
  IconUsers,
  IconCalendar,
  IconBell,
  IconMessage,
  IconChecklist,
  IconBook,
  IconLibrary,
  IconSettings,
  IconLogout,
} from "@tabler/icons-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface SidebarProps {
  opened: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ opened }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const navigationItems = [
    { label: "Dashboard", icon: IconDashboard, path: "/dashboard" },
    { label: "Availability", icon: IconCalendar, path: "/availability" },
    { label: "Appointments", icon: IconCalendar, path: "/appointments" },
    { label: "Patients", icon: IconUsers, path: "/patients" },
    { label: "Billing & Claims", icon: IconUsers, path: "/billing" },
    { label: "Call Scheduler", icon: IconCalendar, path: "/scheduler" },
    { label: "Alerts", icon: IconBell, path: "/alerts" },
    { label: "Communications", icon: IconMessage, path: "/communications" },
    { label: "Tasks", icon: IconChecklist, path: "/tasks" },
    { label: "Education", icon: IconBook, path: "/education" },
    { label: "Library", icon: IconLibrary, path: "/library" },
    { label: "Settings", icon: IconSettings, path: "/settings" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <Box mb="xl" p="md">
        <Text size="xl" fw={700} c="blue.7">
          HealthFirst
        </Text>
        <Text size="sm" c="dimmed">
          Provider Portal
        </Text>
      </Box>

      <Stack gap={4} style={{ flex: 1 }}>
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <UnstyledButton
              key={item.path}
              onClick={() => navigate(item.path)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.75rem",
                borderRadius: "8px",
                marginBottom: "4px",
                backgroundColor: isActive
                  ? "var(--mantine-color-blue-6)"
                  : "transparent",
                color: isActive ? "white" : "var(--mantine-color-gray-8)",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor =
                    "var(--mantine-color-gray-0)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = "transparent";
                }
              }}
            >
              <Icon
                size={20}
                color={isActive ? "white" : "var(--mantine-color-blue-6)"}
              />
              <Text fw={500}>{item.label}</Text>
            </UnstyledButton>
          );
        })}
      </Stack>

      <UnstyledButton
        onClick={handleLogout}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          padding: "0.75rem",
          borderRadius: "8px",
          marginTop: "auto",
          transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "var(--mantine-color-red-0)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "transparent";
        }}
      >
        <IconLogout size={20} color="var(--mantine-color-red-6)" />
        <Text fw={500} c="red.6">
          Logout
        </Text>
      </UnstyledButton>
    </>
  );
};

export default Sidebar;
