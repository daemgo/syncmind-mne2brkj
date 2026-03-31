import { createFileRoute } from "@tanstack/react-router";
import { mockCustomers } from "@/mock/crm";
import { CustomerList } from "@/components/customers/customer-list";

export const Route = createFileRoute("/customers/")({
  component: CustomersPage,
});

function CustomersPage() {
  return (
    <div className="container mx-auto px-6 py-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">客户管理</h1>
        <p className="text-sm text-muted-foreground mt-1">
          管理和查看所有客户信息
        </p>
      </div>
      <CustomerList customers={mockCustomers} />
    </div>
  );
}
