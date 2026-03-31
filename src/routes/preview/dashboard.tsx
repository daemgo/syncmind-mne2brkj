import { createFileRoute } from "@tanstack/react-router";
import Dashboard from "@/_examples/dashboard";

export const Route = createFileRoute("/preview/dashboard")({
  component: Dashboard,
});
