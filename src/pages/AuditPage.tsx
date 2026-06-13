import { useState } from "react";
import { DashboardShell } from "../components/layout/DashboardShell";
import { PageHeader } from "../components/ui/PageHeader";
import { DataTable } from "../components/ui/DataTable";
import { Download, Search, Filter } from "../design-system/icons";

const ACTION_COLORS: Record<string, { bg: string; color: string }> = {
  LOGIN:    { bg: "rgba(0,102,255,0.15)",  color: "#60A5FA" },
  LOGOUT:   { bg: "rgba(100,116,139,0.15)", color: "#94A3B8" },
  CREATE:   { bg: "rgba(16,185,129,0.15)", color: "#34D399" },
  UPDATE:   { bg: "rgba(245,158,11,0.15)", color: "#FCD34D" },
  DELETE:   { bg: "rgba(239,68,68,0.15)",  color: "#F87171" },
  GRANT:    { bg: "rgba(124,58,237,0.15)", color: "#A78BFA" },
  REVOKE:   { bg: "rgba(239,68,68,0.12)",  color: "#FCA5A5" },
  READ:     { bg: "rgba(56,189,248,0.12)", color: "#7DD3FC" },
  TRIGGER:  { bg: "rgba(245,158,11,0.12)", color: "#FBBF24" },
  EXPORT:   { bg: "rgba(16,185,129,0.12)", color: "#6EE7B7" },
};

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  success: { bg: "rgba(16,185,129,0.15)", color: "#34D399" },
  warning: { bg: "rgba(245,158,11,0.15)", color: "#FCD34D" },
  error:   { bg: "rgba(239,68,68,0.15)",  color: "#F87171" },
};

const AUDIT_LOGS = [
  { id: "1", timestamp: "2026-06-13 14:32:01", user: "edgar@heavenlydreams.mx", actorType: "user", action: "LOGIN", resource: "Auth / Session", resourceId: "sess_001", ip: "192.168.1.10", status: "success", platform: "HD-ADMIN" },
  { id: "2", timestamp: "2026-06-13 14:28:45", user: "maria.g@heavenlydreams.mx", actorType: "user", action: "CREATE", resource: "Usuario", resourceId: "usr_284", ip: "10.0.0.5", status: "success", platform: "HD-ADMIN" },
  { id: "3", timestamp: "2026-06-13 14:25:12", user: "carlos.r@heavenlydreams.mx", actorType: "user", action: "UPDATE", resource: "Rol MANAGER", resourceId: "role_mgr", ip: "10.0.0.8", status: "success", platform: "HD-ADMIN" },
  { id: "4", timestamp: "2026-06-13 14:20:55", user: "sistema", actorType: "system", action: "REVOKE", resource: "Sesión expirada", resourceId: "sess_expired_22", ip: "127.0.0.1", status: "success", platform: "HD-ADMIN" },
  { id: "5", timestamp: "2026-06-13 14:18:30", user: "luis.m@heavenlydreams.mx", actorType: "user", action: "READ", resource: "Reporte Auditoría", resourceId: "rpt_audit_2026", ip: "192.168.2.44", status: "success", platform: "HD-ADMIN" },
  { id: "6", timestamp: "2026-06-13 14:15:00", user: "patricia.s@heavenlydreams.mx", actorType: "user", action: "UPDATE", resource: "Configuración SMTP", resourceId: "cfg_smtp", ip: "10.0.0.12", status: "success", platform: "HD-ADMIN" },
  { id: "7", timestamp: "2026-06-13 14:10:22", user: "jorge.c@heavenlydreams.mx", actorType: "user", action: "REVOKE", resource: "Permiso finance:write", resourceId: "perm_fin_w", ip: "10.0.0.9", status: "success", platform: "HD-ADMIN" },
  { id: "8", timestamp: "2026-06-13 14:05:11", user: "intruder@unknown.com", actorType: "user", action: "LOGIN", resource: "Auth / Session", resourceId: "", ip: "185.220.101.5", status: "error", platform: "HD-ADMIN" },
  { id: "9", timestamp: "2026-06-13 14:00:05", user: "crm_agent", actorType: "agent", action: "READ", resource: "Clientes CRM", resourceId: "batch_2026", ip: "10.0.1.20", status: "success", platform: "HD-CRM" },
  { id: "10", timestamp: "2026-06-13 13:55:44", user: "n8n_workflow", actorType: "n8n_workflow", action: "TRIGGER", resource: "WEB_LEAD_TO_CRM", resourceId: "wf_exec_8821", ip: "10.0.2.5", status: "success", platform: "HD-WEB" },
  { id: "11", timestamp: "2026-06-13 13:50:18", user: "sofia.h@heavenlydreams.mx", actorType: "user", action: "CREATE", resource: "Candidato RH", resourceId: "cand_901", ip: "10.0.0.15", status: "success", platform: "HD-RH" },
  { id: "12", timestamp: "2026-06-13 13:45:33", user: "edgar@heavenlydreams.mx", actorType: "user", action: "GRANT", resource: "Permiso users:write → maria.g", resourceId: "perm_usr_w", ip: "192.168.1.10", status: "success", platform: "HD-ADMIN" },
  { id: "13", timestamp: "2026-06-13 13:40:09", user: "finance_agent", actorType: "agent", action: "READ", resource: "Reporte Finanzas Q2", resourceId: "rpt_fin_q2", ip: "10.0.1.21", status: "warning", platform: "HD-ADMIN" },
  { id: "14", timestamp: "2026-06-13 13:35:50", user: "roberto.m@heavenlydreams.mx", actorType: "user", action: "LOGIN", resource: "Auth / Session", resourceId: "sess_rob_01", ip: "172.16.0.22", status: "success", platform: "HD-ADMIN" },
  { id: "15", timestamp: "2026-06-13 13:30:27", user: "sistema", actorType: "system", action: "EXPORT", resource: "Log Auditoría Diario", resourceId: "log_20260613", ip: "127.0.0.1", status: "success", platform: "HD-ADMIN" },
];

