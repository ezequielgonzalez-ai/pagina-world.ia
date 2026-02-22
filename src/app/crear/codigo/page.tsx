"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Send,
  Loader2,
  Copy,
  Check,
  Sparkles,
  FileCode,
  Bug,
  Lightbulb,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";

const codeTemplates = [
  {
    id: "review",
    icon: FileCode,
    titleEs: "Revisar Código",
    titleEn: "Code Review",
    descEs: "Analiza tu código en busca de mejoras",
    descEn: "Analyze your code for improvements",
    promptPrefix: "Review this code and suggest improvements:\n\n",
  },
  {
    id: "debug",
    icon: Bug,
    titleEs: "Depurar",
    titleEn: "Debug",
    descEs: "Encuentra y arregla errores",
    descEn: "Find and fix errors",
    promptPrefix: "Find and fix bugs in this code:\n\n",
  },
  {
    id: "explain",
    icon: Lightbulb,
    titleEs: "Explicar",
    titleEn: "Explain",
    descEs: "Obtén una explicación detallada",
    descEn: "Get a detailed explanation",
    promptPrefix: "Explain this code in detail:\n\n",
  },
];

export default function CodeAssistantPage() {
  const { language } = useLanguage();
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const sendRequest = useCallback(async () => {
    if (!input.trim()) {
      toast.error(language === "es" ? "Ingresa tu código o pregunta" : "Enter your code or question");
      return;
    }

    setIsLoading(true);
    setResponse("");

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `You are an expert programmer and code assistant. Help with coding questions, provide clean code examples, and explain concepts clearly. Use markdown code blocks for code snippets.\n\nUser request: ${input}`,
          history: [],
        }),
      });

      const data = await res.json();

      if (data.response) {
        setResponse(data.response);
      } else {
        throw new Error("No response");
      }
    } catch (error) {
      console.error("Code assistant error:", error);
      toast.error(language === "es" ? "Error al procesar" : "Processing error");
    } finally {
      setIsLoading(false);
    }
  }, [input, language]);

  const applyTemplate = useCallback((template: typeof codeTemplates[0]) => {
    setInput(template.promptPrefix);
  }, []);

  const copyResponse = useCallback(() => {
    navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success(language === "es" ? "Copiado al portapapeles" : "Copied to clipboard");
  }, [response, language]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
                <Code2 className="w-6 h-6 text-green-500" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text-animated">
                {language === "es" ? "Asistente de Código IA" : "AI Code Assistant"}
              </span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {language === "es"
                ? "Tu compañero de programación impulsado por IA. Escribe, revisa, depura y aprende código."
                : "Your AI-powered programming companion. Write, review, debug, and learn code."}
            </p>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
          >
            {codeTemplates.map((template, index) => (
              <motion.button
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + index * 0.05 }}
                onClick={() => applyTemplate(template)}
                className="p-4 rounded-xl bg-card/50 dark:bg-card/30 border border-border/50 hover:border-primary/50 transition-all text-left group"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <template.icon className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-medium">
                      {language === "es" ? template.titleEs : template.titleEn}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {language === "es" ? template.descEs : template.descEn}
                    </p>
                  </div>
                </div>
              </motion.button>
            ))}
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-card/50 dark:bg-card/30 backdrop-blur-sm border-border/50 h-full">
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <Label className="text-base font-medium">
                      {language === "es" ? "Tu código o pregunta" : "Your code or question"}
                    </Label>
                    <Textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder={
                        language === "es"
                          ? "Pega tu código aquí o escribe tu pregunta..."
                          : "Paste your code here or write your question..."
                      }
                      className="min-h-[300px] font-mono text-sm"
                    />
                  </div>
                  <Button
                    onClick={sendRequest}
                    disabled={isLoading || !input.trim()}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-500/90 hover:to-emerald-500/90 text-white"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        {language === "es" ? "Procesando..." : "Processing..."}
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        {language === "es" ? "Enviar" : "Send"}
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Output */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="bg-card/50 dark:bg-card/30 backdrop-blur-sm border-border/50 h-full min-h-[400px]">
                <CardContent className="p-6 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <Label className="text-base font-medium">
                      {language === "es" ? "Respuesta" : "Response"}
                    </Label>
                    {response && (
                      <Button onClick={copyResponse} variant="outline" size="sm">
                        {copied ? (
                          <Check className="w-4 h-4 mr-1 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4 mr-1" />
                        )}
                        {language === "es" ? "Copiar" : "Copy"}
                      </Button>
                    )}
                  </div>
                  <div className="flex-1 rounded-lg bg-muted/30 p-4 overflow-auto">
                    {isLoading ? (
                      <div className="flex items-center justify-center h-full">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        >
                          <Sparkles className="w-8 h-8 text-primary" />
                        </motion.div>
                      </div>
                    ) : response ? (
                      <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">
                        {response}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-full text-muted-foreground">
                        {language === "es"
                          ? "La respuesta aparecerá aquí"
                          : "Response will appear here"}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
