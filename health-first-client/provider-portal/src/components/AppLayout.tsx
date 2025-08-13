import React from "react";
import { AppShell, Burger, Group, Box } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Sidebar from "./Sidebar";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      navbar={{
        width: 280,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
      style={{
        backgroundColor: "var(--mantine-color-gray-0)",
        minHeight: "100vh",
      }}
    >
      <AppShell.Navbar
        p="md"
        style={{
          backgroundColor: "white",
          borderRight: "1px solid #e9ecef",
        }}
      >
        <Sidebar opened={opened} />
      </AppShell.Navbar>

      <AppShell.Main
        style={{
          backgroundColor: "var(--mantine-color-gray-0)",
          minHeight: "calc(100vh - 60px)",
        }}
      >
        {children}
      </AppShell.Main>
    </AppShell>
  );
};

export default AppLayout;
