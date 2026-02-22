"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, ChevronRight, Sparkles, Users } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { professions, industries, searchProfessions, getProfessionsByIndustry, type Profession, type IndustryType } from "@/lib/jobs-data";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";

export default function JobsPage() {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryType | null>(null);

  const filteredProfessions = useMemo(() => {
    let profs = professions;

    if (searchQuery.trim()) {
      profs = searchProfessions(searchQuery);
    }

    if (selectedIndustry) {
      profs = profs.filter(prof => prof.industry === selectedIndustry);
    }

    return profs;
  }, [searchQuery, selectedIndustry]);

  const professionsByIndustry = useMemo(() => {
    const grouped: Record<string, Profession[]> = {};
    filteredProfessions.forEach(prof => {
      const industry = prof.industry;
      if (!grouped[industry]) grouped[industry] = [];
      grouped[industry].push(prof);
    });
    return grouped;
  }, [filteredProfessions]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar onSearch={setSearchQuery} searchQuery={searchQuery} />
      
      <main className="relative z-10 pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <Users className="w-8 h-8 inline-block mr-2 text-primary" />
              {language === "es" ? "Herramientas por Profesión" : "Tools by Profession"}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {language === "es"
                ? `Encuentra herramientas de IA para ${professions.length}+ profesiones`
                : `Find AI tools for ${professions.length}+ professions`}
            </p>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-xl mx-auto mb-8"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder={language === "es" ? "Buscar profesiones..." : "Search professions..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
          </motion.div>

          {/* Industry Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 mb-8"
          >
            <Badge
              variant={selectedIndustry === null ? "default" : "outline"}
              className="cursor-pointer px-4 py-1"
              onClick={() => setSelectedIndustry(null)}
            >
              {language === "es" ? "Todas" : "All"}
            </Badge>
            {industries.map((ind) => (
              <Badge
                key={ind.id}
                variant={selectedIndustry === ind.id ? "default" : "outline"}
                className="cursor-pointer px-4 py-1"
                onClick={() => setSelectedIndustry(selectedIndustry === ind.id ? null : ind.id)}
              >
                {ind.icon} {language === "es" ? ind.nameEs : ind.name}
              </Badge>
            ))}
          </motion.div>

          {/* Results Count */}
          <div className="text-center mb-6">
            <p className="text-muted-foreground">
              {filteredProfessions.length} {language === "es" ? "profesiones encontradas" : "professions found"}
            </p>
          </div>

          {/* Professions Grid by Industry */}
          <div className="space-y-8">
            {industries.map((industry) => {
              const industryProfessions = professionsByIndustry[industry.id];
              if (!industryProfessions || industryProfessions.length === 0) return null;

              return (
                <motion.div
                  key={industry.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h2 className="text-2xl font-bold mb-4 flex items-center">
                    <span className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3 text-xl">
                      {industry.icon}
                    </span>
                    {language === "es" ? industry.nameEs : industry.name}
                    <Badge variant="secondary" className="ml-3">
                      {industryProfessions.length}
                    </Badge>
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {industryProfessions.map((prof) => (
                      <Link key={prof.id} href={`/?profession=${prof.id}`}>
                        <Card className="hover:border-primary/50 transition-all cursor-pointer h-full">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-medium">{language === "es" ? prof.nameEs : prof.name}</h3>
                              <Badge variant="secondary" className="ml-2">
                                {prof.aiCount} AIs
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-2">
                              {language === "es" ? prof.descriptionEs : prof.description}
                            </p>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {filteredProfessions.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {language === "es" ? "No se encontraron profesiones" : "No professions found"}
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <CookieBanner />
    </div>
  );
}
