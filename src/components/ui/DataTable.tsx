interface Column<T> {
  key: string;
  header: string;
  render?: (value: unknown, row: T) => React.ReactNode;
}

interface DataTableProps<T extends Record<string, unknown>> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  emptyMessage?: string;
}

function SkeletonRow({ cols }: { cols: number }) {
  return (
    <tr>
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} style={{ padding: "14px 16px" }}>
          <div
            style={{
              height: "14px",
              borderRadius: "6px",
              backgroundColor: "rgba(255,255,255,0.06)",
              width: i === 0 ? "60%" : "80%",
              animation: "pulse 1.5s ease-in-out infinite",
            }}
          />
        </td>
      ))}
    </tr>
  );
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  loading = false,
  emptyMessage = "No hay datos disponibles",
}: DataTableProps<T>) {
  return (
    <div
      style={{
        borderRadius: "16px",
        border: "1px solid rgba(255,255,255,0.08)",
        overflow: "hidden",
        backgroundColor: "#161F33",
      }}
    >
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr
              style={{
                backgroundColor: "rgba(255,255,255,0.03)",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {columns.map((col) => (
                <th
                  key={col.key}
                  style={{
                    padding: "12px 16px",
                    textAlign: "left",
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    color: "#64748B",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                  }}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <SkeletonRow key={i} cols={columns.length} />
              ))
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  style={{
                    padding: "48px 16px",
                    textAlign: "center",
                    color: "#64748B",
                    fontSize: "0.875rem",
                  }}
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, rowIdx) => (
                <tr
                  key={rowIdx}
                  style={{
                    borderBottom:
                      rowIdx < data.length - 1
                        ? "1px solid rgba(255,255,255,0.05)"
                        : "none",
                    transition: "background-color 150ms",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLTableRowElement).style.backgroundColor =
                      "rgba(255,255,255,0.03)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLTableRowElement).style.backgroundColor =
                      "transparent";
                  }}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      style={{
                        padding: "14px 16px",
                        fontSize: "0.875rem",
                        color: "#E2E8F0",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {col.render
                        ? col.render(row[col.key], row)
                        : String(row[col.key] ?? "")}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
