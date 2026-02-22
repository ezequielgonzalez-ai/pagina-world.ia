"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User, Sparkles, Minimize2, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function AIAssistant() {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: language === "es" 
        ? "¡Hola! 👋 Soy el asistente de WORLD.IA. ¿En qué puedo ayudarte? Puedo recomendarte herramientas de IA, explicar conceptos o responder preguntas sobre el directorio."
        : "Hi! 👋 I'm the WORLD.IA assistant. How can I help you? I can recommend AI tools, explain concepts, or answer questions about the directory."
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickQuestions = language === "es" 
    ? [
        "¿Cuáles son las mejores herramientas de IA para crear imágenes?",
        "¿Cómo puedo usar IA para escribir mejor?",
        "¿Qué herramientas de IA son gratuitas?",
        "¿Recomiéndame herramientas para videos"
      ]
    : [
        "What are the best AI tools for creating images?",
        "How can I use AI to write better?",
        "Which AI tools are free?",
        "Recommend me tools for videos"
      ];

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: userMessage,
          context: language === "es" 
            ? "Eres un asistente amigable de WORLD.IA, un directorio de herramientas de IA. Ayuda a los usuarios a encontrar las mejores herramientas de IA para sus necesidades. Responde en español de forma concisa y útil."
            : "You are a friendly assistant for WORLD.IA, an AI tools directory. Help users find the best AI tools for their needs. Respond in English concisely and helpfully."
        }),
      });

      const data = await response.json();
      
      if (data.content) {
        setMessages(prev => [...prev, { role: "assistant", content: data.content }]);
      } else {
        throw new Error("No response");
      }
    } catch {
      // Fallback response
      const fallbackResponses = language === "es" ? [
        "¡Gracias por tu pregunta! Te recomiendo explorar nuestras categorías de herramientas para encontrar la mejor opción para ti. ¿Hay algo específico que buscas?",
        "Puedo ayudarte a encontrar herramientas de IA. Navega por nuestras categorías o usa el buscador. ¿Qué tipo de herramienta necesitas?",
        "¡Excelente pregunta! Tenemos más de 1,100 herramientas organizadas por categoría. ¿Te gustaría que te recomiende alguna en particular?"
      ] : [
        "Thanks for your question! I recommend exploring our tool categories to find the best option for you. Is there something specific you're looking for?",
        "I can help you find AI tools. Browse our categories or use the search. What type of tool do you need?",
        "Great question! We have over 1,100 tools organized by category. Would you like me to recommend a specific one?"
      ];
      
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)] 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickQuestion = (question: string) => {
    setInput(question);
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-r from-primary via-purple-500 to-pink-500 shadow-2xl shadow-primary/30 flex items-center justify-center group"
          >
            <Bot className="w-7 h-7 text-white group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full animate-pulse border-2 border-background" />
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-purple-500 to-pink-500 animate-spin-slow opacity-50 blur-md -z-10" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`fixed z-50 ${isMinimized ? 'bottom-6 right-6' : 'bottom-6 right-6 md:bottom-6 md:right-6'} 
              ${isMinimized ? 'w-auto' : 'w-[calc(100%-3rem)] md:w-[420px]'} 
              max-h-[calc(100vh-8rem)]`}
          >
            <Card className={`backdrop-blur-xl bg-background/95 border-2 border-primary/20 shadow-2xl shadow-primary/10 overflow-hidden
              ${isMinimized ? 'rounded-full' : 'rounded-3xl'}`}>
              
              {isMinimized ? (
                // Minimized state
                <div className="flex items-center gap-3 p-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary via-purple-500 to-pink-500 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{language === "es" ? "Asistente IA" : "AI Assistant"}</p>
                    <p className="text-xs text-muted-foreground">{language === "es" ? "En línea" : "Online"}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setIsMinimized(false)} className="h-8 w-8">
                    <Maximize2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8">
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                // Expanded state
                <>
                  {/* Header */}
                  <CardHeader className="bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10 border-b border-primary/10 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary via-purple-500 to-pink-500 flex items-center justify-center">
                          <Bot className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg flex items-center gap-2">
                            {language === "es" ? "Asistente IA" : "AI Assistant"}
                            <Sparkles className="w-4 h-4 text-yellow-500" />
                          </CardTitle>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            {language === "es" ? "En línea • Responde al instante" : "Online • Instant response"}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" onClick={() => setIsMinimized(true)} className="h-8 w-8 hover:bg-primary/10">
                          <Minimize2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8 hover:bg-primary/10">
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>

                  {/* Messages */}
                  <CardContent className="p-0">
                    <div className="h-80 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
                      {messages.map((msg, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                        >
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0
                            ${msg.role === "assistant" 
                              ? "bg-gradient-to-r from-primary via-purple-500 to-pink-500" 
                              : "bg-muted"}`}>
                            {msg.role === "assistant" 
                              ? <Bot className="w-4 h-4 text-white" />
                              : <User className="w-4 h-4" />}
                          </div>
                          <div className={`rounded-2xl px-4 py-2 max-w-[80%] text-sm
                            ${msg.role === "assistant" 
                              ? "bg-muted rounded-tl-sm" 
                              : "bg-primary text-primary-foreground rounded-tr-sm"}`}>
                            {msg.content}
                          </div>
                        </motion.div>
                      ))}
                      
                      {isLoading && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex gap-3"
                        >
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary via-purple-500 to-pink-500 flex items-center justify-center">
                            <Bot className="w-4 h-4 text-white" />
                          </div>
                          <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3">
                            <div className="flex gap-1">
                              <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                              <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                              <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                            </div>
                          </div>
                        </motion.div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>

                    {/* Quick Questions */}
                    {messages.length === 1 && (
                      <div className="px-4 pb-2">
                        <p className="text-xs text-muted-foreground mb-2">
                          {language === "es" ? "Preguntas rápidas:" : "Quick questions:"}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {quickQuestions.slice(0, 2).map((q, i) => (
                            <button
                              key={i}
                              onClick={() => handleQuickQuestion(q)}
                              className="text-xs px-2 py-1 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
                            >
                              {q.length > 30 ? q.slice(0, 30) + "..." : q}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Input */}
                    <div className="p-4 border-t border-primary/10 bg-background/50">
                      <form 
                        onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                        className="flex gap-2"
                      >
                        <Input
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          placeholder={language === "es" ? "Escribe tu pregunta..." : "Type your question..."}
                          className="flex-1 rounded-full border-primary/20 focus:border-primary/50 bg-background"
                          disabled={isLoading}
                        />
                        <Button 
                          type="submit" 
                          size="icon" 
                          className="rounded-full bg-gradient-to-r from-primary via-purple-500 to-pink-500 hover:opacity-90"
                          disabled={isLoading || !input.trim()}
                        >
                          <Send className="w-4 h-4" />
                        </Button>
                      </form>
                    </div>
                  </CardContent>
                </>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
