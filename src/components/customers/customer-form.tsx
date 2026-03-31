import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight } from "lucide-react";
import {
  customerStatusOptions,
  industryOptions,
  scaleOptions,
} from "@/lib/dict";

interface CustomerFormProps {
  mode?: "create" | "edit";
}

export function CustomerForm({ mode = "create" }: CustomerFormProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/customers">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            {mode === "create" ? "新建客户" : "编辑客户"}
          </h1>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">基本信息</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">客户名称</Label>
              <Input id="name" placeholder="请输入客户名称" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact">联系人</Label>
              <Input id="contact" placeholder="请输入联系人姓名" />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="phone">电话</Label>
              <Input id="phone" type="tel" placeholder="请输入电话号码" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">邮箱</Label>
              <Input id="email" type="email" placeholder="请输入邮箱地址" />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="industry">行业</Label>
              <Select>
                <SelectTrigger id="industry">
                  <SelectValue placeholder="请选择行业" />
                </SelectTrigger>
                <SelectContent>
                  {industryOptions.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="scale">规模</Label>
              <Select>
                <SelectTrigger id="scale">
                  <SelectValue placeholder="请选择规模" />
                </SelectTrigger>
                <SelectContent>
                  {scaleOptions.map((scale) => (
                    <SelectItem key={scale} value={scale}>
                      {scale}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="status">状态</Label>
              <Select defaultValue="潜在客户">
                <SelectTrigger id="status">
                  <SelectValue placeholder="请选择状态" />
                </SelectTrigger>
                <SelectContent>
                  {customerStatusOptions.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button variant="outline" asChild>
          <Link to="/customers">取消</Link>
        </Button>
        <Button>
          {mode === "create" ? "创建" : "保存"}
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
