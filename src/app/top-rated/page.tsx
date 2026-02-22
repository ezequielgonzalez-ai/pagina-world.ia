"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Star, TrendingUp, Loader2 } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { Badge } from "@/components/ui/badge";
import { ToolCard } from "@/components/ToolCard";
import { categories, AITool, type CategoryType } from "@/lib/tools-data";
import { useLanguage } from "@/contexts/LanguageContext";

export default function TopRatedPage() {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | "all">("all");
  const [minRating, setMinRating] = useState<number>(4.5);
  const [tools, setTools] = useState<AITool[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const response = await fetch('/api/tools?topRated=true&limit=500');
        if (response.ok) {
          const data = await response.json();
          setTools(data.tools);
        }
      } catch (err) {
        console.error('Failed to fetch tools:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTools();
  }, []);

  const topRatedTools = useMemo(() => {
    let filtered = tools.filter((tool) => tool.rating && tool.rating >= minRating);
    
    if (selectedCategory !== "all") {
      filtered = filtered.filter((tool) => tool.category === selectedCategory);
    }
    
    return filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  }, [tools, selectedCategory, minRating]);

  const ratingFilters = [4.5, 4.0, 3.5, 3.0];

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
              <Star className="w-8 h-8 inline-block mr-2 text-yellow-500" />
              {language === "es" ? "Mejor Valoradas" : "Top Rated"}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {language === "es"
                ? `${topRatedTools.length} herramientas de IA con mejor puntuación`
                : `${topRatedTools.length} highest-rated AI tools`}
            </p>
          </motion.div>

          {/* Rating Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap justify-center gap-2 mb-6"
          >
            {ratingFilters.map((rating) => (
              <Badge
                key={rating}
                variant={minRating === rating ? "default" : "outline"}
                className="cursor-pointer px-4 py-1"
                onClick={() => setMinRating(rating)}
              >
                <Star className="w-3 h-3 mr-1 fill-yellow-500 text-yellow-500" />
                {rating}+
              </Badge>
            ))}
          </motion.div>

          {/* Category Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 mb-8"
          >
            <Badge
              variant={selectedCategory === "all" ? "default" : "outline"}
              className="cursor-pointer px-4 py-1"
              onClick={() => setSelectedCategory("all")}
            >
              {language === "es" ? "Todas" : "All"}
            </Badge>
            {categories.slice(1).map((cat) => (
              <Badge
                key={cat.id}
                variant={selectedCategory === cat.id ? "default" : "outline"}
                className="cursor-pointer px-4 py-1"
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.icon} {cat.id}
              </Badge>
            ))}
          </motion.div>

          {/* Loading State */}
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-yellow-500" />
            </div>
          ) : (
            <>
              {/* Tools Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {topRatedTools.map((tool, index) => (
                  <ToolCard key={tool.id} tool={tool} index={index} />
                ))}
              </div>

              {topRatedTools.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    {language === "es" ? "No hay herramientas con esta puntuación" : "No tools with this rating"}
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
