import { createFileRoute } from "@tanstack/react-router";
import ListPage from "@/_examples/list-page";

export const Route = createFileRoute("/preview/list-page")({
  component: ListPage,
});
