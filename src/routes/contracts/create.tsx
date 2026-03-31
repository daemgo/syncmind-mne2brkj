import { createFileRoute } from "@tanstack/react-router";
import { ContractForm } from "@/components/contracts/contract-form";

export const Route = createFileRoute("/contracts/create")({
  component: ContractCreatePage,
});

function ContractCreatePage() {
  return (
    <div className="container mx-auto px-6 py-6">
      <ContractForm />
    </div>
  );
}
