import { createFileRoute } from "@tanstack/react-router";
import { ContractDetail } from "@/components/contracts/contract-detail";
import { ContractForm } from "@/components/contracts/contract-form";
import { mockContracts } from "@/mock/crm";

export const Route = createFileRoute("/contracts/$id")({
  component: ContractDetailPage,
});

function ContractDetailPage() {
  const { id } = Route.useParams();
  const contract = mockContracts.find((c) => c.id === id);

  if (!contract) {
    return (
      <div className="container mx-auto px-6 py-6">
        <p className="text-muted-foreground">合同不存在</p>
      </div>
    );
  }

  return <ContractDetail contract={contract} />;
}
