import { useState } from "react";
import { DashboardShell } from "../components/layout/DashboardShell";
import { PageHeader } from "../components/ui/PageHeader";
import { DataTable } from "../components/ui/DataTable";
import { StatusBadge } from "../components/ui/StatusBadge";
import { Plus, Edit, Trash2, Search, Filter } from "../design-system/icons";

const ALL_USERS = [
  { id: "1", name: "Edgar Lovera", email: "edgar@heavenlydreams.mx", role: "OWNER", status: "active", lastLogin: "hace 2 min" },
  { id: "2", name: "María González", email: "maria.g@heavenlydreams.mx", role: "ADMIN", status: "active", lastLogin: "hace 5 min" },
  { id: "3", name: "Carlos Reyes", email: "carlos.r@heavenlydreams.mx", role: "MANAGER", status: "active", lastLogin: "hace 12 min" },
  { id: "4", name: "Ana Torres", email: "ana.t@heavenlydreams.mx", role: "AGENT", status: "inactive", lastLogin: "hace 2 días" },
  { id: "5", name: "Luis Méndez", email: "luis.m@heavenlydreams.mx", role: "VIEWER", status: "active", lastLogin: "hace 31 min" },
  { id: "6", name: "Patricia Salinas", email: "patricia.s@heavenlydreams.mx", role: "AGENT", status: "active", lastLogin: "hace 1 hr" },
  { id: "7", name: "Jorge Castillo", email: "jorge.c@heavenlydreams.mx", role: "MANAGER", status: "suspended", lastLogin: "hace 3 días" },
  { id: "8", name: "Sofía Hernández", email: "sofia.h@heavenlydreams.mx", role: "AGENT", status: "active", lastLogin: "hace 45 min" },
  { id: "9", name: "Roberto Morales", email: "roberto.m@heavenlydreams.mx", role: "VIEWER", status: "pending", lastLogin: "Nunca" },
  { id: "10", name: "Daniela Vega", email: "daniela.v@heavenlydreams.mx", role: "AGENT", status: "active", lastLogin: "hace 2 hrs" },
];

