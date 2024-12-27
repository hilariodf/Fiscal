import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FileText,
  Package,
  Users,
  BarChart,
  Settings,
} from "lucide-react";

interface SidebarProps {
  className?: string;
  isCollapsed?: boolean;
}

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    title: "Notas Fiscais",
    href: "/invoices",
    icon: <FileText className="w-5 h-5" />,
  },
  {
    title: "Produtos",
    href: "/products",
    icon: <Package className="w-5 h-5" />,
  },
  {
    title: "Clientes",
    href: "/clients",
    icon: <Users className="w-5 h-5" />,
  },
  {
    title: "Relatórios",
    href: "/reports",
    icon: <BarChart className="w-5 h-5" />,
  },
  {
    title: "Configurações",
    href: "/settings",
    icon: <Settings className="w-5 h-5" />,
  },
];

const Sidebar = ({ className = "", isCollapsed = false }: SidebarProps) => {
  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-white border-r border-gray-200",
        isCollapsed ? "w-16" : "w-64",
        className,
      )}
    >
      <div className="flex items-center justify-center h-16 border-b border-gray-200">
        {!isCollapsed ? (
          <h1 className="text-xl font-bold text-gray-900">Invoice System</h1>
        ) : (
          <FileText className="w-6 h-6 text-gray-900" />
        )}
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className="flex items-center px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {item.icon}
            {!isCollapsed && (
              <span className="ml-3 text-sm font-medium">{item.title}</span>
            )}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
            alt="User"
            className="w-8 h-8 rounded-full"
          />
          {!isCollapsed && (
            <div>
              <p className="text-sm font-medium text-gray-900">Admin User</p>
              <p className="text-xs text-gray-500">admin@example.com</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
