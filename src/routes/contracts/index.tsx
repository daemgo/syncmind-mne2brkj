import { createFileRoute } from "@tanstack/react-router";
import { ContractList } from "@/components/contracts/contract-list";
import { mockContracts } from "@/mock/crm";

export const Route = createFileRoute("/contracts/")({
  component: ContractsPage,
});

function ContractsPage() {
  return (
    <div className="container mx-auto px-6 py-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">合同管理</h1>
        <p className="text-sm text-muted-foreground mt-1">
          管理所有销售合同
        </p>
      </div>
      <ContractList contracts={mockContracts} />
    </div>
  );
}