const ROLE_COLORS: Record<string, { bg: string; color: string }> = {
  OWNER:   { bg: "rgba(239,68,68,0.15)",   color: "#F87171" },
  ADMIN:   { bg: "rgba(0,102,255,0.15)",   color: "#60A5FA" },
  MANAGER: { bg: "rgba(124,58,237,0.15)",  color: "#A78BFA" },
  AGENT:   { bg: "rgba(16,185,129,0.15)",  color: "#34D399" },
  VIEWER:  { bg: "rgba(148,163,184,0.12)", color: "#94A3B8" },
};

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");

  const filtered = ALL_USERS.filter((u) => {
    const matchSearch =
      search === "" ||
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || u.status === statusFilter;
    const matchRole = roleFilter === "all" || u.role === roleFilter;
    return matchSearch && matchStatus && matchRole;
  });

  const columns = [
    {
      key: "name",
      header: "Nombre",
      render: (_: unknown, row: Record<string, unknown>) => (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "32px",
            height: "32px",
            borderRadius: "8px",
            backgroundColor: "#0066FF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.75rem",
            fontWeight: 700,
            color: "#FFFFFF",
            flexShrink: 0,
          }}>
            {(row.name as string).split(" ").map((n: string) => n[0]).slice(0, 2).join("")}
          </div>
          <span style={{ fontWeight: 500, color: "#F1F5F9" }}>{row.name as string}</span>
        </div>
      ),
    },
    {
      key: "email",
      header: "Email",
      render: (v: unknown) => <span style={{ color: "#94A3B8" }}>{v as string}</span>,
    },
    {
      key: "role",
      header: "Rol",
      render: (v: unknown) => {
        const rc = ROLE_COLORS[v as string] ?? { bg: "rgba(100,116,139,0.15)", color: "#94A3B8" };
        return (
          <span style={{
            display: "inline-block",
            padding: "2px 10px",
            borderRadius: "6px",
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "0.04em",
            backgroundColor: rc.bg,
            color: rc.color,
          }}>{v as string}</span>
        );
      },
    },
    {
      key: "status",
      header: "Estado",
      render: (v: unknown) => <StatusBadge status={v as "active" | "inactive" | "pending" | "suspended"} />,
    },
    {
      key: "lastLogin",
      header: "Último Acceso",
      render: (v: unknown) => <span style={{ color: "#64748B", fontSize: "0.8rem" }}>{v as string}</span>,
    },
    {
      key: "id",
      header: "Acciones",
      render: () => (
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              padding: "5px 10px",
              borderRadius: "8px",
              border: "1px solid rgba(0,102,255,0.3)",
              backgroundColor: "rgba(0,102,255,0.1)",
              color: "#60A5FA",
              cursor: "pointer",
              fontSize: "0.75rem",
              fontWeight: 500,
            }}
          >
            <Edit size={12} /> Editar
          </button>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              padding: "5px 10px",
              borderRadius: "8px",
              border: "1px solid rgba(239,68,68,0.3)",
              backgroundColor: "rgba(239,68,68,0.1)",
              color: "#F87171",
              cursor: "pointer",
              fontSize: "0.75rem",
              fontWeight: 500,
            }}
          >
            <Trash2 size={12} /> Eliminar
          </button>
        </div>
      ),
    },
  ];

  return (
    <DashboardShell>
      <PageHeader
        title="Gestión de Usuarios"
        description="Administra cuentas, roles y accesos del sistema"
        actions={
          <button style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "10px 20px",
            borderRadius: "14px",
            border: "none",
            backgroundColor: "#0066FF",
            color: "#FFFFFF",
            fontWeight: 600,
            fontSize: "0.875rem",
            cursor: "pointer",
            boxShadow: "0 0 20px rgba(0,102,255,0.35)",
          }}>
            <Plus size={16} /> Nuevo Usuario
          </button>
        }
      />

      {/* Filters */}
      <div style={{
        display: "flex",
        gap: "12px",
        marginBottom: "24px",
        flexWrap: "wrap",
      }}>
        {/* Search */}
        <div style={{
          position: "relative",
          flex: "1",
          minWidth: "220px",
        }}>
          <Search size={16} style={{
            position: "absolute",
            left: "12px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "#64748B",
            pointerEvents: "none",
          }} />
          <input
            type="text"
            placeholder="Buscar usuario..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 12px 10px 38px",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.08)",
              backgroundColor: "#161F33",
              color: "#F1F5F9",
              fontSize: "0.875rem",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Status filter */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Filter size={15} style={{ color: "#64748B" }} />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: "10px 14px",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.08)",
              backgroundColor: "#161F33",
              color: "#F1F5F9",
              fontSize: "0.875rem",
              outline: "none",
              cursor: "pointer",
            }}
          >
            <option value="all">Todos los estados</option>
            <option value="active">Activo</option>
            <option value="inactive">Inactivo</option>
            <option value="pending">Pendiente</option>
            <option value="suspended">Suspendido</option>
          </select>
        </div>

        {/* Role filter */}
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          style={{
            padding: "10px 14px",
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.08)",
            backgroundColor: "#161F33",
            color: "#F1F5F9",
            fontSize: "0.875rem",
            outline: "none",
            cursor: "pointer",
          }}
        >
          <option value="all">Todos los roles</option>
          <option value="OWNER">Owner</option>
          <option value="ADMIN">Admin</option>
          <option value="MANAGER">Manager</option>
          <option value="AGENT">Agent</option>
          <option value="VIEWER">Viewer</option>
        </select>
      </div>

      {/* Summary counts */}
      <div style={{
        display: "flex",
        gap: "16px",
        marginBottom: "20px",
        fontSize: "0.8rem",
        color: "#64748B",
      }}>
        <span>Total: <strong style={{ color: "#F1F5F9" }}>{ALL_USERS.length}</strong></span>
        <span>Mostrando: <strong style={{ color: "#F1F5F9" }}>{filtered.length}</strong></span>
        <span>Activos: <strong style={{ color: "#10B981" }}>{ALL_USERS.filter((u) => u.status === "active").length}</strong></span>
        <span>Inactivos: <strong style={{ color: "#94A3B8" }}>{ALL_USERS.filter((u) => u.status === "inactive").length}</strong></span>
      </div>

      <DataTable
        columns={columns as Parameters<typeof DataTable>[0]["columns"]}
        data={filtered as Record<string, unknown>[]}
        emptyMessage="No se encontraron usuarios con los filtros aplicados"
      />
    </DashboardShell>
  );
}
