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
import type { Opportunity } from "@/types/crm";

interface OpportunityListProps {
  opportunities: Opportunity[];
}

function getStageVariant(
  stage: Opportunity["stage"]
): "default" | "secondary" | "outline" | "destructive" {
  switch (stage) {
    case "已成交":
      return "default";
    case "合同谈判":
    case "方案报价":
      return "secondary";
    case "初步接触":
    case "需求确认":
      return "outline";
    case "已失败":
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

export function OpportunityList({ opportunities }: OpportunityListProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="搜索商机..." className="pl-9" />
        </div>
        <Button asChild>
          <Link to="/opportunities/create">
            <Plus className="h-4 w-4 mr-2" />
            新建商机
          </Link>
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>商机名称</TableHead>
                  <TableHead>客户</TableHead>
                  <TableHead className="text-right">金额</TableHead>
                  <TableHead>阶段</TableHead>
                  <TableHead>预计成交日期</TableHead>
                  <TableHead>负责人</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {opportunities.map((opp) => (
                  <TableRow
                    key={opp.id}
                    className="cursor-pointer hover:bg-muted/50"
                  >
                    <TableCell>
                      <Link
                        to="/opportunities/$id"
                        params={{ id: opp.id }}
                        className="block"
                      >
                        <div className="font-medium">{opp.name}</div>
                      </Link>
                    </TableCell>
                    <TableCell>{opp.customerName}</TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(opp.amount)}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStageVariant(opp.stage)}>
                        {opp.stage}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(opp.expectedCloseDate).toLocaleDateString(
                        "zh-CN"
                      )}
                    </TableCell>
                    <TableCell>{opp.owner}</TableCell>
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
                              to="/opportunities/$id"
                              params={{ id: opp.id }}
                            >
                              查看详情
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link
                              to="/opportunities/$id"
                              params={{ id: opp.id }}
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
