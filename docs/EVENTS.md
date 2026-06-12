# Events — HD-ADMIN

## Overview

HD-ADMIN is the governance hub. It produces user/RBAC management events and financial events, and consumes risk and operational events from other platforms.

## Produced Events

| Event | Producer | Consumers | Payload Summary | Sensitivity |
|---|---|---|---|---|
| `admin.user.created` | HD-ADMIN | All platforms | userId, roles[], platform, createdAt, correlationId | confidential |
| `admin.user.role_changed` | HD-ADMIN | All platforms | userId, previousRoles[], newRoles[], changedBy, correlationId | confidential |
| `admin.user.deactivated` | HD-ADMIN | All platforms | userId, deactivatedBy, reason, correlationId | confidential |
| `admin.finance.record_created` | HD-ADMIN | HD-BRAIN | recordId, type, amount, createdBy, correlationId | confidential |
| `admin.finance.anomaly_detected` | HD-ADMIN | HD-BRAIN | anomalyType, recordId, severity, correlationId | confidential |
| `admin.audit.security_event` | HD-ADMIN | HD-BRAIN | auditId, severity, platform, actorId, correlationId | critical |

## Consumed Events

| Event | Consumer | Source | Action Taken |
|---|---|---|---|
| `brain.risk.alert_generated` | HD-ADMIN | HD-BRAIN | Queue for admin human review |
| `brain.recommendation.created` | HD-ADMIN | HD-BRAIN | Display in recommendation review queue |
| `crm.client.risk_flagged` | HD-ADMIN | HD-CRM | Notify finance admin of CRM risk signal |
| `rh.candidate.hired` | HD-ADMIN | HD-RH | Create user account for new employee |
| `operations.task.overdue` | HD-ADMIN | HD-OPERATIONS | Log to operational oversight dashboard |

## Rules

1. All shared event names must come from `HD-CORE/packages/contracts/src/events.ts`.
2. `admin.user.role_changed` events must be broadcast to all platforms within 5 seconds.
3. `admin.audit.security_event` events must never be dropped and must be stored durably.
4. All admin events must include `correlationId` and `createdAt`.
