import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/{-$locale}")({
  component: App,
});

function App() {
  return (
    <div>
      <p>Public Layout</p>
      <Outlet />
    </div>
  );
}
