import type { LucideIcon } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  LayoutDashboard,
  Users,
  Shield,
  Building2,
  History,
  Flag,
  Zap,
  Settings,
  Activity,
  Server,
  LogOut,
} from "../../design-system/icons";

interface NavItem {
  label: string;
  path: string;
  icon: LucideIcon;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    title: "Principal",
    items: [
      { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    ],
  },
  {
    title: "Gestión de Usuarios",
    items: [
      { label: "Usuarios", path: "/users", icon: Users },
      { label: "Roles y Permisos", path: "/roles", icon: Shield },
      { label: "Organizaciones", path: "/organizations", icon: Building2 },
    ],
  },
  {
    title: "Sistema",
    items: [
      { label: "Registros de Auditoría", path: "/audit", icon: History },
      { label: "Feature Flags", path: "/flags", icon: Flag },
      { label: "Integraciones", path: "/integrations", icon: Zap },
      { label: "Configuración", path: "/settings", icon: Settings },
    ],
  },
  {
    title: "Monitor",
    items: [
      { label: "Actividad", path: "/activity", icon: Activity },
      { label: "Salud del Sistema", path: "/health", icon: Server },
    ],
  },
];

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  function isActive(path: string) {
    return location.pathname === path;
  }

  return (
    <aside
      style={{
        width: "256px",
        minWidth: "256px",
        height: "100vh",
        backgroundColor: "#111827",
        borderRight: "1px solid rgba(255,255,255,0.08)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Logo */}
      <div
        style={{
          height: "64px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "0 20px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: "32px",
            height: "32px",
            backgroundColor: "#0066FF",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 20px rgba(0,102,255,0.4)",
          }}
        >
          <Shield size={18} className="text-white" />
        </div>
        <div>
          <span
            style={{
              fontSize: "1rem",
              fontWeight: 700,
              color: "#FFFFFF",
              fontFamily: "Poppins, sans-serif",
              letterSpacing: "0.05em",
            }}
          >
            HD ADMIN
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "16px 12px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        {navSections.map((section) => (
          <div key={section.title}>
            <p
              style={{
                fontSize: "0.65rem",
                fontWeight: 600,
                color: "#64748B",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "0 8px",
                marginBottom: "6px",
              }}
            >
              {section.title}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              {section.items.map((item) => {
                const active = isActive(item.path);
                const Icon = item.icon;
                return (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "8px 10px",
                      borderRadius: "10px",
                      border: "none",
                      cursor: "pointer",
                      width: "100%",
                      textAlign: "left",
                      backgroundColor: active ? "#0066FF" : "transparent",
                      color: active ? "#FFFFFF" : "#94A3B8",
                      fontSize: "0.875rem",
                      fontWeight: active ? 600 : 400,
                      transition: "all 150ms cubic-bezier(0.4,0,0.2,1)",
                      boxShadow: active ? "0 0 20px rgba(0,102,255,0.3)" : "none",
                    }}
                    onMouseEnter={(e) => {
                      if (!active) {
                        (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                          "rgba(255,255,255,0.06)";
                        (e.currentTarget as HTMLButtonElement).style.color = "#FFFFFF";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!active) {
                        (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                          "transparent";
                        (e.currentTarget as HTMLButtonElement).style.color = "#94A3B8";
                      }
                    }}
                  >
                    <Icon size={16} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Logout */}
      <div
        style={{
          padding: "12px",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          flexShrink: 0,
        }}
      >
        <button
          onClick={handleLogout}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "8px 10px",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
            width: "100%",
            textAlign: "left",
            backgroundColor: "transparent",
            color: "#94A3B8",
            fontSize: "0.875rem",
            fontWeight: 400,
            transition: "all 150ms cubic-bezier(0.4,0,0.2,1)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor =
              "rgba(239,68,68,0.1)";
            (e.currentTarget as HTMLButtonElement).style.color = "#EF4444";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
            (e.currentTarget as HTMLButtonElement).style.color = "#94A3B8";
          }}
        >
          <LogOut size={16} />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
}
