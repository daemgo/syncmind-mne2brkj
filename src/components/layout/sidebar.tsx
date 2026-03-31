import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Users,
  Phone,
  TrendingUp,
  Menu,
  X,
  FileText,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navItems = [
  {
    title: "工作台",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "客户管理",
    href: "/customers",
    icon: Users,
  },
  {
    title: "销售跟进",
    href: "/followups",
    icon: Phone,
  },
  {
    title: "商机管理",
    href: "/opportunities",
    icon: TrendingUp,
  },
  {
    title: "合同管理",
    href: "/contracts",
    icon: FileText,
  },
];

function NavLink({
  item,
  isActive,
  onClick,
}: {
  item: (typeof navItems)[0];
  isActive: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      to={item.href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
        isActive
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      <item.icon className="h-4 w-4" />
      {item.title}
    </Link>
  );
}

function SidebarContent({
  onItemClick,
}: {
  onItemClick?: () => void;
}) {
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-5 border-b">
        <h2 className="text-lg font-semibold tracking-tight">CRM 系统</h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          客户关系管理
        </p>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            item={item}
            isActive={pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))}
            onClick={onItemClick}
          />
        ))}
      </nav>

      <div className="px-3 py-4 border-t">
        <div className="px-3 py-2">
          <p className="text-xs font-medium text-muted-foreground">演示数据</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            仅供参考
          </p>
        </div>
      </div>
    </div>
  );
}

export function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile sidebar */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="h-9 w-9">
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <SidebarContent onItemClick={() => setOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 w-60 h-screen flex-col bg-card border-r">
        <SidebarContent />
      </aside>
    </>
  );
}
