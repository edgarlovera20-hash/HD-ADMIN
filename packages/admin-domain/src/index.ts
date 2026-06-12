export type AdminModule =
  | "finance"
  | "treasury"
  | "purchasing"
  | "inventory"
  | "global_payroll"
  | "audit"
  | "users"
  | "roles"
  | "permissions"
  | "integrations"
  | "bi";

export type AuditSeverity = "info" | "warning" | "critical";

export interface AdminUser {
  id: string;
  fullName: string;
  email: string;
  status: "active" | "inactive" | "suspended";
  roles: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Role {
  id: string;
  name: string;
  permissions: string[];
  scope: "global" | "admin" | "rh" | "crm" | "operations" | "brain";
}

export interface AuditRecord {
  id: string;
  actorId: string;
  action: string;
  module: AdminModule;
  severity: AuditSeverity;
  before?: Record<string, unknown>;
  after?: Record<string, unknown>;
  createdAt: string;
}
