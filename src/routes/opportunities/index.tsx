import { createFileRoute } from "@tanstack/react-router";
import { mockOpportunities } from "@/mock/crm";
import { OpportunityList } from "@/components/opportunities/opportunity-list";

export const Route = createFileRoute("/opportunities/")({
  component: OpportunitiesPage,
});

function OpportunitiesPage() {
  return (
    <div className="container mx-auto px-6 py-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">商机管理</h1>
        <p className="text-sm text-muted-foreground mt-1">
          管理和查看所有销售商机
        </p>
      </div>
      <OpportunityList opportunities={mockOpportunities} />
    </div>
  );
}
