import { createFileRoute } from "@tanstack/react-router";
import { mockFollowups } from "@/mock/crm";
import { FollowupList } from "@/components/followups/followup-list";

export const Route = createFileRoute("/followups/")({
  component: FollowupsPage,
});

function FollowupsPage() {
  return (
    <div className="container mx-auto px-6 py-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">销售跟进</h1>
        <p className="text-sm text-muted-foreground mt-1">
          管理和查看所有销售跟进记录
        </p>
      </div>
      <FollowupList followups={mockFollowups} />
    </div>
  );
}
