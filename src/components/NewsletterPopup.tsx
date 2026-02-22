"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Gift, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

export function NewsletterPopup() {
  const { language } = useLanguage();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Show popup after 30 seconds, only if not already subscribed
    const hasSubscribed = localStorage.getItem("newsletter_subscribed");
    const hasSeenPopup = sessionStorage.getItem("newsletter_popup_seen");

    if (!hasSubscribed && !hasSeenPopup) {
      const timer = setTimeout(() => {
        setShow(true);
        sessionStorage.setItem("newsletter_popup_seen", "true");
      }, 30000); // 30 seconds

      return () => clearTimeout(timer);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Save to localStorage
    localStorage.setItem("newsletter_subscribed", "true");
    localStorage.setItem("subscriber_email", email);

    // In production, send to API
    console.log("Newsletter subscription:", email);

    setSubmitted(true);
    setTimeout(() => setShow(false), 3000);
  };

  const closePopup = () => {
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={closePopup}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md"
          >
            <Card className="relative overflow-hidden bg-gradient-to-br from-card/95 via-card/90 to-card/95 backdrop-blur-xl border-cyan-500/30 shadow-2xl">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-violet-500/5 to-fuchsia-500/10 pointer-events-none" />

              {/* Close button */}
              <button
                onClick={closePopup}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <CardContent className="p-8 text-center relative">
                {!submitted ? (
                  <>
                    {/* Icon */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                      className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 flex items-center justify-center"
                    >
                      <Gift className="w-8 h-8 text-cyan-400" />
                    </motion.div>

                    {/* Title */}
                    <h2 className="text-2xl font-bold mb-2">
                      {language === "es" ? "¡Únete a WORLD.IA!" : "Join WORLD.IA!"}
                    </h2>

                    {/* Subtitle */}
                    <p className="text-muted-foreground mb-6">
                      {language === "es"
                        ? "Recibe las mejores herramientas de IA, ofertas exclusivas y tips directamente en tu email."
                        : "Get the best AI tools, exclusive deals and tips directly in your email."}
                    </p>

                    {/* Benefits */}
                    <div className="flex flex-wrap justify-center gap-2 mb-6">
                      <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs">
                        <Sparkles className="w-3 h-3 inline mr-1" />
                        {language === "es" ? "Nuevas IAs" : "New AIs"}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-violet-500/10 text-violet-400 text-xs">
                        {language === "es" ? "Ofertas" : "Deals"}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-fuchsia-500/10 text-fuchsia-400 text-xs">
                        {language === "es" ? "Sin Spam" : "No Spam"}
                      </span>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-3">
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          type="email"
                          placeholder={language === "es" ? "tu@email.com" : "your@email.com"}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10 bg-muted/50 border-border/50 focus:border-cyan-500"
                          required
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-400 hover:to-violet-400 text-white font-medium"
                      >
                        {language === "es" ? "Suscribirme Gratis" : "Subscribe Free"}
                      </Button>
                    </form>

                    {/* Privacy note */}
                    <p className="text-xs text-muted-foreground mt-4">
                      {language === "es"
                        ? "🔒 Respetamos tu privacidad. Cancela cuando quieras."
                        : "🔒 We respect your privacy. Unsubscribe anytime."}
                    </p>
                  </>
                ) : (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="py-8"
                  >
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-bold text-emerald-400">
                      {language === "es" ? "¡Gracias por suscribirte!" : "Thanks for subscribing!"}
                    </h3>
                    <p className="text-muted-foreground mt-2">
                      {language === "es"
                        ? "Revisa tu email para confirmar."
                        : "Check your email to confirm."}
                    </p>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
