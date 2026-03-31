import { createFileRoute } from "@tanstack/react-router";
import { FollowupForm } from "@/components/followups/followup-form";

export const Route = createFileRoute("/followups/create")({
  component: CreateFollowupPage,
});

function CreateFollowupPage() {
  return (
    <div className="container mx-auto px-6 py-6">
      <FollowupForm mode="create" />
    </div>
  );
}
