import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeft, Edit } from "lucide-react";
import type { Contract } from "@/types/crm";

interface ContractDetailProps {
  contract: Contract;
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

export function ContractDetail({ contract }: ContractDetailProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/contracts">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              {contract.name}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {contract.contractNo}
            </p>
          </div>
        </div>
        <Button asChild>
          <Link to="/contracts/$id" params={{ id: contract.id }}>
            <Edit className="h-4 w-4 mr-2" />
            编辑
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">基本信息</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="text-muted-foreground">客户</TableCell>
                  <TableCell>{contract.customerName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-muted-foreground">金额</TableCell>
                  <TableCell className="font-medium">
                    {formatCurrency(contract.amount)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-muted-foreground">
                    签署日期
                  </TableCell>
                  <TableCell>
                    {new Date(contract.signDate).toLocaleDateString("zh-CN")}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-muted-foreground">
                    生效日期
                  </TableCell>
                  <TableCell>
                    {new Date(contract.startDate).toLocaleDateString("zh-CN")}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-muted-foreground">
                    到期日期
                  </TableCell>
                  <TableCell>
                    {new Date(contract.endDate).toLocaleDateString("zh-CN")}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-muted-foreground">
                    负责人
                  </TableCell>
                  <TableCell>{contract.owner}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">状态信息</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="text-muted-foreground">
                    合同状态
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(contract.status)}>
                      {contract.status}
                    </Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-muted-foreground">
                    付款状态
                  </TableCell>
                  <TableCell>
                    <Badge variant={getPaymentVariant(contract.paymentStatus)}>
                      {contract.paymentStatus}
                    </Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-muted-foreground">
                    创建时间
                  </TableCell>
                  <TableCell>
                    {new Date(contract.createdAt).toLocaleDateString("zh-CN")}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-muted-foreground">
                    更新时间
                  </TableCell>
                  <TableCell>
                    {new Date(contract.updatedAt).toLocaleDateString("zh-CN")}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {contract.remark && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">备注</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{contract.remark}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
