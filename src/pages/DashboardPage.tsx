import { LogOut, Settings, Shield, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const modules = [
  { icon: Users, label: "Usuarios", description: "Gestión de cuentas y accesos", href: "#" },
  { icon: Shield, label: "Roles & Permisos", description: "Control de acceso RBAC", href: "#" },
  { icon: Settings, label: "Configuración", description: "Ajustes del sistema", href: "#" },
];

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-[#F9FAFB]">
      <header className="bg-[#111827] border-b border-[#1F2937] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#0066FF] flex items-center justify-center">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-white" style={{ fontFamily: "Poppins, sans-serif" }}>
            HD Admin
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[#9CA3AF] text-sm">{user?.email ?? "Admin"}</span>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-[#9CA3AF] hover:text-white transition-colors text-sm"
          >
            <LogOut className="w-4 h-4" />
            Salir
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1
            className="text-2xl font-bold text-white"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Bienvenido, {user?.name ?? "Admin"}
          </h1>
          <p className="text-[#9CA3AF] mt-1 text-sm">Panel de administración del ecosistema HD</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((mod) => (
            <a
              key={mod.label}
              href={mod.href}
              className="group bg-[#111827] border border-[#1F2937] rounded-xl p-6 hover:border-[#0066FF] hover:bg-[#161F33] transition-all"
            >
              <div className="w-10 h-10 rounded-lg bg-[#0066FF]/10 flex items-center justify-center mb-4 group-hover:bg-[#0066FF]/20 transition-colors">
                <mod.icon className="w-5 h-5 text-[#0066FF]" />
              </div>
              <h3 className="font-semibold text-[#F9FAFB] mb-1">{mod.label}</h3>
              <p className="text-[#9CA3AF] text-sm">{mod.description}</p>
            </a>
          ))}
        </div>

        <div className="mt-8 bg-[#111827] border border-[#1F2937] rounded-xl p-6">
          <h2 className="font-semibold text-[#F9FAFB] mb-3">Estado del sistema</h2>
          <div className="flex items-center gap-2 text-sm text-[#10B981]">
            <div className="w-2 h-2 rounded-full bg-[#10B981]" />
            Todos los servicios operativos
          </div>
        </div>
      </main>
    </div>
  );
}
