type StatusType = "active" | "inactive" | "pending" | "error" | "warning" | "suspended";

interface StatusBadgeProps {
  status: StatusType;
  label?: string;
}

const STATUS_CONFIG: Record<
  StatusType,
  { label: string; color: string; bg: string; border: string }
> = {
  active: {
    label: "Activo",
    color: "#10B981",
    bg: "rgba(16,185,129,0.12)",
    border: "rgba(16,185,129,0.25)",
  },
  inactive: {
    label: "Inactivo",
    color: "#94A3B8",
    bg: "rgba(148,163,184,0.1)",
    border: "rgba(148,163,184,0.2)",
  },
  pending: {
    label: "Pendiente",
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.12)",
    border: "rgba(245,158,11,0.25)",
  },
  error: {
    label: "Error",
    color: "#EF4444",
    bg: "rgba(239,68,68,0.12)",
    border: "rgba(239,68,68,0.25)",
  },
  warning: {
    label: "Alerta",
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.12)",
    border: "rgba(245,158,11,0.25)",
  },
  suspended: {
    label: "Suspendido",
    color: "#EF4444",
    bg: "rgba(239,68,68,0.1)",
    border: "rgba(239,68,68,0.2)",
  },
};

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status];

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        padding: "3px 10px",
        borderRadius: "9999px",
        fontSize: "0.75rem",
        fontWeight: 500,
        color: config.color,
        backgroundColor: config.bg,
        border: `1px solid ${config.border}`,
        whiteSpace: "nowrap",
      }}
    >
      <span
        style={{
          width: "5px",
          height: "5px",
          borderRadius: "9999px",
          backgroundColor: config.color,
          flexShrink: 0,
        }}
      />
      {label ?? config.label}
    </span>
  );
}
