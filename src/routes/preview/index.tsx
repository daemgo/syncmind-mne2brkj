import { createFileRoute } from "@tanstack/react-router";
import Dashboard from "@/_examples/dashboard";

export const Route = createFileRoute("/preview/")({
  component: Dashboard,
});
