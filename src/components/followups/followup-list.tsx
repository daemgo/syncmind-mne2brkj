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
import type { Followup } from "@/types/crm";

interface FollowupListProps {
  followups: Followup[];
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

export function FollowupList({ followups }: FollowupListProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="搜索跟进记录..." className="pl-9" />
        </div>
        <Button asChild>
          <Link to="/followups/create">
            <Plus className="h-4 w-4 mr-2" />
            新建跟进
          </Link>
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>客户</TableHead>
                  <TableHead>跟进类型</TableHead>
                  <TableHead>跟进内容</TableHead>
                  <TableHead>跟进时间</TableHead>
                  <TableHead>负责人</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {followups.map((followup) => (
                  <TableRow
                    key={followup.id}
                    className="cursor-pointer hover:bg-muted/50"
                  >
                    <TableCell>
                      <Link
                        to="/followups/$id"
                        params={{ id: followup.id }}
                        className="block"
                      >
                        <div className="font-medium">{followup.customerName}</div>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getTypeVariant(followup.type)}>
                        {followup.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-[200px] truncate">
                        {followup.content}
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(followup.followupTime).toLocaleDateString(
                        "zh-CN"
                      )}
                    </TableCell>
                    <TableCell>{followup.owner}</TableCell>
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
                              to="/followups/$id"
                              params={{ id: followup.id }}
                            >
                              查看详情
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link
                              to="/followups/$id"
                              params={{ id: followup.id }}
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
