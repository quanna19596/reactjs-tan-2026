import { createFileRoute, Outlet } from "@tanstack/react-router";
import { LoginForm } from "@/containers/LoginForm";
import { CookieStorage } from "@/utils/storage";

export const Route = createFileRoute("/dashboard")({
  component: () => {
    const isAuthenticated = CookieStorage.get("atk");

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
