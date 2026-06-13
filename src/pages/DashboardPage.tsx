import { DashboardShell } from "../components/layout/DashboardShell";
import { MetricCard } from "../components/ui/MetricCard";
import { DataTable } from "../components/ui/DataTable";
import { PageHeader } from "../components/ui/PageHeader";
import { StatusBadge } from "../components/ui/StatusBadge";
import {
  Users,
  Activity,
  Shield,
  FileText,
  AlertTriangle,
  Server,
} from "../design-system/icons";

const auditRows = [
  { user: "Edgar Lovera", action: "LOGIN", resource: "Auth", ip: "192.168.1.10", time: "hace 2 min" },
  { user: "María González", action: "CREATE", resource: "Usuario", ip: "10.0.0.5", time: "hace 5 min" },
  { user: "Carlos Reyes", action: "UPDATE", resource: "Rol MANAGER", ip: "10.0.0.8", time: "hace 12 min" },
  { user: "Ana Torres", action: "DELETE", resource: "Sesión expirada", ip: "172.16.0.3", time: "hace 18 min" },
  { user: "Sistema", action: "GRANT", resource: "Permiso users:read", ip: "127.0.0.1", time: "hace 22 min" },
  { user: "Luis Méndez", action: "LOGIN", resource: "Auth", ip: "192.168.2.44", time: "hace 31 min" },
  { user: "Patricia Salinas", action: "UPDATE", resource: "Configuración SMTP", ip: "10.0.0.12", time: "hace 45 min" },
  { user: "Jorge Castillo", action: "REVOKE", resource: "Permiso finance:write", ip: "10.0.0.9", time: "hace 1 hr" },
];

const recentUsers = [
  { name: "Edgar Lovera", email: "edgar@heavenlydreams.mx", role: "OWNER", status: "active", lastLogin: "hace 2 min" },
  { name: "María González", email: "maria.g@heavenlydreams.mx", role: "ADMIN", status: "active", lastLogin: "hace 5 min" },
  { name: "Carlos Reyes", email: "carlos.r@heavenlydreams.mx", role: "MANAGER", status: "active", lastLogin: "hace 12 min" },
  { name: "Ana Torres", email: "ana.t@heavenlydreams.mx", role: "AGENT", status: "inactive", lastLogin: "hace 2 días" },
  { name: "Luis Méndez", email: "luis.m@heavenlydreams.mx", role: "VIEWER", status: "active", lastLogin: "hace 31 min" },
];

const auditColumns = [
  { key: "user", header: "Usuario" },
  { key: "action", header: "Acción", render: (v: unknown) => (
    <span style={{
      display: "inline-block",
      padding: "2px 8px",
      borderRadius: "6px",
      fontSize: "0.7rem",
      fontWeight: 600,
      letterSpacing: "0.05em",
      backgroundColor: "rgba(0,102,255,0.15)",
      color: "#60A5FA",
    }}>{v as string}</span>
  )},
  { key: "resource", header: "Recurso" },
  { key: "ip", header: "IP" },
  { key: "time", header: "Tiempo" },
];

const userColumns = [
  { key: "name", header: "Nombre" },
  { key: "email", header: "Email", render: (v: unknown) => (
    <span style={{ color: "#94A3B8" }}>{v as string}</span>
  )},
  { key: "role", header: "Rol", render: (v: unknown) => (
    <span style={{
      display: "inline-block",
      padding: "2px 8px",
      borderRadius: "6px",
      fontSize: "0.7rem",
      fontWeight: 600,
      backgroundColor: "rgba(124,58,237,0.15)",
      color: "#A78BFA",
    }}>{v as string}</span>
  )},
  { key: "status", header: "Estado", render: (v: unknown) => (
    <StatusBadge status={v as "active" | "inactive"} />
  )},
  { key: "lastLogin", header: "Último acceso" },
];

export default function DashboardPage() {
  return (
    <DashboardShell>
      <PageHeader
        title="Dashboard"
        description="Resumen ejecutivo del ecosistema HD Admin"
      />

      {/* Metric cards grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: "20px",
        marginBottom: "32px",
      }}>
        <MetricCard
          title="Total Usuarios"
          value="1,284"
          change="+12%"
          changeType="up"
          icon={Users}
          description="Usuarios registrados en el sistema"
        />
        <MetricCard
          title="Sesiones Activas"
          value="47"
          change="+3"
          changeType="up"
          icon={Activity}
          description="Sesiones en este momento"
          iconColor="#00A3FF"
        />
        <MetricCard
          title="Total Roles"
          value="8"
          change="0"
          changeType="neutral"
          icon={Shield}
          description="Roles RBAC configurados"
          iconColor="#7C3AED"
        />
        <MetricCard
          title="Eventos de Auditoría Hoy"
          value="2,341"
          change="+156"
          changeType="up"
          icon={FileText}
          description="Registros generados hoy"
          iconColor="#F59E0B"
        />
        <MetricCard
          title="Logins Fallidos"
          value="3"
          change="-2"
          changeType="down"
          icon={AlertTriangle}
          description="Intentos fallidos hoy"
          iconColor="#EF4444"
        />
        <MetricCard
          title="Salud del Sistema"
          value="99.8%"
          change="+0.1%"
          changeType="up"
          icon={Server}
          description="Uptime últimas 24 horas"
          iconColor="#10B981"
        />
      </div>

      {/* Recent Audit Activity */}
      <div style={{ marginBottom: "32px" }}>
        <h2 style={{
          fontSize: "1.1rem",
          fontWeight: 600,
          color: "#FFFFFF",
          fontFamily: "Poppins, sans-serif",
          marginBottom: "16px",
        }}>
          Actividad Reciente
        </h2>
        <DataTable
          columns={auditColumns as Parameters<typeof DataTable>[0]["columns"]}
          data={auditRows as Record<string, unknown>[]}
        />
      </div>

      {/* Recent Users */}
      <div>
        <h2 style={{
          fontSize: "1.1rem",
          fontWeight: 600,
          color: "#FFFFFF",
          fontFamily: "Poppins, sans-serif",
          marginBottom: "16px",
        }}>
          Usuarios Recientes
        </h2>
        <DataTable
          columns={userColumns as Parameters<typeof DataTable>[0]["columns"]}
          data={recentUsers as Record<string, unknown>[]}
        />
      </div>
    </DashboardShell>
  );
}
