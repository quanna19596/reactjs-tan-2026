import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Calendar, Home, Inbox, User2 } from "lucide-react";
import { useState } from "react";
import AppSidebar from "@/containers/admin/app-sidebar";
import ConfirmDialog from "@/containers/admin/confirm-dialog";
import LoginForm from "@/containers/admin/login-form";
import { ThemeProvider } from "@/containers/admin/theme-provider";
import DummyService from "@/services/dummy";
import { SidebarProvider, SidebarTrigger } from "@/shadcn/ui/sidebar";

export const Route = createFileRoute("/dashboard")({
  component: () => {
    const accessToken = DummyService.Utils.getAccessToken();

    if (!accessToken) return <LoginForm />;

    return <RouteComponent />;
  },
});

function RouteComponent() {
  const [visibleConfirmLogoutDialog, setVisibleConfirmLogoutDialog] =
    useState<boolean>(false);

  const closeLogoutDialog = () => setVisibleConfirmLogoutDialog(false);

  const openLogoutDialog = () => setVisibleConfirmLogoutDialog(true);

  const handleSubmitLogout = () => {
    closeLogoutDialog();
    DummyService.Utils.clearAuthTokens();
    location.reload();
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="dashboard-ui-theme">
      <SidebarProvider>
        <AppSidebar
          headerTitle="Admin Dashboard"
          mainMenu={[
            {
              title: "Application",
              items: [
                {
                  id: "home",
                  title: "Home",
                  url: "#",
                  icon: Home,
                  onClick: () => {},
                },
                {
                  id: "inbox",
                  title: "Inbox",
                  url: "#",
                  icon: Inbox,
                  onClick: () => {},
                },
                {
                  id: "calendar",
                  title: "Calendar",
                  url: "#",
                  icon: Calendar,
                  onClick: () => {},
                },
              ],
            },
          ]}
          footerMenu={{
            title: "Username",
            icon: User2,
            items: [
              {
                id: "logout",
                title: "Logout",
                onClick: openLogoutDialog,
              },
            ],
          }}
        />
        <main className="p-4 flex-1">
          <SidebarTrigger />
          <Outlet />
        </main>
      </SidebarProvider>
      <ConfirmDialog
        visible={visibleConfirmLogoutDialog}
        title="Logout"
        description="Are you sure want to logout?"
        cancelBtn={{
          label: "Cancel",
          onClick: closeLogoutDialog,
        }}
        submitBtn={{
          label: "Continue",
          onClick: handleSubmitLogout,
        }}
      />
    </ThemeProvider>
  );
}
