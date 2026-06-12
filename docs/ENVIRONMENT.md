# Environment Configuration — HD-ADMIN

## Overview

HD-ADMIN uses environment variables for all configuration. No secrets are hardcoded.

## Required Variables

| Variable | Description | Example |
|---|---|---|
| `NODE_ENV` | Runtime environment | `development` |
| `APP_NAME` | Application identifier | `HD-ADMIN` |
| `APP_PORT` | HTTP server port | `3004` |
| `API_BASE_URL` | Base URL for this API | `http://localhost:3004` |
| `HD_CORE_MODE` | HD-CORE resolution mode | `local` |
| `DATABASE_URL` | PostgreSQL main database | `postgresql://user:password@localhost:5432/hdadmin` |
| `AUDIT_DB_URL` | Immutable audit database | `postgresql://user:password@localhost:5432/hdaudit` |
| `FINANCE_DB_URL` | Financial records database | `postgresql://user:password@localhost:5432/hdfinance` |
| `EVENT_BUS_URL` | Event bus connection | `amqp://localhost:5672` |
| `JWT_SECRET` | JWT signing secret | (never hardcode) |
| `JWT_EXPIRY` | Token expiry | `1h` |
| `N8N_WEBHOOK_BASE_URL` | n8n webhook base URL | `http://localhost:5678` |
| `LOG_LEVEL` | Logging level | `info` |

## Security Rules

1. Never commit a `.env` file with real values.
2. `FINANCE_DB_URL` must be a separate database with restricted access.
3. `AUDIT_DB_URL` must point to an append-only database.
4. Admin accounts must use MFA in production.
