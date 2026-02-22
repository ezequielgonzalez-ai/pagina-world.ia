"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Loader2,
  Mail,
  Lock,
  User,
  Chrome,
  Github,
  Twitter,
} from "lucide-react";
import { toast } from "sonner";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: "login" | "register";
}

export function AuthModal({ isOpen, onClose, defaultTab = "login" }: AuthModalProps) {
  const { language } = useLanguage();
  const { login, register, loginWithOAuth } = useAuth();
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [isLoading, setIsLoading] = useState(false);

  // Form states
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await login(loginEmail, loginPassword);

    if (result.success) {
      toast.success(language === "es" ? "¡Bienvenido de vuelta!" : "Welcome back!");
      onClose();
      setLoginEmail("");
      setLoginPassword("");
    } else {
      toast.error(result.error || (language === "es" ? "Error al iniciar sesión" : "Login failed"));
    }

    setIsLoading(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await register(registerName, registerEmail, registerPassword);

    if (result.success) {
      toast.success(language === "es" ? "¡Cuenta creada exitosamente!" : "Account created successfully!");
      onClose();
      setRegisterName("");
      setRegisterEmail("");
      setRegisterPassword("");
    } else {
      toast.error(result.error || (language === "es" ? "Error al registrarse" : "Registration failed"));
    }

    setIsLoading(false);
  };

  const handleOAuth = (provider: "google" | "github" | "twitter") => {
    loginWithOAuth(provider);
    toast.success(language === "es" ? `Conectado con ${provider}` : `Connected with ${provider}`);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden bg-background/95 backdrop-blur-xl border-border/50">
        <div className="relative">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-blue-500/5 pointer-events-none" />

          <div className="relative p-6">
            <DialogHeader className="text-center mb-6">
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary via-purple-500 to-blue-500 bg-clip-text text-transparent">
                WORLD.IA
              </DialogTitle>
              <DialogDescription>
                {language === "es"
                  ? "Inicia sesión o crea una cuenta para continuar"
                  : "Sign in or create an account to continue"}
              </DialogDescription>
            </DialogHeader>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">
                  {language === "es" ? "Iniciar Sesión" : "Sign In"}
                </TabsTrigger>
                <TabsTrigger value="register">
                  {language === "es" ? "Registrarse" : "Sign Up"}
                </TabsTrigger>
              </TabsList>

              {/* Login Form */}
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">
                      {language === "es" ? "Correo electrónico" : "Email"}
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="email@example.com"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password">
                      {language === "es" ? "Contraseña" : "Password"}
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="••••••••"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : null}
                    {language === "es" ? "Iniciar Sesión" : "Sign In"}
                  </Button>
                </form>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border/50" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      {language === "es" ? "o continúa con" : "or continue with"}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <Button
                    variant="outline"
                    onClick={() => handleOAuth("google")}
                    className="w-full"
                  >
                    <Chrome className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleOAuth("github")}
                    className="w-full"
                  >
                    <Github className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleOAuth("twitter")}
                    className="w-full"
                  >
                    <Twitter className="w-4 h-4" />
                  </Button>
                </div>
              </TabsContent>

              {/* Register Form */}
              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-name">
                      {language === "es" ? "Nombre" : "Name"}
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="register-name"
                        type="text"
                        placeholder={language === "es" ? "Tu nombre" : "Your name"}
                        value={registerName}
                        onChange={(e) => setRegisterName(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-email">
                      {language === "es" ? "Correo electrónico" : "Email"}
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="email@example.com"
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-password">
                      {language === "es" ? "Contraseña" : "Password"}
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="register-password"
                        type="password"
                        placeholder="••••••••"
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                        className="pl-10"
                        required
                        minLength={6}
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : null}
                    {language === "es" ? "Crear Cuenta" : "Create Account"}
                  </Button>
                </form>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border/50" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      {language === "es" ? "o regístrate con" : "or sign up with"}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <Button
                    variant="outline"
                    onClick={() => handleOAuth("google")}
                    className="w-full"
                  >
                    <Chrome className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleOAuth("github")}
                    className="w-full"
                  >
                    <Github className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleOAuth("twitter")}
                    className="w-full"
                  >
                    <Twitter className="w-4 h-4" />
                  </Button>
                </div>
              </TabsContent>
            </Tabs>

            <p className="mt-6 text-center text-xs text-muted-foreground">
              {language === "es"
                ? "Al continuar, aceptas nuestros Términos de Servicio y Política de Privacidad"
                : "By continuing, you agree to our Terms of Service and Privacy Policy"}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
