import { DashboardShell } from "../components/layout/DashboardShell";
import { PageHeader } from "../components/ui/PageHeader";
import { Globe, Lock, Mail, Save } from "../design-system/icons";

interface SettingsSectionProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
  iconColor?: string;
  children: React.ReactNode;
}

function SettingsSection({ title, description, icon: Icon, iconColor = "#0066FF", children }: SettingsSectionProps) {
  return (
    <div style={{
      backgroundColor: "#161F33",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "20px",
      overflow: "hidden",
      marginBottom: "24px",
      boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
    }}>
      {/* Section header */}
      <div style={{
        padding: "20px 24px",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        backgroundColor: "rgba(255,255,255,0.02)",
      }}>
        <div style={{
          width: "36px",
          height: "36px",
          borderRadius: "10px",
          backgroundColor: `${iconColor}1A`,
          border: `1px solid ${iconColor}30`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}>
          <Icon size={18} style={{ color: iconColor }} />
        </div>
        <div>
          <h2 style={{ margin: 0, fontSize: "1rem", fontWeight: 600, color: "#FFFFFF", fontFamily: "Poppins, sans-serif" }}>
            {title}
          </h2>
          <p style={{ margin: 0, fontSize: "0.8rem", color: "#64748B", marginTop: "2px" }}>
            {description}
          </p>
        </div>
      </div>
      {/* Content */}
      <div style={{ padding: "24px" }}>
        {children}
      </div>
    </div>
  );
}

interface FieldProps {
  label: string;
  hint?: string;
  children: React.ReactNode;
}

function Field({ label, hint, children }: FieldProps) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <label style={{
        display: "block",
        fontSize: "0.85rem",
        fontWeight: 500,
        color: "#E2E8F0",
        marginBottom: "6px",
      }}>
        {label}
      </label>
      {children}
      {hint && (
        <p style={{ margin: "5px 0 0", fontSize: "0.75rem", color: "#64748B" }}>{hint}</p>
      )}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  borderRadius: "10px",
  border: "1px solid rgba(255,255,255,0.1)",
  backgroundColor: "#0A0F1C",
  color: "#F1F5F9",
  fontSize: "0.875rem",
  outline: "none",
  boxSizing: "border-box",
};

const selectStyle: React.CSSProperties = {
  ...inputStyle,
  cursor: "pointer",
};

const toggleRowStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "14px 16px",
  borderRadius: "12px",
  backgroundColor: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.06)",
  marginBottom: "12px",
};

interface ToggleProps {
  label: string;
  description: string;
  enabled?: boolean;
}

