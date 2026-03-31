import { Link } from "@tanstack/react-router";
import { ArrowLeft, Edit, Calendar, User, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { Opportunity } from "@/types/crm";

interface OpportunityDetailProps {
  opportunity: Opportunity;
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

export function OpportunityDetail({ opportunity }: OpportunityDetailProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/opportunities">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            {opportunity.name}
          </h1>
          <p className="text-sm text-muted-foreground">
            创建于 {new Date(opportunity.createdAt).toLocaleDateString("zh-CN")}
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link to="/opportunities/$id" params={{ id: opportunity.id }}>
            <Edit className="h-4 w-4 mr-2" />
            编辑
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">商机信息</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">关联客户</p>
              <p className="font-medium">{opportunity.customerName}</p>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">金额</p>
              <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                {formatCurrency(opportunity.amount)}
              </p>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">阶段</p>
              <Badge variant={getStageVariant(opportunity.stage)}>
                {opportunity.stage}
              </Badge>
            </div>
            <Separator />
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">预计成交日期</p>
                <p className="font-medium">
                  {new Date(opportunity.expectedCloseDate).toLocaleDateString(
                    "zh-CN"
                  )}
                </p>
              </div>
            </div>
            <Separator />
            <div className="flex items-center gap-3">
              <User className="h-4 w-4 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">负责人</p>
                <p className="font-medium">{opportunity.owner}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">备注</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed">{opportunity.remark}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
