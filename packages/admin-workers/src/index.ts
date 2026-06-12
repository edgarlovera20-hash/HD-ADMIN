export interface AuditJobPayload {
  actorId: string;
  action: string;
  module: string;
  severity: "info" | "warning" | "critical";
  correlationId: string;
}

export function requiresImmediateReview(severity: string): boolean {
  return severity === "critical";
}
