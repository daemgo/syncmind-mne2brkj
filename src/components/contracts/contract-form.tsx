import { Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import type { Contract, ContractStatus, PaymentStatus } from "@/types/crm";

interface ContractFormProps {
  contract?: Contract;
  onSubmit?: (data: Partial<Contract>) => void;
}

const contractStatusOptions: ContractStatus[] = [
  "执行中",
  "已到期",
  "已终止",
  "待生效",
];

const paymentStatusOptions: PaymentStatus[] = [
  "未付款",
  "部分付款",
  "已付清",
];

export function ContractForm({ contract, onSubmit }: ContractFormProps) {
  const { register, handleSubmit, setValue, watch } = useForm<Partial<Contract>>({
    defaultValues: contract || {
      status: "执行中",
      paymentStatus: "未付款",
    },
  });

  const statusValue = watch("status");
  const paymentStatusValue = watch("paymentStatus");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/contracts">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-semibold tracking-tight">
            {contract ? "编辑合同" : "新建合同"}
          </h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link to="/contracts">取消</Link>
          </Button>
          <Button type="submit">保存</Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">合同名称</Label>
            <Input
              id="name"
              placeholder="请输入合同名称"
              {...register("name")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contractNo">合同编号</Label>
            <Input
              id="contractNo"
              placeholder="如：CT-2026-0001"
              {...register("contractNo")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="customerName">客户名称</Label>
            <Input
              id="customerName"
              placeholder="请输入客户名称"
              {...register("customerName")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">合同金额</Label>
            <Input
              id="amount"
              type="number"
              placeholder="0"
              {...register("amount", { valueAsNumber: true })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="signDate">签署日期</Label>
              <Input
                id="signDate"
                type="date"
                {...register("signDate")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="owner">负责人</Label>
              <Input
                id="owner"
                placeholder="请输入负责人"
                {...register("owner")}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">生效日期</Label>
              <Input
                id="startDate"
                type="date"
                {...register("startDate")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">到期日期</Label>
              <Input
                id="endDate"
                type="date"
                {...register("endDate")}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">合同状态</Label>
            <Select
              value={statusValue}
              onValueChange={(value) => setValue("status", value as ContractStatus)}
            >
              <SelectTrigger>
                <SelectValue placeholder="请选择状态" />
              </SelectTrigger>
              <SelectContent>
                {contractStatusOptions.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="paymentStatus">付款状态</Label>
            <Select
              value={paymentStatusValue}
              onValueChange={(value) => setValue("paymentStatus", value as PaymentStatus)}
            >
              <SelectTrigger>
                <SelectValue placeholder="请选择付款状态" />
              </SelectTrigger>
              <SelectContent>
                {paymentStatusOptions.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="remark">备注</Label>
            <Input
              id="remark"
              placeholder="请输入备注信息"
              {...register("remark")}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
