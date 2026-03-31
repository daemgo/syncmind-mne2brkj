import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import type { Contract } from "@/types/crm";

interface ContractListProps {
  contracts: Contract[];
}

function getStatusVariant(
  status: Contract["status"]
): "default" | "secondary" | "outline" | "destructive" {
  switch (status) {
    case "执行中":
      return "default";
    case "已到期":
    case "已终止":
      return "destructive";
    case "待生效":
      return "secondary";
    default:
      return "outline";
  }
}

function getPaymentVariant(
  payment: Contract["paymentStatus"]
): "default" | "secondary" | "outline" | "destructive" {
  switch (payment) {
    case "已付清":
      return "default";
    case "部分付款":
      return "secondary";
    case "未付款":
      return "destructive";
    default:
      return "outline";
  }
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("zh-CN", {
    style: "currency",
    currency: "CNY",
    minimumFractionDigits: 0,
  }).format(amount);
}

export function ContractList({ contracts }: ContractListProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="搜索合同..." className="pl-9" />
        </div>
        <Button asChild>
          <Link to="/contracts/create">
            <Plus className="h-4 w-4 mr-2" />
            新建合同
          </Link>
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>合同名称</TableHead>
                  <TableHead>合同编号</TableHead>
                  <TableHead>客户</TableHead>
                  <TableHead className="text-right">金额</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>付款状态</TableHead>
                  <TableHead>签署日期</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contracts.map((contract) => (
                  <TableRow
                    key={contract.id}
                    className="cursor-pointer hover:bg-muted/50"
                  >
                    <TableCell>
                      <Link
                        to="/contracts/$id"
                        params={{ id: contract.id }}
                        className="block"
                      >
                        <div className="font-medium">{contract.name}</div>
                      </Link>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {contract.contractNo}
                    </TableCell>
                    <TableCell>{contract.customerName}</TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(contract.amount)}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(contract.status)}>
                        {contract.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getPaymentVariant(contract.paymentStatus)}>
                        {contract.paymentStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(contract.signDate).toLocaleDateString("zh-CN")}
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
                            <Link
                              to="/contracts/$id"
                              params={{ id: contract.id }}
                            >
                              查看详情
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link
                              to="/contracts/$id"
                              params={{ id: contract.id }}
                            >
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
