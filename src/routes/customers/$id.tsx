import { createFileRoute } from "@tanstack/react-router";
import { mockCustomers } from "@/mock/crm";
import { CustomerDetail } from "@/components/customers/customer-detail";

export const Route = createFileRoute("/customers/$id")({
  component: CustomerDetailPage,
});

function CustomerDetailPage() {
  const { id } = Route.useParams();
  const customer = mockCustomers.find((c) => c.id === id);

  if (!customer) {
    return (
      <div className="container mx-auto px-6 py-6">
        <p className="text-muted-foreground">客户不存在</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-6">
      <CustomerDetail customer={customer} />
    </div>
  );
}
