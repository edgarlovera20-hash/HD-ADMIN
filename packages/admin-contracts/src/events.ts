export const adminEvents = {
  userCreated: "admin.user.created",
  userUpdated: "admin.user.updated",
  roleCreated: "admin.role.created",
  roleUpdated: "admin.role.updated",
  permissionUpdated: "admin.permission.updated",
  auditRecordCreated: "admin.audit_record.created",
  financePaymentRecorded: "finance.payment.recorded"
} as const;

export type AdminEventName = typeof adminEvents[keyof typeof adminEvents];
