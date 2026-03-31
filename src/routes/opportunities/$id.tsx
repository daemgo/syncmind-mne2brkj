import { createFileRoute } from "@tanstack/react-router";
import { mockOpportunities } from "@/mock/crm";
import { OpportunityDetail } from "@/components/opportunities/opportunity-detail";

export const Route = createFileRoute("/opportunities/$id")({
  component: OpportunityDetailPage,
});

function OpportunityDetailPage() {
  const { id } = Route.useParams();
  const opportunity = mockOpportunities.find((o) => o.id === id);

  if (!opportunity) {
    return (
      <div className="container mx-auto px-6 py-6">
        <p className="text-muted-foreground">商机不存在</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-6">
      <OpportunityDetail opportunity={opportunity} />
    </div>
  );
}
