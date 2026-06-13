interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

export function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: "16px",
        marginBottom: "28px",
      }}
    >
      <div>
        <h1
          style={{
            fontSize: "1.75rem",
            fontWeight: 700,
            color: "#FFFFFF",
            fontFamily: "Poppins, sans-serif",
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          {title}
        </h1>
        {description && (
          <p
            style={{
              fontSize: "0.875rem",
              color: "#94A3B8",
              marginTop: "6px",
              margin: "6px 0 0",
            }}
          >
            {description}
          </p>
        )}
      </div>
      {actions && (
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
          {actions}
        </div>
      )}
    </div>
  );
}
