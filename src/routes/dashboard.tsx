import Cookies from "js-cookie";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { LoginForm } from "@/containers/LoginForm";

export const Route = createFileRoute("/dashboard")({
  component: () => {
    const isAuthenticated = Cookies.get("atk");

    if (!isAuthenticated) return <LoginForm />;

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
