import { createFileRoute } from "@tanstack/react-router";
import { mockFollowups } from "@/mock/crm";
import { FollowupDetail } from "@/components/followups/followup-detail";

export const Route = createFileRoute("/followups/$id")({
  component: FollowupDetailPage,
});

function FollowupDetailPage() {
  const { id } = Route.useParams();
  const followup = mockFollowups.find((f) => f.id === id);

  if (!followup) {
    return (
      <div className="container mx-auto px-6 py-6">
        <p className="text-muted-foreground">跟进记录不存在</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-6">
      <FollowupDetail followup={followup} />
    </div>
  );
}