const ALL_ACTIONS = [...new Set(AUDIT_LOGS.map((l) => l.action))];

export default function AuditPage() {
  const [search, setSearch] = useState("");
  const [actionFilter, setActionFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = AUDIT_LOGS.filter((l) => {
    const matchSearch =
      search === "" ||
      l.user.toLowerCase().includes(search.toLowerCase()) ||
      l.resource.toLowerCase().includes(search.toLowerCase()) ||
      l.ip.includes(search);
    const matchAction = actionFilter === "all" || l.action === actionFilter;
    const matchStatus = statusFilter === "all" || l.status === statusFilter;
    return matchSearch && matchAction && matchStatus;
  });

  const columns = [
    {
      key: "timestamp",
      header: "Timestamp",
      render: (v: unknown) => (
        <span style={{ color: "#94A3B8", fontSize: "0.78rem", fontFamily: "monospace" }}>
          {v as string}
        </span>
      ),
    },
    {
      key: "user",
      header: "Actor",
      render: (_: unknown, row: Record<string, unknown>) => (
        <div>
          <p style={{ margin: 0, fontSize: "0.85rem", color: "#F1F5F9", fontWeight: 500 }}>{row.user as string}</p>
          <p style={{ margin: 0, fontSize: "0.7rem", color: "#64748B" }}>{row.actorType as string}</p>
        </div>
      ),
    },
    {
      key: "action",
      header: "Acción",
      render: (v: unknown) => {
        const ac = ACTION_COLORS[v as string] ?? { bg: "rgba(100,116,139,0.15)", color: "#94A3B8" };
        return (
          <span style={{
            display: "inline-block",
            padding: "3px 10px",
            borderRadius: "6px",
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "0.05em",
            backgroundColor: ac.bg,
            color: ac.color,
          }}>{v as string}</span>
        );
      },
    },
    {
      key: "resource",
      header: "Recurso",
      render: (_: unknown, row: Record<string, unknown>) => (
        <div>
          <p style={{ margin: 0, fontSize: "0.85rem", color: "#E2E8F0" }}>{row.resource as string}</p>
          {row.resourceId && (
            <p style={{ margin: 0, fontSize: "0.7rem", color: "#64748B", fontFamily: "monospace" }}>
              {row.resourceId as string}
            </p>
          )}
        </div>
      ),
    },
    {
      key: "ip",
      header: "IP",
      render: (v: unknown) => (
        <span style={{ fontSize: "0.78rem", fontFamily: "monospace", color: "#94A3B8" }}>{v as string}</span>
      ),
    },
    {
      key: "platform",
      header: "Plataforma",
      render: (v: unknown) => (
        <span style={{
          display: "inline-block",
          padding: "2px 8px",
          borderRadius: "6px",
          fontSize: "0.68rem",
          fontWeight: 600,
          backgroundColor: "rgba(56,189,248,0.1)",
          color: "#7DD3FC",
        }}>{v as string}</span>
      ),
    },
    {
      key: "status",
      header: "Estado",
      render: (v: unknown) => {
        const sc = STATUS_COLORS[v as string] ?? STATUS_COLORS.success;
        return (
          <span style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            padding: "3px 10px",
            borderRadius: "9999px",
            fontSize: "0.72rem",
            fontWeight: 600,
            backgroundColor: sc.bg,
            color: sc.color,
          }}>
            <span style={{ width: "5px", height: "5px", borderRadius: "9999px", backgroundColor: sc.color }} />
            {v as string}
          </span>
        );
      },
    },
  ];

  return (
    <DashboardShell>
      <PageHeader
        title="Registros de Auditoría"
        description="Trazabilidad completa de acciones, accesos y mutaciones en el ecosistema"
        actions={
          <button style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "10px 18px",
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.1)",
            backgroundColor: "rgba(255,255,255,0.05)",
            color: "#94A3B8",
            fontWeight: 600,
            fontSize: "0.875rem",
            cursor: "pointer",
          }}>
            <Download size={15} /> Exportar
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
        <div style={{ position: "relative", flex: 1, minWidth: "220px" }}>
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
            placeholder="Buscar usuario, recurso, IP..."
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

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Filter size={15} style={{ color: "#64748B" }} />
          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
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
            <option value="all">Todas las acciones</option>
            {ALL_ACTIONS.map((a) => <option key={a} value={a}>{a}</option>)}
          </select>
        </div>

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
          <option value="success">Success</option>
          <option value="warning">Warning</option>
          <option value="error">Error</option>
        </select>
      </div>

      {/* Count */}
      <p style={{ fontSize: "0.8rem", color: "#64748B", marginBottom: "16px" }}>
        Mostrando <strong style={{ color: "#F1F5F9" }}>{filtered.length}</strong> de{" "}
        <strong style={{ color: "#F1F5F9" }}>{AUDIT_LOGS.length}</strong> registros
      </p>

      <DataTable
        columns={columns as Parameters<typeof DataTable>[0]["columns"]}
        data={filtered as Record<string, unknown>[]}
        emptyMessage="No se encontraron registros con los filtros aplicados"
      />
    </DashboardShell>
  );
}
