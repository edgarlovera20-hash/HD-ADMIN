import { useAuth } from "../../hooks/useAuth";
import { Menu, Search, Bell, User } from "../../design-system/icons";

interface NavbarProps {
  title: string;
  onMenuToggle?: () => void;
}

export function Navbar({ title, onMenuToggle }: NavbarProps) {
  const { user } = useAuth();

  return (
    <header
      style={{
        height: "64px",
        backgroundColor: "#111827",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        display: "flex",
        alignItems: "center",
        padding: "0 24px",
        gap: "16px",
        flexShrink: 0,
      }}
    >
      {/* Mobile menu toggle */}
      <button
        onClick={onMenuToggle}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "36px",
          height: "36px",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "transparent",
          color: "#94A3B8",
          cursor: "pointer",
          transition: "all 150ms",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor =
            "rgba(255,255,255,0.06)";
          (e.currentTarget as HTMLButtonElement).style.color = "#FFFFFF";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
          (e.currentTarget as HTMLButtonElement).style.color = "#94A3B8";
        }}
      >
        <Menu size={20} />
      </button>

      {/* Page title */}
      <h1
        style={{
          flex: 1,
          fontSize: "1.125rem",
          fontWeight: 600,
          color: "#FFFFFF",
          fontFamily: "Poppins, sans-serif",
          margin: 0,
        }}
      >
        {title}
      </h1>

      {/* Right actions */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {/* Search */}
        <button
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "36px",
            height: "36px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "transparent",
            color: "#94A3B8",
            cursor: "pointer",
            transition: "all 150ms",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor =
              "rgba(255,255,255,0.06)";
            (e.currentTarget as HTMLButtonElement).style.color = "#FFFFFF";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
            (e.currentTarget as HTMLButtonElement).style.color = "#94A3B8";
          }}
        >
          <Search size={18} />
        </button>

        {/* Notifications */}
        <button
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "36px",
            height: "36px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "transparent",
            color: "#94A3B8",
            cursor: "pointer",
            transition: "all 150ms",
            position: "relative",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor =
              "rgba(255,255,255,0.06)";
            (e.currentTarget as HTMLButtonElement).style.color = "#FFFFFF";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
            (e.currentTarget as HTMLButtonElement).style.color = "#94A3B8";
          }}
        >
          <Bell size={18} />
          <span
            style={{
              position: "absolute",
              top: "6px",
              right: "6px",
              width: "8px",
              height: "8px",
              backgroundColor: "#0066FF",
              borderRadius: "9999px",
              border: "2px solid #111827",
            }}
          />
        </button>

        {/* User avatar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "4px 12px 4px 4px",
            borderRadius: "10px",
            backgroundColor: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              backgroundColor: "#0066FF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <User size={16} style={{ color: "#FFFFFF" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontSize: "0.8rem",
                fontWeight: 600,
                color: "#FFFFFF",
                lineHeight: 1.2,
              }}
            >
              {user?.name ?? "Admin"}
            </span>
            <span
              style={{
                fontSize: "0.7rem",
                color: "#64748B",
                lineHeight: 1.2,
              }}
            >
              {user?.role ?? "ADMIN"}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
