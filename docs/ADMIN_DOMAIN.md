# HD-ADMIN Domain

## Diagnóstico

HD-ADMIN administra la empresa: usuarios, roles, permisos, finanzas, tesorería, compras, inventarios, auditoría, integraciones y BI.

## Riesgos

- Cambios de permisos sin auditoría.
- Finanzas mezcladas con CRM u Operations.
- Roles globales duplicados fuera de Admin.
- Integraciones sin control central.
- Acciones sensibles sin trazabilidad.

## Solución Propuesta

HD-ADMIN debe ser la fuente de verdad para administración central, RBAC global, auditoría, finanzas e integraciones.

## Módulos

- Usuarios
- Roles
- Permisos
- Auditoría
- Finanzas
- Tesorería
- Compras
- Inventarios
- Nóminas globales
- Integraciones
- BI

## Reglas

1. Admin controla usuarios, roles y permisos globales.
2. Toda acción sensible genera auditoría.
3. Finanzas se registra aquí, no en CRM ni Operations.
4. HD-BRAIN observa y recomienda; no reemplaza Admin.
5. CRM gestiona seguimiento de clientes, no finanzas globales.

## Prioridad

Alta.
