import { Router } from "express";
import { z } from "zod";
import { requireAuth, AuthRequest } from "../middleware/requireAuth.js";
import { runFinanceAgent } from "../agents/finance-agent.js";

const router = Router();

const inputSchema = z.object({
  type: z.enum(["anomaly_detection", "budget_summary", "audit_report"]),
});

// POST /api/agent/run — FINANCE_AGENT entry point (requireAuth enforced)
router.post("/run", requireAuth, (req: AuthRequest, res) => {
  try {
    const input = inputSchema.parse(req.body);
    const result = runFinanceAgent(input, req.user?.sub ?? "unknown");
    return res.json(result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return res.status(400).json({ error: message });
  }
});

export default router;
