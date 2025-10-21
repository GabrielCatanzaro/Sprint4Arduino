import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useLocation } from "wouter";
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { ThemeProvider } from "@/contexts/ThemeContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export default function Register() {
  const [, setLocation] = useLocation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [name, setName] = useState("");
  const [cameraActive, setCameraActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<
    { type: "success" | "error"; text: string } | null
  >(null);

  useEffect(() => {
    if (cameraActive) startCamera();
    else stopCamera();
  }, [cameraActive]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      });
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (error) {
      setMessage({
        type: "error",
        text: "Não foi possível acessar a câmera. Verifique as permissões.",
      });
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
    }
  };

  const captureAndRegister = async () => {
    if (!name.trim()) {
      setMessage({ type: "error", text: "Por favor, digite seu nome" });
      return;
    }
    if (!videoRef.current || !canvasRef.current) return;

    setLoading(true);
    setMessage(null);

    try {
      const context = canvasRef.current.getContext("2d");
      if (!context) throw new Error("Não foi possível obter contexto do canvas");

      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0);

      // Converte canvas em Blob usando Promise
      const blob: Blob = await new Promise((resolve, reject) => {
        canvasRef.current!.toBlob((b) => {
          if (b) resolve(b);
          else reject(new Error("Erro ao capturar imagem"));
        }, "image/jpeg");
      });

      const formData = new FormData();
      formData.append("name", name);
      formData.append("file", blob, "face.jpg");

      const response = await fetch(`${API_URL}/register/`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        const messageText =
          typeof data.message === "string"
            ? data.message
            : JSON.stringify(data.message);
        setMessage({ type: "success", text: messageText });
        setTimeout(() => setLocation("/"), 1500);
      } else {
        const errorText =
          typeof data.detail === "string"
            ? data.detail
            : JSON.stringify(data.detail) || "Erro ao registrar";
        setMessage({ type: "error", text: errorText });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Erro ao registrar",
      });
    } finally {
      setLoading(false); // garante que o loading sempre pare
    }
  };

  return (
    <ThemeProvider defaultTheme="dark">
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-100 dark:from-slate-900 dark:to-slate-800 p-4">
        <Card className="w-full max-w-md p-8 shadow-lg">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Registrar Rosto</h1>
            <p className="text-gray-600 mt-2 dark:text-gray-300">
              Crie sua conta com reconhecimento facial
            </p>
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
            {!cameraActive ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    Seu Nome
                  </label>
                  <Input
                    type="text"
                    placeholder="Digite seu nome completo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full"
                  />
                </div>
                <Button
                  onClick={() => setCameraActive(true)}
                  disabled={!name.trim()}
                  className="w-full bg-purple-600 hover:bg-purple-700 dark:bg-yellow-400 dark:hover:bg-yellow-500 dark:text-black"
                >
                  Ativar Câmera
                </Button>
              </>
            ) : (
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
                    onClick={captureAndRegister}
                    disabled={loading}
                    className="flex-1 bg-green-600 hover:bg-green-700 dark:bg-yellow-400 dark:hover:bg-yellow-500 dark:text-black"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Processando...
                      </>
                    ) : (
                      "Capturar e Registrar"
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
            )}
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm dark:text-gray-300">
              Já tem conta?{" "}
              <button
                onClick={() => setLocation("/")}
                className="text-purple-600 hover:text-purple-700 font-semibold dark:text-yellow-300"
              >
                Faça login aqui
              </button>
            </p>
          </div>
        </Card>
      </div>
    </ThemeProvider>
  );
}