function Toggle({ label, description, enabled = false }: ToggleProps) {
  return (
    <div style={toggleRowStyle}>
      <div>
        <p style={{ margin: 0, fontSize: "0.875rem", fontWeight: 500, color: "#E2E8F0" }}>{label}</p>
        <p style={{ margin: "2px 0 0", fontSize: "0.75rem", color: "#64748B" }}>{description}</p>
      </div>
      <div style={{
        width: "44px",
        height: "24px",
        borderRadius: "9999px",
        backgroundColor: enabled ? "#0066FF" : "rgba(255,255,255,0.1)",
        border: "1px solid " + (enabled ? "#0052CC" : "rgba(255,255,255,0.15)"),
        position: "relative",
        cursor: "pointer",
        flexShrink: 0,
        boxShadow: enabled ? "0 0 12px rgba(0,102,255,0.3)" : "none",
      }}>
        <div style={{
          position: "absolute",
          top: "3px",
          left: enabled ? "22px" : "3px",
          width: "16px",
          height: "16px",
          borderRadius: "9999px",
          backgroundColor: "#FFFFFF",
          transition: "left 150ms",
        }} />
      </div>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <DashboardShell>
      <PageHeader
        title="Configuración"
        description="Ajustes generales, seguridad y notificaciones del sistema"
        actions={
          <button style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "10px 20px",
            borderRadius: "14px",
            border: "none",
            backgroundColor: "#0066FF",
            color: "#FFFFFF",
            fontWeight: 600,
            fontSize: "0.875rem",
            cursor: "pointer",
            boxShadow: "0 0 20px rgba(0,102,255,0.35)",
          }}>
            <Save size={15} /> Guardar cambios
          </button>
        }
      />

      {/* General */}
      <SettingsSection
        title="General"
        description="Información básica y configuración regional"
        icon={Globe}
        iconColor="#0066FF"
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "0 24px" }}>
          <Field label="Nombre de la empresa" hint="Aparece en reportes, emails y cabeceras">
            <input
              type="text"
              defaultValue="Heavenly Dreams"
              style={inputStyle}
            />
          </Field>
          <Field label="Dominio principal" hint="Dominio base para links generados">
            <input
              type="text"
              defaultValue="heavenlydreams.com.mx"
              style={inputStyle}
            />
          </Field>
          <Field label="Zona horaria" hint="Usada para timestamps y reportes">
            <select defaultValue="America/Mexico_City" style={selectStyle}>
              <option value="America/Mexico_City">America/Mexico_City (CDT, UTC-5)</option>
              <option value="America/Cancun">America/Cancun (EST, UTC-6)</option>
              <option value="America/Hermosillo">America/Hermosillo (MST, UTC-7)</option>
              <option value="UTC">UTC</option>
            </select>
          </Field>
          <Field label="Idioma predeterminado" hint="Idioma de la interfaz y notificaciones">
            <select defaultValue="es-MX" style={selectStyle}>
              <option value="es-MX">Español (México)</option>
              <option value="es-ES">Español (España)</option>
              <option value="en-US">English (US)</option>
            </select>
          </Field>
          <Field label="Formato de fecha" hint="Cómo se muestran las fechas en el sistema">
            <select defaultValue="DD/MM/YYYY" style={selectStyle}>
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD (ISO 8601)</option>
            </select>
          </Field>
        </div>
      </SettingsSection>

      {/* Security */}
      <SettingsSection
        title="Seguridad"
        description="Políticas de contraseñas, sesiones y autenticación multifactor"
        icon={Lock}
        iconColor="#EF4444"
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "0 24px", marginBottom: "20px" }}>
          <Field label="Tiempo de sesión (minutos)" hint="Sesión inactiva cerrará automáticamente">
            <input
              type="number"
              defaultValue={60}
              min={5}
              max={480}
              style={inputStyle}
            />
          </Field>
          <Field label="Mínimo de caracteres en contraseña" hint="Longitud mínima para contraseñas nuevas">
            <input
              type="number"
              defaultValue={12}
              min={8}
              max={128}
              style={inputStyle}
            />
          </Field>
          <Field label="Intentos fallidos antes de bloqueo" hint="0 = sin límite (no recomendado)">
            <input
              type="number"
              defaultValue={5}
              min={0}
              max={20}
              style={inputStyle}
            />
          </Field>
          <Field label="Duración del bloqueo (minutos)" hint="Tiempo bloqueado tras superar intentos">
            <input
              type="number"
              defaultValue={15}
              min={1}
              max={1440}
              style={inputStyle}
            />
          </Field>
        </div>

        <h3 style={{ margin: "0 0 12px", fontSize: "0.875rem", fontWeight: 600, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.06em" }}>
          Políticas
        </h3>
        <Toggle label="Autenticación multifactor (MFA)" description="Requiere MFA para todos los usuarios con rol ADMIN y superior" enabled={true} />
        <Toggle label="MFA obligatorio para todos los usuarios" description="Extiende la obligatoriedad de MFA a todos los roles" enabled={false} />
        <Toggle label="Contraseña con caracteres especiales" description="Las contraseñas deben incluir al menos un símbolo" enabled={true} />
        <Toggle label="Historial de contraseñas" description="Impide reutilizar las últimas 5 contraseñas" enabled={true} />
        <Toggle label="Bloqueo de IP tras intentos fallidos" description="Bloquea la IP de origen tras múltiples fallos consecutivos" enabled={false} />
      </SettingsSection>

      {/* Email / SMTP */}
      <SettingsSection
        title="Correo Electrónico (SMTP)"
        description="Configuración del servidor de correo para notificaciones y alertas"
        icon={Mail}
        iconColor="#10B981"
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "0 24px" }}>
          <Field label="Servidor SMTP" hint="Host del servidor de correo saliente">
            <input
              type="text"
              defaultValue="smtp.gmail.com"
              style={inputStyle}
            />
          </Field>
          <Field label="Puerto SMTP" hint="587 (TLS) o 465 (SSL)">
            <input
              type="number"
              defaultValue={587}
              style={inputStyle}
            />
          </Field>
          <Field label="Usuario SMTP" hint="Email o usuario de autenticación">
            <input
              type="email"
              defaultValue="noreply@heavenlydreams.com.mx"
              style={inputStyle}
            />
          </Field>
          <Field label="Contraseña SMTP" hint="Almacenada cifrada con SECRETS_ENCRYPTION_KEY">
            <input
              type="password"
              defaultValue="••••••••••••"
              style={inputStyle}
            />
          </Field>
          <Field label="Nombre del remitente" hint="Nombre visible en el campo From">
            <input
              type="text"
              defaultValue="Heavenly Dreams Admin"
              style={inputStyle}
            />
          </Field>
          <Field label="Email de respuesta (Reply-To)" hint="A quién responden los destinatarios">
            <input
              type="email"
              defaultValue="soporte@heavenlydreams.com.mx"
              style={inputStyle}
            />
          </Field>
        </div>

        <div style={{ marginTop: "8px" }}>
          <Toggle label="Cifrado TLS" description="Usar cifrado TLS/STARTTLS para el envío de emails" enabled={true} />
          <Toggle label="Notificaciones de login nuevo" description="Enviar email al detectar inicio de sesión desde IP desconocida" enabled={true} />
          <Toggle label="Alertas de auditoría críticas" description="Recibir email inmediato cuando se registre un evento de severidad crítica" enabled={true} />
        </div>

        <div style={{ marginTop: "16px" }}>
          <button style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "9px 16px",
            borderRadius: "10px",
            border: "1px solid rgba(16,185,129,0.3)",
            backgroundColor: "rgba(16,185,129,0.1)",
            color: "#34D399",
            fontWeight: 500,
            fontSize: "0.85rem",
            cursor: "pointer",
          }}>
            <Mail size={14} /> Enviar email de prueba
          </button>
        </div>
      </SettingsSection>
    </DashboardShell>
  );
}
