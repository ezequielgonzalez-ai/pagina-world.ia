"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Copy,
  Check,
  Search,
  Star,
  Download,
  Crown,
  Filter,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import { promptPacks, promptCategories, PromptPack } from "@/lib/prompt-packs-data";
import { toast } from "sonner";

export default function PromptsPage() {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredPacks = useMemo(() => {
    let packs = promptPacks;

    if (selectedCategory !== "all") {
      packs = packs.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      packs = packs.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.nameEs.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.descriptionEs.toLowerCase().includes(query)
      );
    }

    return packs;
  }, [selectedCategory, searchQuery]);

  const copyPrompt = (prompt: string, id: string) => {
    navigator.clipboard.writeText(prompt);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
    toast.success(language === "es" ? "¡Prompt copiado!" : "Prompt copied!");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-yellow-500" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text-animated">
                {language === "es" ? "Prompt Packs Premium" : "Premium Prompt Packs"}
              </span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {language === "es"
                ? "Colecciones de prompts optimizados para las mejores IAs. Copia y usa inmediatamente."
                : "Optimized prompt collections for the best AIs. Copy and use immediately."}
            </p>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col sm:flex-row gap-4 mb-8"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === "es" ? "Buscar prompts..." : "Search prompts..."}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                onClick={() => setSelectedCategory("all")}
                size="sm"
              >
                {language === "es" ? "Todos" : "All"}
              </Button>
              {promptCategories.slice(0, 5).map((cat) => (
                <Button
                  key={cat.id}
                  variant={selectedCategory === cat.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(cat.id)}
                  size="sm"
                >
                  {cat.icon} {language === "es" ? cat.nameEs : cat.nameEn}
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Prompt Packs Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPacks.map((pack, index) => (
              <PromptPackCard
                key={pack.id}
                pack={pack}
                index={index}
                language={language}
                copiedId={copiedId}
                onCopy={copyPrompt}
              />
            ))}
          </div>

          {filteredPacks.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/50 flex items-center justify-center">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">
                {language === "es"
                  ? "No se encontraron prompts"
                  : "No prompts found"}
              </p>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

function PromptPackCard({
  pack,
  index,
  language,
  copiedId,
  onCopy,
}: {
  pack: PromptPack;
  index: number;
  language: string;
  copiedId: string | null;
  onCopy: (prompt: string, id: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);

  const aiColors: Record<string, string> = {
    chatgpt: "from-green-500 to-emerald-500",
    claude: "from-orange-500 to-amber-500",
    midjourney: "from-blue-500 to-indigo-500",
    dalle: "from-purple-500 to-pink-500",
    gemini: "from-cyan-500 to-blue-500",
    general: "from-gray-500 to-slate-500",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.05 }}
    >
      <Card className="bg-card/50 dark:bg-card/30 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all h-full flex flex-col">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center text-xl">
                {pack.icon}
              </div>
              <div>
                <CardTitle className="text-lg">
                  {language === "es" ? pack.nameEs : pack.name}
                </CardTitle>
                <div className="flex items-center gap-2 mt-1">
                  <Badge
                    variant="secondary"
                    className={`bg-gradient-to-r ${aiColors[pack.ai]} text-white text-xs`}
                  >
                    {pack.ai.toUpperCase()}
                  </Badge>
                  {pack.isPremium && (
                    <Badge className="bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 text-xs">
                      <Crown className="w-3 h-3 mr-1" />
                      PRO
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <p className="text-sm text-muted-foreground mb-4">
            {language === "es" ? pack.descriptionEs : pack.description}
          </p>

          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              {pack.rating}
            </div>
            <div className="flex items-center gap-1">
              <Download className="w-4 h-4" />
              {pack.downloads.toLocaleString()}
            </div>
          </div>

          <div className="flex-1 space-y-2">
            {pack.prompts.slice(0, expanded ? undefined : 2).map((prompt, idx) => (
              <motion.div
                key={prompt.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors group"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">
                      {language === "es" ? prompt.titleEs : prompt.title}
                    </h4>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">
                      {language === "es" ? prompt.promptEs.slice(0, 60) : prompt.prompt.slice(0, 60)}...
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => onCopy(language === "es" ? prompt.promptEs : prompt.prompt, prompt.id)}
                  >
                    {copiedId === prompt.id ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          {pack.prompts.length > 2 && (
            <Button
              variant="ghost"
              size="sm"
              className="mt-3 w-full"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded
                ? language === "es"
                  ? "Ver menos"
                  : "Show less"
                : language === "es"
                ? `Ver ${pack.prompts.length - 2} más`
                : `Show ${pack.prompts.length - 2} more`}
            </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
