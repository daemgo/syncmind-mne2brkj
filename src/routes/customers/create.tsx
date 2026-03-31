import { createFileRoute } from "@tanstack/react-router";
import { CustomerForm } from "@/components/customers/customer-form";

export const Route = createFileRoute("/customers/create")({
  component: CreateCustomerPage,
});

function CreateCustomerPage() {
  return (
    <div className="container mx-auto px-6 py-6">
      <CustomerForm mode="create" />
    </div>
  );
}
