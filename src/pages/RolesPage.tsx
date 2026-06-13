import { DashboardShell } from "../components/layout/DashboardShell";
import { PageHeader } from "../components/ui/PageHeader";
import { Edit, Users, Shield, Key } from "../design-system/icons";

interface RoleDefinition {
  id: string;
  name: string;
  description: string;
  userCount: number;
  permissionCount: number;
  color: string;
  bgColor: string;
  badgeBg: string;
  badgeColor: string;
}

const ROLES: RoleDefinition[] = [
  {
    id: "owner",
    name: "OWNER",
    description: "Control total del ecosistema. Acceso irrestricto a todos los módulos, configuraciones y usuarios. Solo puede existir un propietario.",
    userCount: 1,
    permissionCount: 48,
    color: "#F87171",
    bgColor: "rgba(239,68,68,0.08)",
    badgeBg: "rgba(239,68,68,0.15)",
    badgeColor: "#F87171",
  },
  {
    id: "admin",
    name: "ADMIN",
    description: "Administración completa de usuarios, roles, configuraciones y auditoría. Puede gestionar todos los módulos excepto cambios de propietario.",
    userCount: 2,
    permissionCount: 42,
    color: "#60A5FA",
    bgColor: "rgba(0,102,255,0.08)",
    badgeBg: "rgba(0,102,255,0.15)",
    badgeColor: "#60A5FA",
  },
  {
    id: "manager",
    name: "MANAGER",
    description: "Gestión operacional de equipos y recursos. Puede ver y editar datos de usuarios bajo su supervisión, sin acceso a configuraciones críticas.",
    userCount: 5,
    permissionCount: 28,
    color: "#A78BFA",
    bgColor: "rgba(124,58,237,0.08)",
    badgeBg: "rgba(124,58,237,0.15)",
    badgeColor: "#A78BFA",
  },
  {
    id: "agent",
    name: "AGENT",
    description: "Operaciones diarias de atención y gestión. Puede interactuar con clientes y candidatos según los flujos asignados.",
    userCount: 18,
    permissionCount: 16,
    color: "#34D399",
    bgColor: "rgba(16,185,129,0.08)",
    badgeBg: "rgba(16,185,129,0.15)",
    badgeColor: "#34D399",
  },
  {
    id: "viewer",
    name: "VIEWER",
    description: "Acceso de solo lectura a reportes, dashboards y registros. No puede realizar mutaciones en ningún módulo.",
    userCount: 12,
    permissionCount: 8,
    color: "#94A3B8",
    bgColor: "rgba(148,163,184,0.05)",
    badgeBg: "rgba(148,163,184,0.12)",
    badgeColor: "#94A3B8",
  },
  {
    id: "custom",
    name: "CUSTOM",
    description: "Rol personalizable con permisos específicos definidos por el administrador. Ideal para casos de uso especiales y acceso granular.",
    userCount: 3,
    permissionCount: 0,
    color: "#F59E0B",
    bgColor: "rgba(245,158,11,0.08)",
    badgeBg: "rgba(245,158,11,0.15)",
    badgeColor: "#F59E0B",
  },
];

export default function RolesPage() {
  return (
    <DashboardShell>
      <PageHeader
        title="Roles y Permisos"
        description="Define y gestiona los roles RBAC del ecosistema Heavenly Dreams"
      />

      {/* Summary bar */}
      <div style={{
        display: "flex",
        gap: "24px",
        marginBottom: "28px",
        padding: "16px 20px",
        backgroundColor: "#161F33",
        borderRadius: "14px",
        border: "1px solid rgba(255,255,255,0.08)",
        flexWrap: "wrap",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Shield size={16} style={{ color: "#0066FF" }} />
          <span style={{ fontSize: "0.875rem", color: "#94A3B8" }}>
            Total roles: <strong style={{ color: "#FFFFFF" }}>{ROLES.length}</strong>
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Users size={16} style={{ color: "#10B981" }} />
          <span style={{ fontSize: "0.875rem", color: "#94A3B8" }}>
            Usuarios asignados: <strong style={{ color: "#FFFFFF" }}>{ROLES.reduce((a, r) => a + r.userCount, 0)}</strong>
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Key size={16} style={{ color: "#F59E0B" }} />
          <span style={{ fontSize: "0.875rem", color: "#94A3B8" }}>
            Permisos registrados: <strong style={{ color: "#FFFFFF" }}>48</strong>
          </span>
        </div>
      </div>

      {/* Roles grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
        gap: "20px",
      }}>
        {ROLES.map((role) => (
          <div
            key={role.id}
            style={{
              backgroundColor: "#161F33",
              border: `1px solid rgba(255,255,255,0.08)`,
              borderRadius: "20px",
              padding: "24px",
              boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              transition: "border-color 200ms",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = role.color + "40";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.08)";
            }}
          >
            {/* Header row */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  backgroundColor: role.bgColor,
                  border: `1px solid ${role.color}30`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  <Shield size={18} style={{ color: role.color }} />
                </div>
                <span style={{
                  display: "inline-block",
                  padding: "4px 12px",
                  borderRadius: "8px",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  backgroundColor: role.badgeBg,
                  color: role.badgeColor,
                }}>
                  {role.name}
                </span>
              </div>
              <button style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                padding: "6px 12px",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.1)",
                backgroundColor: "rgba(255,255,255,0.05)",
                color: "#94A3B8",
                cursor: "pointer",
                fontSize: "0.75rem",
                fontWeight: 500,
                transition: "all 150ms",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(0,102,255,0.1)";
                (e.currentTarget as HTMLButtonElement).style.color = "#60A5FA";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(0,102,255,0.3)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(255,255,255,0.05)";
                (e.currentTarget as HTMLButtonElement).style.color = "#94A3B8";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.1)";
              }}>
                <Edit size={13} /> Editar
              </button>
            </div>

            {/* Description */}
            <p style={{
              fontSize: "0.85rem",
              color: "#94A3B8",
              lineHeight: 1.6,
              margin: 0,
            }}>
              {role.description}
            </p>

            {/* Stats row */}
            <div style={{
              display: "flex",
              gap: "16px",
              paddingTop: "12px",
              borderTop: "1px solid rgba(255,255,255,0.06)",
            }}>
              <div style={{ display: "flex", gap: "6px" }}>
                <Users size={14} style={{ color: "#64748B", marginTop: "1px" }} />
                <div>
                  <p style={{ margin: 0, fontSize: "1.1rem", fontWeight: 700, color: "#FFFFFF", fontFamily: "Poppins, sans-serif" }}>
                    {role.userCount}
                  </p>
                  <p style={{ margin: 0, fontSize: "0.7rem", color: "#64748B" }}>usuarios</p>
                </div>
              </div>
              <div style={{ display: "flex", gap: "6px" }}>
                <Key size={14} style={{ color: "#64748B", marginTop: "1px" }} />
                <div>
                  <p style={{ margin: 0, fontSize: "1.1rem", fontWeight: 700, color: "#FFFFFF", fontFamily: "Poppins, sans-serif" }}>
                    {role.id === "custom" ? "—" : role.permissionCount}
                  </p>
                  <p style={{ margin: 0, fontSize: "0.7rem", color: "#64748B" }}>permisos</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardShell>
  );
}
