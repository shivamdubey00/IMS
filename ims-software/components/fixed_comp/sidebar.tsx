"use client"
import React, { ReactNode, useState } from "react";
import {
  Home,
  FileText,
  PlusCircle,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Settings,
  LogOut,
} from "lucide-react";

type MenuItem = {
  id: string;
  label: string;
  href?: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
};

const demoMenu: MenuItem[] = [
  { id: "home", label: "Home", href: "/", icon: <Home size={18} /> },
  {
    id: "projects",
    label: "Interns",
    icon: <FileText size={18} />,
    children: [
      { id: "all", label: "Add Intern", href: "/pages/add-interns" },
      { id: "new", label: "New Project", href: "/projects/new" },
    ],
  },
  { id: "settings", label: "Settings", href: "/settings", icon: <Settings size={18} /> },
];

export default function SidebarLayout({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-50 to-slate-100">
      <aside
        className={`flex flex-col border-r border-slate-200 bg-white backdrop-blur-sm transition-all duration-300 ease-in-out shadow-lg ${
          collapsed ? "w-20" : "w-63"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-2 p-5 border-b border-slate-200">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="h-10 w-10 rounded-xl bg-black flex items-center justify-center text-white font-bold text-lg shadow-lg shrink-0">
             C
            </div>
            {!collapsed && (
              <span className="font-bold text-lg bg-gradient-to-r from-black to-black/20 bg-clip-text text-transparent">
                Codolog
              </span>
            )}
          </div>

          {/* {!collapsed ? (
            <button
              title="New"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <PlusCircle size={16} />
              <span>New</span>
            </button>
          ) : (
            <button
              title="New"
              className="rounded-lg p-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 transition-all duration-200"
            >
              <PlusCircle size={18} />
            </button>
          )} */}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-auto px-3 py-4">
          <ul className="space-y-1">
            {demoMenu.map((m) => (
              <MenuNode key={m.id} item={m} collapsed={collapsed} />
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="mt-auto border-t border-slate-200 p-4">
          <div className="flex items-center justify-between gap-2">
            {!collapsed ? (
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="h-10 w-10 rounded-xl bg-black flex items-center justify-center text-white font-semibold text-sm shadow-md shrink-0">
                  SD
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold text-slate-900 truncate">Shivam Dubey</div>
                  <div className="text-xs text-slate-500">Admin</div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center w-full">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-orange-700 to-orange-900 flex items-center justify-center text-white font-semibold text-sm shadow-md">
                  SD
                </div>
              </div>
            )}

            {!collapsed && (
              <div className="flex items-center gap-1">
                <button
                  className="rounded-lg p-2 hover:bg-slate-100 transition-colors duration-200"
                  onClick={() => setCollapsed(true)}
                  aria-label="Collapse sidebar"
                  title="Collapse"
                >
                  <ChevronLeft size={18} />
                </button>
                <button 
                  className="rounded-lg p-2 hover:bg-slate-100 transition-colors duration-200" 
                  title="Log out"
                >
                  <LogOut size={18} />
                </button>
              </div>
            )}
          </div>

          {collapsed && (
            <button
              className="w-full mt-3 rounded-lg p-2 hover:bg-slate-100 transition-colors duration-200"
              onClick={() => setCollapsed(false)}
              aria-label="Expand sidebar"
              title="Expand"
            >
              <ChevronRight size={18} className="mx-auto" />
            </button>
          )}

          {!collapsed && (
            <div className="mt-3 text-xs text-slate-600 text-center">
              © {new Date().getFullYear()} Codolog
            </div>
          )}
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

function MenuNode({ item, collapsed }: { item: MenuItem; collapsed: boolean }) {
  const [open, setOpen] = useState(false);
  const hasChildren = Array.isArray(item.children) && item.children.length > 0;

  if (hasChildren) {
    return (
      <li>
        <button
          onClick={() => setOpen((s) => !s)}
          className="w-full flex items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-200 group"
          aria-expanded={open}
        >
          <div className="flex items-center gap-3 min-w-0">
            {item.icon && (
              <span className="shrink-0 text-slate-600 group-hover:text-indigo-600 transition-colors duration-200">
                {item.icon}
              </span>
            )}
            {!collapsed && <span className="text-slate-700 group-hover:text-indigo-600 transition-colors duration-200 truncate">{item.label}</span>}
          </div>

          {!collapsed && (
            <span className={`transition-transform duration-200 text-slate-400 ${open ? "rotate-180" : ""}`}>
              <ChevronDown size={16} />
            </span>
          )}
        </button>

        {!collapsed && open && (
          <div className="mt-1 ml-9 space-y-1">
            {item.children!.map((c) => (
              <a
                key={c.id}
                href={c.href}
                className="block rounded-lg px-3 py-2 text-sm text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200"
              >
                {c.label}
              </a>
            ))}
          </div>
        )}
      </li>
    );
  }

  return (
    <li>
      <a
        href={item.href}
        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-200 group"
      >
        {item.icon && (
          <span className="shrink-0 text-slate-600 group-hover:text-indigo-600 transition-colors duration-200">
            {item.icon}
          </span>
        )}
        {!collapsed && <span className="text-slate-700 group-hover:text-indigo-600 transition-colors duration-200">{item.label}</span>}
      </a>
    </li>
  );
}