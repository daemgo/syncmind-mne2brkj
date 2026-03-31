import { createFileRoute } from "@tanstack/react-router";
import { OpportunityForm } from "@/components/opportunities/opportunity-form";

export const Route = createFileRoute("/opportunities/create")({
  component: CreateOpportunityPage,
});

function CreateOpportunityPage() {
  return (
    <div className="container mx-auto px-6 py-6">
      <OpportunityForm mode="create" />
    </div>
  );
}
