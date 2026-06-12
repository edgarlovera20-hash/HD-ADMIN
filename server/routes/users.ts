import { Router } from "express";
import { z } from "zod";
import { requireAuth } from "../middleware/requireAuth.js";
import type { AuthRequest } from "../middleware/requireAuth.js";

const router = Router();

interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: "admin" | "manager" | "operator" | "viewer";
  isActive: boolean;
  createdAt: string;
}

const users: AdminUser[] = [
  { id: "u1", email: "admin@heavenlydreams.com.mx", name: "Admin HD", role: "admin", isActive: true, createdAt: new Date("2026-01-01").toISOString() },
  { id: "u2", email: "crm@heavenlydreams.com.mx", name: "CRM Manager", role: "manager", isActive: true, createdAt: new Date("2026-01-15").toISOString() },
  { id: "u3", email: "ops@heavenlydreams.com.mx", name: "Ops Supervisor", role: "operator", isActive: true, createdAt: new Date("2026-02-01").toISOString() },
  { id: "u4", email: "rh@heavenlydreams.com.mx", name: "RH Recruiter", role: "operator", isActive: true, createdAt: new Date("2026-02-10").toISOString() },
  { id: "u5", email: "brain@heavenlydreams.com.mx", name: "Brain Analyst", role: "viewer", isActive: true, createdAt: new Date("2026-03-01").toISOString() },
];

const roleEnum = z.enum(["admin", "manager", "operator", "viewer"]);

const createSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100),
  role: roleEnum.default("viewer"),
});

const patchSchema = z.object({
  isActive: z.boolean().optional(),
  role: roleEnum.optional(),
});

router.get("/", requireAuth, (_req: AuthRequest, res) => {
  res.json(users);
});

router.post("/", requireAuth, (req: AuthRequest, res) => {
  try {
    const data = createSchema.parse(req.body);
    const user: AdminUser = {
      id: crypto.randomUUID(),
      ...data,
      isActive: true,
      createdAt: new Date().toISOString(),
    };
    users.push(user);
    console.log(`[AUDIT STUB] POST /api/users id=${user.id} correlationId=${crypto.randomUUID()}`);
    return res.status(201).json(user);
  } catch {
    return res.status(400).json({ error: "Datos inválidos" });
  }
});

router.patch("/:id", requireAuth, (req: AuthRequest, res) => {
  const user = users.find((u) => u.id === req.params.id);
  if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
  try {
    const patch = patchSchema.parse(req.body);
    Object.assign(user, patch);
    console.log(`[AUDIT STUB] PATCH /api/users/${req.params.id} correlationId=${crypto.randomUUID()}`);
    return res.json(user);
  } catch {
    return res.status(400).json({ error: "Datos inválidos" });
  }
});

export default router;
