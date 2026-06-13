# Finance Admin Agent Policy — HD-ADMIN

## Agent Identifier

`FINANCE_AGENT`

## Purpose

The FINANCE_AGENT assists finance administrators with financial record analysis, anomaly detection, and reporting. It is strictly read-only with respect to financial records. All mutations to financial data require human authorization.

## Permitted Actions

| Action | Description |
|---|---|
| Analyze financial records | Read and analyze income, expense, and balance data |
| Detect anomalies | Flag unusual patterns in financial records (duplicate payments, outliers) |
| Prepare financial reports | Generate P&L, cash flow, and expense reports for human review |
| Summarize audit trail | Summarize audit log entries for a given period |
| Flag compliance risks | Identify transactions that may require additional documentation |

## Forbidden Actions

| Action | Reason |
|---|---|
| Register or record payments | Financial mutations require human authorization |
| Delete financial records | Deletion of financial data is prohibited without legal + management approval |
| Change user permissions or roles | RBAC changes require admin authorization, not agent action |
| Access credentials or signing keys | Secrets are never exposed to agents |
| Approve or reject transactions autonomously | All approvals require human sign-off |
| Modify audit records | AuditEntry records are immutable |

## RBAC Constraints

- FINANCE_AGENT operates with `actorType=agent` in all AuditEntry records.
- Permissions are limited to `admin:finance:read`, `admin:audit:read`, `admin:report:write`.
- May never hold `admin:finance:create`, `admin:finance:update`, `admin:finance:delete`, or `rbac:role:assign`.

## Human Review Requirements

- All prepared reports must be reviewed and approved by a finance administrator before distribution.
- All anomaly flags must be reviewed by a human before any action is taken.
- Agent-flagged compliance risks must be escalated to a human reviewer, never auto-resolved.

## Audit Requirements

Every FINANCE_AGENT action must produce an `AuditEntry` with:
- `actorType: "agent"`
- `actorId: "FINANCE_AGENT"`
- `correlationId` propagated from the originating request
- `severity`: `info` for reads/reports, `warning` for anomaly flags, `critical` for compliance risk flags

## Violation Policy

Any attempt by FINANCE_AGENT to perform a forbidden action must:
1. Be immediately rejected.
2. Produce an AuditEntry with `severity: "security"`.
3. Trigger an immediate human escalation alert.
