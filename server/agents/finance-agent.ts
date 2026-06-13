// FINANCE_AGENT — read-only analysis only. NEVER registers payments, deletes records, changes permissions.
import { randomUUID } from "crypto";

export interface FinanceAgentInput {
  type: "anomaly_detection" | "budget_summary" | "audit_report";
}

export interface FinanceAgentResult {
  agentId: "FINANCE_AGENT";
  correlationId: string;
  actorType: "agent";
  input: FinanceAgentInput;
  output: Record<string, unknown>;
  timestamp: string;
}

const FORBIDDEN_ACTIONS = [
  "register_payment",
  "delete_record",
  "change_permissions",
  "bypass_rbac",
];

const PERMITTED_ACTIONS = [
  "anomaly_detection",
  "budget_summary",
  "audit_report",
];

export function runFinanceAgent(
  input: FinanceAgentInput,
  actorId: string,
): FinanceAgentResult {
  const correlationId = randomUUID();

  if (!PERMITTED_ACTIONS.includes(input.type)) {
    console.warn(
      `[FINANCE_AGENT] FORBIDDEN action attempted: ${input.type} actor=${actorId} correlationId=${correlationId}`,
    );
    throw new Error(
      `FINANCE_AGENT: action '${input.type}' not permitted. Forbidden: ${FORBIDDEN_ACTIONS.join(", ")}`,
    );
  }

  console.log(
    `[AUDIT STUB] FINANCE_AGENT action=${input.type} actorId=${actorId} actorType=agent correlationId=${correlationId} platform=HD-ADMIN severity=info`,
  );

  return {
    agentId: "FINANCE_AGENT",
    correlationId,
    actorType: "agent",
    input,
    output: {
      analysis: `FINANCE_AGENT stub: ${input.type}`,
      requiresHumanApproval: true,
    },
    timestamp: new Date().toISOString(),
  };
}
