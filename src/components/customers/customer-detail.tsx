import { Link } from "@tanstack/react-router";
import { ArrowLeft, Edit, Mail, Phone, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { Customer } from "@/types/crm";

interface CustomerDetailProps {
  customer: Customer;
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

export function CustomerDetail({ customer }: CustomerDetailProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/customers">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-semibold tracking-tight">{customer.name}</h1>
          <p className="text-sm text-muted-foreground">
            创建于 {new Date(customer.createdAt).toLocaleDateString("zh-CN")}
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link to="/customers/$id" params={{ id: customer.id }}>
            <Edit className="h-4 w-4 mr-2" />
            编辑
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">基本信息</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <User className="h-4 w-4 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">联系人</p>
                <p className="font-medium">{customer.contact}</p>
              </div>
            </div>
            <Separator />
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">电话</p>
                <p className="font-medium">{customer.phone}</p>
              </div>
            </div>
            <Separator />
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">邮箱</p>
                <p className="font-medium">{customer.email}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">企业信息</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">行业</p>
              <p className="font-medium">{customer.industry}</p>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">规模</p>
              <p className="font-medium">{customer.scale}</p>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">状态</p>
              <Badge variant={getStatusVariant(customer.status)}>
                {customer.status}
              </Badge>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">最近更新</p>
              <p className="font-medium">
                {new Date(customer.updatedAt).toLocaleDateString("zh-CN")}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
