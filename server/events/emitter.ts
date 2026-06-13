import { randomUUID } from "crypto";

export interface HdEventEnvelope<T = unknown> {
  eventId: string;
  eventName: string;
  correlationId: string;
  occurredAt: string;
  producer: string;
  actor: { id: string; type: "user" | "agent" | "system" | "n8n_workflow" };
  payload: T;
  schemaVersion: "1.0";
}

const MAX_EVENTS = 100;
const eventLog: HdEventEnvelope[] = [];

// HD-BRAIN subscribes to all HD-ADMIN events.
const BRAIN_URL = process.env.BRAIN_EVENTS_URL ?? "";

function forwardEvent(envelope: HdEventEnvelope): void {
  const secret = process.env.EVENT_BUS_SECRET;
  if (!secret || !BRAIN_URL) return;
  fetch(BRAIN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-event-bus-secret": secret },
    body: JSON.stringify(envelope),
  }).catch((err: unknown) => {
    console.warn(`[EVENT FORWARD] Failed ${envelope.eventName} → ${BRAIN_URL}:`, err);
  });
}

export function emitEvent<T>(
  eventName: string,
  payload: T,
  producer: string,
  actor: HdEventEnvelope["actor"],
  correlationId?: string
): HdEventEnvelope<T> {
  const envelope: HdEventEnvelope<T> = {
    eventId: randomUUID(),
    eventName,
    correlationId: correlationId ?? randomUUID(),
    occurredAt: new Date().toISOString(),
    producer,
    actor,
    payload,
    schemaVersion: "1.0",
  };
  eventLog.push(envelope as HdEventEnvelope);
  if (eventLog.length > MAX_EVENTS) eventLog.shift();
  console.log(`[EVENT] ${eventName} producer=${producer} correlationId=${envelope.correlationId}`);
  forwardEvent(envelope as HdEventEnvelope);
  return envelope;
}

export function getRecentEvents(): HdEventEnvelope[] {
  return [...eventLog];
}
