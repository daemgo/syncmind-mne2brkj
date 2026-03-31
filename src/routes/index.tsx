import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Users,
  TrendingUp,
  Phone,
  Currency,
  ArrowUpRight,
  ArrowRight,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import {
  mockDashboardStats,
  mockOpportunityTrend,
  mockOpportunityStageDistribution,
  mockOpportunities,
} from "@/mock/crm";

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("zh-CN", {
    style: "currency",
    currency: "CNY",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function StatCard({
  title,
  value,
  icon: Icon,
  iconColor,
  iconBg,
  trend,
}: {
  title: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  iconBg: string;
  trend?: { value: number; up: boolean };
}) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            {trend && (
              <div
                className={`flex items-center gap-1 text-xs ${
                  trend.up
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-red-500"
                }`}
              >
                {trend.up ? (
                  <ArrowUpRight className="h-3 w-3" />
                ) : (
                  <ArrowUpRight className="h-3 w-3 rotate-180" />
                )}
                <span>{trend.value}%</span>
              </div>
            )}
          </div>
          <div className={`p-3 rounded-lg ${iconBg}`}>
            <Icon className={`h-5 w-5 ${iconColor}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function getStageVariant(
  stage: string
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

export const Route = createFileRoute("/")({
  component: DashboardPage,
});

function DashboardPage() {
  const stats = mockDashboardStats;
  const trendData = mockOpportunityTrend;
  const stageData = mockOpportunityStageDistribution;

  // Recent 5 opportunities sorted by updated time
  const recentOpportunities = [...mockOpportunities]
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )
    .slice(0, 5);

  const chartConfig = {
    amount: {
      label: "金额",
    },
    chart1: {
      color: "var(--color-chart-1)",
    },
    chart2: {
      color: "var(--color-chart-2)",
    },
    chart3: {
      color: "var(--color-chart-3)",
    },
    chart4: {
      color: "var(--color-chart-4)",
    },
    chart5: {
      color: "var(--color-chart-5)",
    },
  };

  return (
    <div className="container mx-auto px-6 py-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">仪表盘</h1>
        <p className="text-sm text-muted-foreground mt-1">
          销售数据概览
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="客户总数"
          value={stats.totalCustomers}
          icon={Users}
          iconColor="text-blue-600 dark:text-blue-400"
          iconBg="bg-blue-50 dark:bg-blue-950"
          trend={{ value: 12, up: true }}
        />
        <StatCard
          title="商机总数"
          value={stats.totalOpportunities}
          icon={TrendingUp}
          iconColor="text-violet-600 dark:text-violet-400"
          iconBg="bg-violet-50 dark:bg-violet-950"
          trend={{ value: 8, up: true }}
        />
        <StatCard
          title="跟进次数"
          value={stats.totalFollowups}
          icon={Phone}
          iconColor="text-amber-600 dark:text-amber-400"
          iconBg="bg-amber-50 dark:bg-amber-950"
          trend={{ value: 5, up: false }}
        />
        <StatCard
          title="本月成交金额"
          value={formatCurrency(stats.monthlyDealAmount)}
          icon={Currency}
          iconColor="text-emerald-600 dark:text-emerald-400"
          iconBg="bg-emerald-50 dark:bg-emerald-950"
          trend={{ value: 23, up: true }}
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Line Chart - Opportunity Trend */}
        <Card className="lg:col-span-2 hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-base">商机金额趋势</CardTitle>
            <CardDescription>近6个月商机金额走势</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => {
                      const [year, month] = value.split("-");
                      return `${month}月`;
                    }}
                  />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) =>
                      value >= 10000
                        ? `${(value / 10000).toFixed(0)}万`
                        : value.toString()
                    }
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={(value) => [
                          formatCurrency(Number(value)),
                          "金额",
                        ]}
                        labelFormatter={(label) => {
                          const [year, month] = label.split("-");
                          return `${year}年${month}月`;
                        }}
                      />
                    }
                  />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="var(--color-chart-1)"
                    strokeWidth={2}
                    dot={{ fill: "var(--color-chart-1)", strokeWidth: 0, r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Pie Chart - Stage Distribution */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-base">商机阶段分布</CardTitle>
            <CardDescription>各阶段商机数量</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stageData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="count"
                    nameKey="stage"
                  >
                    {stageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <ChartTooltip
                    content={<ChartTooltipContent hideLabel />}
                  />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="flex flex-wrap gap-4 mt-4 justify-center">
              {stageData.map((item) => (
                <div key={item.stage} className="flex items-center gap-2">
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: item.fill }}
                  />
                  <span className="text-xs text-muted-foreground">
                    {item.stage} ({item.count})
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Opportunities Table */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base">最近商机</CardTitle>
            <CardDescription>最近更新的5条商机</CardDescription>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link to="/opportunities">
              查看全部
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>商机名称</TableHead>
                  <TableHead>客户</TableHead>
                  <TableHead className="text-right">金额</TableHead>
                  <TableHead>阶段</TableHead>
                  <TableHead>预计成交日期</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOpportunities.map((opp) => (
                  <TableRow
                    key={opp.id}
                    className="cursor-pointer hover:bg-muted/50"
                  >
                    <TableCell>
                      <Link
                        to="/opportunities/$id"
                        params={{ id: opp.id }}
                        className="font-medium hover:underline"
                      >
                        {opp.name}
                      </Link>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {opp.customerName}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(opp.amount)}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStageVariant(opp.stage)}>
                        {opp.stage}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(opp.expectedCloseDate).toLocaleDateString(
                        "zh-CN"
                      )}
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
