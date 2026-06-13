# Roadmap — HD-ADMIN

## Phase 1: Technical Foundation

- [ ] TypeScript + Node project setup
- [ ] Shared contracts from HD-CORE integrated
- [ ] tsconfig.json strict mode
- [ ] CI/CD pipeline (typecheck + lint)
- [ ] .env.example documented

## Phase 2: Domain Model

- [ ] User entity (id, email, roles[], platforms[], status)
- [ ] Role entity (id, name, permissions[], platform)
- [ ] Permission entity (defined in HD-CORE rbac.ts)
- [ ] FinanceRecord entity (id, type, amount, category, status, approvedBy)
- [ ] Integration entity (id, name, type, servicePrincipal, permissions[])
- [ ] AuditEntry integration from HD-CORE

## Phase 3: API Layer

- [ ] REST API following docs/API_CONTRACT.md
- [ ] JWT + MFA authentication middleware
- [ ] RBAC enforcement using HD-CORE permissions
- [ ] Role change broadcast mechanism to all platforms
- [ ] Financial record approval workflow (human-required)

## Phase 4: UI

- [ ] User management dashboard
- [ ] Role and permission assignment UI
- [ ] Finance record management with approval flow
- [ ] Audit log viewer (immutable, filterable)
- [ ] Integration management panel
- [ ] Platform health overview

## Phase 5: Integrations

- [ ] n8n: ADMIN_FINANCE_ANOMALY_ALERT workflow
- [ ] Event bus: broadcast admin.user.role_changed to all platforms
- [ ] Event bus: consume brain.recommendation.created for review queue
- [ ] RBAC synchronization with all 6 dependent platforms

## Phase 6: AI Agents

- [ ] FINANCE_AGENT integration following docs/FINANCE_ADMIN_AGENT_POLICY.md
- [ ] Anomaly detection engine (read-only)
- [ ] Financial report draft generator
- [ ] Human approval enforcement for all agent findings

## Phase 7: Observability

- [ ] AuditEntry persistence (separate immutable database)
- [ ] Security event alerting (severity: security events)
- [ ] Financial metrics dashboard
- [ ] RBAC coverage report

## Phase 8: Production Readiness

- [ ] MFA enforcement for admin accounts
- [ ] Financial record encryption at rest
- [ ] SOC2 / compliance checklist
- [ ] Penetration testing
- [ ] Disaster recovery with point-in-time restore for financial data
