"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Star, Medal, Crown, Flame, Loader2 } from "lucide-react";
import { AITool } from "@/lib/tools-data";
import { useLanguage } from "@/contexts/LanguageContext";

export default function RankingsPage() {
  const { language } = useLanguage();
  const [sortedByRating, setSortedByRating] = useState<AITool[]>([]);
  const [trendingTools, setTrendingTools] = useState<AITool[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [topRatedRes, trendingRes] = await Promise.all([
          fetch('/api/tools?topRated=true&limit=20'),
          fetch('/api/tools?trending=true&limit=10'),
        ]);

        if (topRatedRes.ok) {
          const data = await topRatedRes.json();
          setSortedByRating(data.tools);
        }
        if (trendingRes.ok) {
          const data = await trendingRes.json();
          setTrendingTools(data.tools);
        }
      } catch (err) {
        console.error('Failed to fetch rankings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-5xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <Badge className="mb-4 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 text-yellow-600 dark:text-yellow-400 border-yellow-500/30">
              <Trophy className="w-4 h-4 mr-2" />
              {language === "es" ? "Rankings 2025" : "Rankings 2025"}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {language === "es" ? "Top Herramientas de IA" : "Top AI Tools"}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {language === "es"
                ? "Las herramientas de IA mejor valoradas por nuestra comunidad. Descubre cuáles son las favoritas."
                : "The highest-rated AI tools by our community. Discover the favorites."}
            </p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center items-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-yellow-500" />
            </div>
          ) : (
            <>
              {/* Top 3 Podium */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12"
              >
                {/* Second Place */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="md:mt-8"
                >
                  <Card className="bg-gradient-to-b from-gray-400/10 to-card border-gray-400/30 text-center p-6 h-full">
                    <div className="text-4xl mb-2">🥈</div>
                    <h3 className="font-bold text-lg mb-1">{sortedByRating[1]?.name}</h3>
                    <div className="flex justify-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < Math.floor(sortedByRating[1]?.rating || 0) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">{sortedByRating[1]?.rating}</p>
                  </Card>
                </motion.div>

                {/* First Place */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Card className="bg-gradient-to-b from-yellow-500/20 to-card border-yellow-500/30 text-center p-8 h-full relative overflow-hidden">
                    <div className="absolute top-2 right-2">
                      <Crown className="w-8 h-8 text-yellow-500" />
                    </div>
                    <div className="text-5xl mb-3">🥇</div>
                    <h3 className="font-bold text-xl mb-2">{sortedByRating[0]?.name}</h3>
                    <div className="flex justify-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-5 h-5 ${i < Math.floor(sortedByRating[0]?.rating || 0) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
                      ))}
                    </div>
                    <p className="text-lg font-bold text-yellow-500">{sortedByRating[0]?.rating}</p>
                    <Badge className="mt-2 bg-yellow-500/20 text-yellow-600">Best Overall</Badge>
                  </Card>
                </motion.div>

                {/* Third Place */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="md:mt-12"
                >
                  <Card className="bg-gradient-to-b from-amber-600/10 to-card border-amber-600/30 text-center p-6 h-full">
                    <div className="text-4xl mb-2">🥉</div>
                    <h3 className="font-bold text-lg mb-1">{sortedByRating[2]?.name}</h3>
                    <div className="flex justify-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < Math.floor(sortedByRating[2]?.rating || 0) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">{sortedByRating[2]?.rating}</p>
                  </Card>
                </motion.div>
              </motion.div>

              {/* Trending Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mb-12"
              >
                <div className="flex items-center gap-2 mb-6">
                  <Flame className="w-6 h-6 text-orange-500" />
                  <h2 className="text-2xl font-bold">
                    {language === "es" ? "Tendencias Ahora" : "Trending Now"}
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {trendingTools.map((tool, index) => (
                    <Card key={tool.id} className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all p-4">
                      <div className="flex items-center gap-4">
                        <div className="text-2xl font-bold text-primary">#{index + 1}</div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{tool.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {language === "es" ? tool.descriptionEs : tool.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span className="font-bold">{tool.rating}</span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </motion.div>

              {/* Full Rankings */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex items-center gap-2 mb-6">
                  <Medal className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-bold">
                    {language === "es" ? "Ranking Completo" : "Full Ranking"}
                  </h2>
                </div>
                <div className="space-y-2">
                  {sortedByRating.map((tool, index) => (
                    <Card key={tool.id} className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all p-4">
                      <div className="flex items-center gap-4">
                        <div className={`text-xl font-bold w-10 text-center ${index < 3 ? 'text-yellow-500' : 'text-muted-foreground'}`}>
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{tool.name}</h3>
                          <p className="text-xs text-muted-foreground">
                            {language === "es" ? tool.descriptionEs : tool.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span className="font-bold">{tool.rating}</span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
