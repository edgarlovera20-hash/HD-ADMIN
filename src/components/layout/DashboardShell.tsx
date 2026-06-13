import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";

const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/users": "Gestión de Usuarios",
  "/roles": "Roles y Permisos",
  "/organizations": "Organizaciones",
  "/audit": "Registros de Auditoría",
  "/flags": "Feature Flags",
  "/integrations": "Integraciones",
  "/settings": "Configuración",
  "/activity": "Actividad",
  "/health": "Salud del Sistema",
};

interface DashboardShellProps {
  children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  const location = useLocation();
  const [, setSidebarOpen] = useState(true);

  const title = PAGE_TITLES[location.pathname] ?? "HD Admin";

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        backgroundColor: "#0A0F1C",
        overflow: "hidden",
      }}
    >
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          minWidth: 0,
        }}
      >
        <Navbar title={title} onMenuToggle={() => setSidebarOpen((v) => !v)} />

        <main
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "24px",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
