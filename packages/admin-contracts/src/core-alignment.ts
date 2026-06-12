import { hdEvents, hdPermissions, hdPlatforms, sensitiveActions } from "@hd/core-contracts";

export const adminCoreAlignment = {
  platform: hdPlatforms.admin,
  events: {
    financePaymentRecorded: hdEvents.financePaymentRecorded,
    auditActionRecorded: hdEvents.auditActionRecorded
  },
  permissions: {
    adminAll: hdPermissions.adminAll,
    usersAll: hdPermissions.usersAll,
    rolesAll: hdPermissions.rolesAll,
    permissionsAll: hdPermissions.permissionsAll,
    auditView: hdPermissions.auditView
  },
  sensitiveActions
} as const;
