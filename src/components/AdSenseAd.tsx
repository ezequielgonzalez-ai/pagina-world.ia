"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";

interface AdSenseAdProps {
  slot?: string;
  format?: "auto" | "horizontal" | "vertical" | "rectangle";
  responsive?: boolean;
  className?: string;
}

// Google AdSense Component
export function AdSenseAd({
  slot = "1234567890", // Default slot - replace with real one
  format = "auto",
  responsive = true,
  className = "",
}: AdSenseAdProps) {
  const adRef = useRef<HTMLModElement>(null);
  const { language } = useLanguage();

  useEffect(() => {
    try {
      // Only load ads in production and if adsbygoogle exists
      if (typeof window !== "undefined" && (window as any).adsbygoogle) {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch (error) {
      console.error("AdSense error:", error);
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`ad-container my-4 ${className}`}
    >
      {/* Ad label */}
      <div className="flex items-center justify-center mb-2">
        <Badge variant="outline" className="text-xs text-muted-foreground border-border/30">
          {language === "es" ? "Publicidad" : "Advertisement"}
        </Badge>
      </div>

      {/* AdSense ad unit */}
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block", minHeight: "90px" }}
        data-ad-client="ca-pub-9430304865198789"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      />

      {/* Fallback for when ads don't load */}
      <noscript>
        <div className="flex items-center justify-center h-24 bg-muted/20 rounded-lg">
          <span className="text-sm text-muted-foreground">
            {language === "es" ? "Anuncio" : "Ad"}
          </span>
        </div>
      </noscript>
    </motion.div>
  );
}

// In-feed Ad Component (shows between tools)
export function InFeedAd({ index }: { index: number }) {
  const { language } = useLanguage();

  // Show ad every 12 tools
  if (index % 12 !== 0 || index === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="col-span-full"
    >
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-card/60 via-muted/30 to-card/60 border border-border/30 p-4">
        <div className="flex items-center justify-between mb-3">
          <Badge variant="outline" className="text-xs text-muted-foreground">
            {language === "es" ? "Patrocinado" : "Sponsored"}
          </Badge>
        </div>

        {/* Ad content placeholder - in production this would be real ads */}
        <div className="flex items-center justify-center h-20 bg-muted/20 rounded-lg">
          <span className="text-sm text-muted-foreground">
            {language === "es" ? "Espacio publicitario" : "Ad space"}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// Native Ad Component (looks like a tool card)
export function NativeAd() {
  const { language } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <div className="relative h-full overflow-hidden bg-gradient-to-br from-amber-500/10 to-orange-500/5 backdrop-blur-sm border-amber-500/20 rounded-xl p-5 transition-all duration-300">
        {/* Sponsored badge */}
        <div className="absolute top-3 right-3">
          <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-xs">
            {language === "es" ? "Patrocinado" : "Sponsored"}
          </Badge>
        </div>

        {/* Content */}
        <div className="pt-8 text-center">
          <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/10 flex items-center justify-center text-2xl">
            🚀
          </div>
          <h3 className="font-semibold text-lg mb-2">
            {language === "es" ? "Tu anuncio aquí" : "Your ad here"}
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            {language === "es"
              ? "Llega a miles de usuarios interesados en IA"
              : "Reach thousands of AI-interested users"}
          </p>
          <a
            href="mailto:contact@worldia.com"
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 transition-colors text-sm"
          >
            {language === "es" ? "Contactar" : "Contact"}
          </a>
        </div>
      </div>
    </motion.div>
  );
}
