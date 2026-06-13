import { TrendingUp, TrendingDown } from "../../design-system/icons";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "up" | "down" | "neutral";
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
  description?: string;
  iconColor?: string;
}

export function MetricCard({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  description,
  iconColor = "#0066FF",
}: MetricCardProps) {
  const changeColor =
    changeType === "up"
      ? "#10B981"
      : changeType === "down"
        ? "#EF4444"
        : "#94A3B8";

  return (
    <div
      style={{
        backgroundColor: "#161F33",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "20px",
        padding: "24px",
        boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      {/* Top row: icon + change */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "12px",
            backgroundColor: `${iconColor}1A`,
            border: `1px solid ${iconColor}33`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon size={22} style={{ color: iconColor }} />
        </div>

        {change !== "0" && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              padding: "4px 10px",
              borderRadius: "9999px",
              backgroundColor: `${changeColor}15`,
              border: `1px solid ${changeColor}30`,
            }}
          >
            {changeType === "up" && <TrendingUp size={12} style={{ color: changeColor }} />}
            {changeType === "down" && <TrendingDown size={12} style={{ color: changeColor }} />}
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                color: changeColor,
              }}
            >
              {change}
            </span>
          </div>
        )}
      </div>

      {/* Value */}
      <div>
        <p
          style={{
            fontSize: "2rem",
            fontWeight: 700,
            color: "#FFFFFF",
            lineHeight: 1,
            margin: 0,
            fontFamily: "Poppins, sans-serif",
          }}
        >
          {value}
        </p>
        <p
          style={{
            fontSize: "0.875rem",
            color: "#94A3B8",
            marginTop: "6px",
            margin: "6px 0 0",
          }}
        >
          {title}
        </p>
        {description && (
          <p
            style={{
              fontSize: "0.75rem",
              color: "#64748B",
              marginTop: "4px",
            }}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
