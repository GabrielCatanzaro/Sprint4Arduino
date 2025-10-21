import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomeUser from "./pages/HomeUser";
import { useState, useEffect } from "react";

function Router({ userName, setUserName }: { userName: string | null; setUserName: (name: string | null) => void }) {
  const handleLoginSuccess = (name: string) => {
    setUserName(name);
    localStorage.setItem("userName", name);
  };

  const handleLogout = () => {
    setUserName(null);
    localStorage.removeItem("userName");
  };

  return (
    <Switch>
      <Route path={"/"} component={() => <Login onLoginSuccess={handleLoginSuccess} />} />
      <Route path={"/register"} component={() => <Register />} />
      <Route path={"/home"} component={() => userName ? <HomeUser userName={userName} onLogout={handleLogout} /> : <Login onLoginSuccess={handleLoginSuccess} />} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const savedUserName = localStorage.getItem("userName");
    if (savedUserName) {
      setUserName(savedUserName);
    }
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
      >
        <TooltipProvider>
          <Toaster />
          <Router userName={userName} setUserName={setUserName} />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
