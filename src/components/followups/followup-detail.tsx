import { Link } from "@tanstack/react-router";
import { ArrowLeft, Edit, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { Followup } from "@/types/crm";

interface FollowupDetailProps {
  followup: Followup;
}

function getTypeVariant(
  type: Followup["type"]
): "default" | "secondary" | "outline" {
  switch (type) {
    case "拜访":
      return "default";
    case "电话":
      return "secondary";
    case "会议":
      return "outline";
    default:
      return "outline";
  }
}

export function FollowupDetail({ followup }: FollowupDetailProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/followups">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            跟进详情
          </h1>
          <p className="text-sm text-muted-foreground">
            {new Date(followup.createdAt).toLocaleDateString("zh-CN")}
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link to="/followups/$id" params={{ id: followup.id }}>
            <Edit className="h-4 w-4 mr-2" />
            编辑
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">基本信息</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">关联客户</p>
              <p className="font-medium">{followup.customerName}</p>
            </div>
            <Badge variant={getTypeVariant(followup.type)}>{followup.type}</Badge>
          </div>
          <Separator />
          <div className="flex items-center gap-3">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">跟进时间</p>
              <p className="font-medium">
                {new Date(followup.followupTime).toLocaleString("zh-CN")}
              </p>
            </div>
          </div>
          <Separator />
          <div className="flex items-center gap-3">
            <User className="h-4 w-4 text-muted-foreground" />
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">负责人</p>
              <p className="font-medium">{followup.owner}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">跟进内容</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed">{followup.content}</p>
        </CardContent>
      </Card>

      {followup.nextPlan && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">下次计划</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm">{followup.nextPlan}</p>
            {followup.nextPlanDate && (
              <p className="text-sm text-muted-foreground">
                计划日期：{followup.nextPlanDate}
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
