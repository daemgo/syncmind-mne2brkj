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
import { opportunityStageOptions, ownerOptions } from "@/lib/dict";

interface OpportunityFormProps {
  mode?: "create" | "edit";
}

export function OpportunityForm({ mode = "create" }: OpportunityFormProps) {
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
            {mode === "create" ? "新建商机" : "编辑商机"}
          </h1>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">商机信息</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">商机名称</Label>
              <Input id="name" placeholder="请输入商机名称" />
            </div>
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
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="amount">金额</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  ¥
                </span>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0"
                  className="pl-7"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="stage">阶段</Label>
              <Select defaultValue="初步接触">
                <SelectTrigger id="stage">
                  <SelectValue placeholder="请选择阶段" />
                </SelectTrigger>
                <SelectContent>
                  {opportunityStageOptions.map((stage) => (
                    <SelectItem key={stage.value} value={stage.value}>
                      {stage.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="expectedCloseDate">预计成交日期</Label>
              <Input id="expectedCloseDate" type="date" />
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
            <Label htmlFor="remark">备注</Label>
            <Textarea
              id="remark"
              placeholder="请输入备注信息..."
              className="min-h-[100px]"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button variant="outline" asChild>
          <Link to="/opportunities">取消</Link>
        </Button>
        <Button>
          {mode === "create" ? "创建" : "保存"}
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
