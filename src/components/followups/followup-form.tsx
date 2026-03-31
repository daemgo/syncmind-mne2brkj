import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockCustomers } from "@/mock/crm";
import { followupTypeOptions, ownerOptions } from "@/lib/dict";

interface FollowupFormProps {
  mode?: "create" | "edit";
}

export function FollowupForm({ mode = "create" }: FollowupFormProps) {
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
            {mode === "create" ? "新建跟进" : "编辑跟进"}
          </h1>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">跟进信息</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="customer">关联客户</Label>
              <Select>
                <SelectTrigger id="customer">
                  <SelectValue placeholder="请选择客户" />
                </SelectTrigger>
                <SelectContent>
                  {mockCustomers.map((customer) => (
                    <SelectItem key={customer.id} value={customer.id}>
                      {customer.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">跟进类型</Label>
              <Select defaultValue="拜访">
                <SelectTrigger id="type">
                  <SelectValue placeholder="请选择类型" />
                </SelectTrigger>
                <SelectContent>
                  {followupTypeOptions.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="followupTime">跟进时间</Label>
              <Input id="followupTime" type="datetime-local" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="owner">负责人</Label>
              <Select defaultValue="张伟">
                <SelectTrigger id="owner">
                  <SelectValue placeholder="请选择负责人" />
                </SelectTrigger>
                <SelectContent>
                  {ownerOptions.map((owner) => (
                    <SelectItem key={owner} value={owner}>
                      {owner}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">跟进内容</Label>
            <Textarea
              id="content"
              placeholder="请输入跟进内容..."
              className="min-h-[120px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="nextPlan">下次计划</Label>
            <Input id="nextPlan" placeholder="请输入下次计划" />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="nextPlanDate">计划日期</Label>
              <Input id="nextPlanDate" type="date" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button variant="outline" asChild>
          <Link to="/followups">取消</Link>
        </Button>
        <Button>
          {mode === "create" ? "创建" : "保存"}
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
