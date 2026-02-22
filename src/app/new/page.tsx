"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Clock, Loader2 } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { Badge } from "@/components/ui/badge";
import { ToolCard } from "@/components/ToolCard";
import { AITool } from "@/lib/tools-data";
import { useLanguage } from "@/contexts/LanguageContext";

export default function NewPage() {
  const { language } = useLanguage();
  const [newTools, setNewTools] = useState<AITool[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewTools = async () => {
      try {
        const response = await fetch('/api/tools?newest=true&limit=100');
        if (response.ok) {
          const data = await response.json();
          setNewTools(data.tools.sort((a: AITool, b: AITool) => (b.rating || 0) - (a.rating || 0)));
        }
      } catch (err) {
        console.error('Failed to fetch new tools:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNewTools();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar onSearch={() => {}} searchQuery="" />
      
      <main className="relative z-10 pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <Clock className="w-8 h-8 inline-block mr-2 text-green-500" />
              {language === "es" ? "Nuevos Lanzamientos" : "Just Released"}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {language === "es"
                ? `Descubre las ${newTools.length} últimas herramientas de IA añadidas`
                : `Discover the ${newTools.length} latest AI tools added`}
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex justify-center gap-4 mb-8"
          >
            <Badge variant="outline" className="text-sm py-2 px-4">
              <Sparkles className="w-4 h-4 mr-2 text-green-500" />
              {newTools.length} {language === "es" ? "herramientas nuevas" : "new tools"}
            </Badge>
          </motion.div>

          {/* Loading State */}
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-green-500" />
            </div>
          ) : (
            <>
              {/* Tools Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {newTools.map((tool, index) => (
                  <ToolCard key={tool.id} tool={tool} index={index} />
                ))}
              </div>

              {newTools.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    {language === "es" ? "No hay herramientas nuevas" : "No new tools available"}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
      <CookieBanner />
    </div>
  );
}
