import { Link } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Plus, Search } from "lucide-react";
import type { Customer } from "@/types/crm";

interface CustomerListProps {
  customers: Customer[];
}

function getStatusVariant(
  status: Customer["status"]
): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case "成交客户":
      return "default";
    case "意向客户":
      return "secondary";
    case "潜在客户":
      return "outline";
    case "已流失":
      return "destructive";
    default:
      return "outline";
  }
}

export function CustomerList({ customers }: CustomerListProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="搜索客户..." className="pl-9" />
        </div>
        <Button asChild>
          <Link to="/customers/create">
            <Plus className="h-4 w-4 mr-2" />
            新建客户
          </Link>
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>客户名称</TableHead>
                  <TableHead>联系人</TableHead>
                  <TableHead>行业</TableHead>
                  <TableHead>规模</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.map((customer) => (
                  <TableRow
                    key={customer.id}
                    className="cursor-pointer hover:bg-muted/50"
                  >
                    <TableCell>
                      <Link
                        to="/customers/$id"
                        params={{ id: customer.id }}
                        className="block"
                      >
                        <div className="font-medium">{customer.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {customer.email}
                        </div>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{customer.contact}</div>
                      <div className="text-sm text-muted-foreground">
                        {customer.phone}
                      </div>
                    </TableCell>
                    <TableCell>{customer.industry}</TableCell>
                    <TableCell>{customer.scale}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(customer.status)}>
                        {customer.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link to="/customers/$id" params={{ id: customer.id }}>
                              查看详情
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to="/customers/$id" params={{ id: customer.id }}>
                              编辑
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            删除
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
