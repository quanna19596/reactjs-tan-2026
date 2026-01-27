import { createFileRoute, Outlet } from "@tanstack/react-router";
import LoginForm from "@/containers/admin/login-form";
import DummyService from "@/services/dummy";

export const Route = createFileRoute("/dashboard")({
  component: () => {
    const accessToken = DummyService.Utils.getAccessToken();

    if (!accessToken) return <LoginForm />;

    return <RouteComponent />;
  },
});

function RouteComponent() {
  return (
    <div>
      Dashboard Layout
      <Outlet />
    </div>
  );
}
