# Design System Guide

本指南定义生成代码的设计系统规则。所有生成的页面必须遵循这些规则。

语言约定：本文档使用命令式语言。"禁止"表示绝对不可以，"必须"表示必须执行。

---

## 1. 设计哲学

- 产品性格：专业、干净、信息密度适中，不拥挤也不空洞
- **Surface 定义层级**：用背景色区分内容层次（page background → card surface → nested surface）。禁止在 layout 区域之间加 border 分隔
- **90% 中性色调**：页面以 neutral 色为主。Brand/accent color 仅用于主操作按钮、active 状态、小型强调元素。禁止用 brand color 做大面积背景
- 圆角策略：Card `rounded-xl`，Button/Input `rounded-lg`，Badge `rounded-full`
- 阴影策略：静态 `shadow-sm`，hover `shadow-md transition-shadow`，弹层 `shadow-lg`
- 每个可见区域最多 **1 个 primary 按钮**，其余用 outline/ghost

---

## 2. 颜色系统

### 2.1 语义 Token（必须使用）

| 用途 | Token |
|------|-------|
| 页面背景 | `bg-background` |
| 卡片/Surface 背景 | `bg-card` |
| 主文字 | `text-foreground` |
| 次要文字 | `text-muted-foreground` |
| 边框 | `border-border` |
| 输入框边框 | `border-input` |
| 主操作 | `bg-primary text-primary-foreground` |
| 危险操作 | `bg-destructive text-destructive-foreground` |

**IMPORTANT: 禁止硬编码 hex/rgb/oklch 颜色值。必须使用语义 token 或 Tailwind 色阶。**

**Dark Mode 规则**：项目已配置 dark mode（`.dark` class）。语义 token（`bg-background`、`text-foreground` 等）自动适配 dark mode。但直接使用 Tailwind 色阶时（如 `bg-amber-50`），**必须同时写 `dark:` 变体**。

### 2.2 状态颜色决策树

```
成功/已完成  → Badge variant="default"（green 系）
进行中/活跃  → Badge variant="secondary"（blue 系）
待处理/草稿  → Badge variant="outline"（gray 系）
错误/已取消  → Badge variant="destructive"（red 系）
警告/已暂停  → className="border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-300"
```

### 2.3 图表颜色

使用 CSS 变量：`var(--color-chart-1)` 到 `var(--color-chart-5)`。
饼图 data 的 fill 属性用 `"var(--color-chart-N)"`。

### 2.4 图标强调色对（仅 Stats Card）

| 色系 | 文字 | 背景（含 dark） |
|------|------|------|
| 绿 | `text-emerald-600 dark:text-emerald-400` | `bg-emerald-50 dark:bg-emerald-950` |
| 蓝 | `text-blue-600 dark:text-blue-400` | `bg-blue-50 dark:bg-blue-950` |
| 紫 | `text-violet-600 dark:text-violet-400` | `bg-violet-50 dark:bg-violet-950` |
| 橙 | `text-amber-600 dark:text-amber-400` | `bg-amber-50 dark:bg-amber-950` |

趋势指示：上涨 `text-emerald-600` + ArrowUp，下跌 `text-red-500` + ArrowDown。

---

## 3. 排版系统

使用以下预设组合，禁止独立设置 font-size：

| 用途 | className |
|------|-----------|
| 页面标题 | `text-2xl font-semibold tracking-tight` |
| 页面副标题 | `text-sm text-muted-foreground` |
| 卡片标题 | `text-base font-medium` |
| 正文/表格内容 | `text-sm` |
| 辅助说明/标签 | `text-sm text-muted-foreground` |
| 统计数值（大） | `text-2xl font-bold` |
| 表格金额 | `text-right font-medium` |
| 表格 ID | `font-mono text-sm font-medium` |
| 趋势百分比 | `text-xs` |
| 时间线时间 | `text-xs text-muted-foreground` |

---

## 4. 间距系统

所有间距使用 Tailwind spacing scale，禁止硬编码像素值。

| 场景 | className |
|------|-----------|
| 页面容器 | `container mx-auto px-6 py-6` |
| 页面内容区块间距 | `space-y-6` |
| 卡片内边距 | `p-5`（紧凑）/ `p-6`（宽松） |
| 筛选栏内边距 | `p-4` |
| 表单字段间距 | `grid gap-4` |
| 按钮组间距 | `gap-3` |
| 列表项间距 | `space-y-1`（导航）/ `space-y-4`（时间线） |

