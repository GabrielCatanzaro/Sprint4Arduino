import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLocation } from "wouter";
import { LogOut, User } from "lucide-react";
import { ThemeProvider } from "@/contexts/ThemeContext";

export default function HomeUser({ userName, onLogout }: { userName: string; onLogout: () => void }) {
  const [, setLocation] = useLocation();

  const handleLogout = () => {
    onLogout();
    setLocation("/");
  };

  return (
    <ThemeProvider defaultTheme="dark">
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-teal-100 dark:from-slate-900 dark:to-slate-800 p-4">
        <Card className="w-full max-w-md p-8 shadow-lg text-center">
        <div className="mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-teal-500 dark:from-yellow-400 dark:to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-10 h-10 text-white dark:text-black" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-yellow-200">Bem-vindo!</h1>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-8 dark:bg-slate-800">
          <p className="text-gray-600 text-sm mb-2 dark:text-gray-300">Usuário autenticado:</p>
          <p className="text-2xl font-bold text-green-600 dark:text-yellow-300">{userName}</p>
        </div>

        <div className="space-y-3">
          <Button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 flex items-center justify-center gap-2 dark:bg-yellow-400 dark:hover:bg-yellow-500 dark:text-black"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </Button>
        </div>

        {/* Placeholder feature buttons */}
        <div className="mt-6">
          <h2 className="text-left text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Recursos</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              'Aprovações',
              'Ordens',
              'Preferências de notificação',
              'Central de Segurança',
              'Perfil de investimentos',
              'Imposto de renda',
              'Relatórios',
              'Configurações'
            ].map((label) => (
              <Button
                key={label}
                onClick={() => {}}
                className="w-full text-sm py-2 bg-gray-100 hover:bg-gray-200 dark:bg-yellow-400 dark:hover:bg-yellow-500 dark:text-black"
              >
                {label}
              </Button>
            ))}
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-gray-600 text-xs">
            Sua autenticação facial foi verificada com sucesso.
          </p>
        </div>
        </Card>
      </div>
    </ThemeProvider>
  );
}

