# API Contract — HD-ADMIN

## Overview

HD-ADMIN is the administrative control plane for the Heavenly Dreams ecosystem. It manages users, roles, permissions, and financial records.

## Base URL

```
https://api.hd-admin.internal/v1
```

## Authentication

- All endpoints require a valid JWT with admin-level scopes.
- Sensitive operations (role changes, financial mutations) require MFA confirmation.

## Resources

### Users

| Method | Endpoint | Permission | Description |
|---|---|---|---|
| GET | /users | `admin:user:read` | List users |
| POST | /users | `admin:user:create` | Create a user account |
| PATCH | /users/:id/roles | `rbac:role:assign` | Assign roles to user |
| DELETE | /users/:id | `admin:user:delete` | Deactivate user |

### Finance

| Method | Endpoint | Permission | Description |
|---|---|---|---|
| GET | /finance | `admin:finance:read` | List financial records |
| POST | /finance | `admin:finance:create` | Create a financial record (human only) |
| PATCH | /finance/:id | `admin:finance:update` | Update record (human only) |
| DELETE | /finance/:id | `admin:finance:delete` | Soft delete (requires approval) |

### Audit Log

| Method | Endpoint | Permission | Description |
|---|---|---|---|
| GET | /audit | `admin:audit:read` | Query audit log (read-only, immutable) |
| GET | /audit/:id | `admin:audit:read` | Get specific audit entry |

### Integrations

| Method | Endpoint | Permission | Description |
|---|---|---|---|
| GET | /integrations | `admin:integration:read` | List configured integrations |
| POST | /integrations | `admin:integration:create` | Register a new integration |

## Events Emitted

See `docs/EVENTS.md`.

## Audit Rules

- Every mutation (user creation, role change, financial record) must produce an `AuditEntry` with `severity: critical`.
- FINANCE_AGENT actions must use `actorType: agent` and may only read, never mutate.
- All role assignment events must be broadcast immediately to all dependent platforms.

## Error Contract

| Code | Meaning |
|---|---|
| 400 | Validation error |
| 401 | Not authenticated |
| 403 | Insufficient permissions |
| 404 | Resource not found |
| 409 | Conflict |
| 429 | Rate limit |
| 500 | Internal error |

## Prohibited

- No direct database access from other platforms.
- No agent-only mutations on financial records.
- No RBAC changes without audit trail.
