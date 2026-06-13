import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth.js";

const router = Router();

// Stub entries (will be written by auditLog middleware in production)
const entries = [
  {
    id: "a1",
    actorId: "user_dev_admin",
    actorType: "user",
    platform: "HD-ADMIN",
    action: "login",
    resourceType: "session",
    resourceId: "s1",
    correlationId: crypto.randomUUID(),
    severity: "info",
    createdAt: new Date().toISOString(),
  },
];

router.get("/", requireAuth, (_req, res) => {
  res.json(entries);
});

export default router;
