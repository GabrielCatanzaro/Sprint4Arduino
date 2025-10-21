import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLocation } from "wouter";
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { ThemeProvider } from "@/contexts/ThemeContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export default function Login({ onLoginSuccess }: { onLoginSuccess: (userName: string) => void }) {
  const [, setLocation] = useLocation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    if (cameraActive) {
      startCamera();
    } else {
      stopCamera();
    }
  }, [cameraActive]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "Não foi possível acessar a câmera. Verifique as permissões.",
      });
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
    }
  };

  const captureAndLogin = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    setLoading(true);
    setMessage(null);

    try {
      const context = canvasRef.current.getContext("2d");
      if (!context) throw new Error("Não foi possível obter contexto do canvas");

      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0);

      canvasRef.current.toBlob(async (blob) => {
        if (!blob) {
          setMessage({ type: "error", text: "Erro ao capturar imagem" });
          setLoading(false);
          return;
        }

        const formData = new FormData();
        formData.append("file", blob, "face.jpg");

        const response = await fetch(`${API_URL}/login/`, {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (response.ok) {
          setMessage({ type: "success", text: data.message });
          onLoginSuccess(data.user);
          setTimeout(() => {
            setLocation("/home");
          }, 1500);
        } else {
          setMessage({ type: "error", text: data.detail || "Erro ao fazer login" });
        }
      }, "image/jpeg");
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Erro ao fazer login",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider defaultTheme="dark">
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800 p-4">
        <Card className="w-full max-w-md p-8 shadow-lg">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Login Facial</h1>
            <p className="text-gray-600 mt-2 dark:text-gray-300">Autentique-se com seu rosto</p>
          </div>

          {message && (
            <div
              className={`flex items-center gap-3 p-4 rounded-lg mb-6 ${
                message.type === "success"
                  ? "bg-green-50 border border-green-200"
                  : "bg-red-50 border border-red-200"
              }`}
            >
              {message.type === "success" ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600" />
              )}
              <p
                className={`text-sm ${
                  message.type === "success" ? "text-green-800" : "text-red-800"
                }`}
              >
                {message.text}
              </p>
            </div>
          )}

          <div className="space-y-4">
            {cameraActive ? (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full rounded-lg bg-black"
                />
                <canvas ref={canvasRef} className="hidden" />
                <div className="flex gap-2">
                  <Button
                    onClick={captureAndLogin}
                    disabled={loading}
                    className="flex-1 bg-green-600 hover:bg-green-700 dark:bg-yellow-400 dark:hover:bg-yellow-500 dark:text-black"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Processando...
                      </>
                    ) : (
                      "Capturar e Fazer Login"
                    )}
                  </Button>
                  <Button
                    onClick={() => setCameraActive(false)}
                    variant="outline"
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                </div>
              </>
            ) : (
              <Button
                onClick={() => setCameraActive(true)}
                className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-yellow-400 dark:hover:bg-yellow-500 dark:text-black"
              >
                Ativar Câmera
              </Button>
            )}
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm dark:text-gray-300">
              Não tem conta?{" "}
              <button
                onClick={() => setLocation("/register")}
                className="text-blue-600 hover:text-blue-700 font-semibold dark:text-yellow-300"
              >
                Registre-se aqui
              </button>
            </p>
          </div>
        </Card>
      </div>
    </ThemeProvider>
  );
}