---

## 5. 布局系统

### 5.1 页面骨架

每个页面遵循此结构：
```
sticky header（标题 + 描述 + 操作按钮）
  ↓
内容区（container mx-auto px-6 py-6 space-y-6）
```

列表页 header 右侧放"新建"按钮。详情页 header 左侧放返回按钮。

### 5.2 导航层级（严格）

```
SidebarNavigation → PageHeader → Tabs
```
禁止跳级。Sidebar 用于一级导航，PageHeader 用于页面标题，Tabs 用于页面内切换。

### 5.3 响应式断点

| 场景 | 断点 |
|------|------|
| Stats 卡片 | `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` |
| 图表行 | `grid-cols-1 lg:grid-cols-3`（主图 `lg:col-span-2`） |
| 底部行（表格+动态） | `grid-cols-1 lg:grid-cols-3`（表格 `lg:col-span-2`） |
| 表单字段 | `grid-cols-1 md:grid-cols-2`，textarea `col-span-full` |
| 卡片列表 | `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` |
| 详情信息 | `grid-cols-1 md:grid-cols-2` |

### 5.4 Sidebar 响应式

- 桌面：`fixed left-0 top-0 w-60 h-screen`，主内容 `ml-60`
- 移动端：默认隐藏，通过 hamburger 按钮展开（Sheet 或 absolute overlay）
- 实现：`hidden md:flex md:flex-col` + 移动端 Sheet 触发器

### 5.5 Table 响应式

表格在小屏幕必须用 `<div className="overflow-x-auto">` 包裹实现水平滚动。

---

## 6. 组件使用规则

### 6.1 按钮决策树

```
页面主操作（新建/提交）
├─ Button variant="default"（primary，每区域最多 1 个）
次要操作（编辑/导出）
├─ Button variant="outline"
低优先级（取消/重置）
├─ Button variant="ghost"
危险操作（删除）
└─ Button variant="destructive"
```

### 6.2 表格行操作

禁止 inline 操作按钮。一律使用 DropdownMenu：
```
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
      <MoreHorizontal className="h-4 w-4" />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuItem>查看详情</DropdownMenuItem>
    <DropdownMenuItem>编辑</DropdownMenuItem>
    <DropdownMenuItem className="text-destructive">删除</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

### 6.3 状态显示

一律用 Badge，颜色参考 2.2 状态颜色决策树。

### 6.4 字段类型 → 组件映射

| 字段类型 | 组件 | 备注 |
|---------|------|------|
| text, phone, email, url | `<Input>` | type 属性匹配字段类型 |
| textarea, richtext | `<Textarea>` | richtext 简化为 Textarea |
| number, money, percent | `<Input type="number">` | money 加 ¥ 前缀 span |
| date, datetime, time | `<Input type="date/datetime-local/time">` | 使用原生 input |
| select | `<Select>` + `<SelectItem>` | 选项来自 dictionary |
| multiselect | 多个 `<Badge>` + `<Select>` | 简化实现 |
| switch | `<Switch>` | |
| checkbox | `<Checkbox>` | |
| upload, image | `<Button variant="outline">` + 上传图标 | 点击 alert("上传功能演示") |

### 6.5 图表

- 必须使用 recharts + `ChartContainer` + `ChartConfig` + `ChartTooltip` + `ChartTooltipContent`
- 每个图表必须定义 `ChartConfig` 对象
- 颜色使用 CSS 变量：`var(--color-chart-N)`
- **IMPORTANT: 禁止 `<div>图表占位</div>` 或任何占位符。必须生成真实的 recharts 图表。**

### 6.6 Card hover

所有 Card 组件必须添加：`className="hover:shadow-md transition-shadow"`

### 6.7 表格行交互

- 行 hover：`className="cursor-pointer hover:bg-muted/50"`
- ID 列：`font-mono text-sm font-medium`
- 金额列：`text-right font-medium`，格式 `¥X,XXX.XX`
- 长文本：`max-w-[180px] truncate`
- 操作列宽度固定：`<TableHead className="w-[50px]" />`

