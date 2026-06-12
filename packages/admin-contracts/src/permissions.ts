export const adminPermissions = {
  usersView: "admin.users.view",
  usersCreate: "admin.users.create",
  usersUpdate: "admin.users.update",
  rolesView: "admin.roles.view",
  rolesCreate: "admin.roles.create",
  rolesUpdate: "admin.roles.update",
  permissionsView: "admin.permissions.view",
  permissionsUpdate: "admin.permissions.update",
  auditView: "admin.audit.view",
  financeView: "finance.view",
  financeUpdate: "finance.update",
  treasuryView: "treasury.view",
  integrationsManage: "admin.integrations.manage",
  biView: "admin.bi.view"
} as const;
