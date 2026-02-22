"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, BookOpen, ChevronRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { glossaryTerms, glossaryCategories, alphabet, searchGlossary, type GlossaryTerm, type GlossaryCategory } from "@/lib/glossary-data";
import { useLanguage } from "@/contexts/LanguageContext";

export default function GlossaryPage() {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<GlossaryCategory | null>(null);
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null);

  const filteredTerms = useMemo(() => {
    let terms = glossaryTerms;

    if (searchQuery.trim()) {
      terms = searchGlossary(searchQuery);
    }

    if (selectedLetter) {
      terms = terms.filter(term => term.term.toLowerCase().startsWith(selectedLetter.toLowerCase()));
    }

    if (selectedCategory) {
      terms = terms.filter(term => term.category === selectedCategory);
    }

    return terms;
  }, [searchQuery, selectedLetter, selectedCategory]);

  const termsByLetter = useMemo(() => {
    const grouped: Record<string, GlossaryTerm[]> = {};
    filteredTerms.forEach(term => {
      const letter = term.term[0].toUpperCase();
      if (!grouped[letter]) grouped[letter] = [];
      grouped[letter].push(term);
    });
    return grouped;
  }, [filteredTerms]);

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
              <BookOpen className="w-8 h-8 inline-block mr-2 text-primary" />
              {language === "es" ? "Glosario de IA" : "AI Glossary"}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {language === "es"
                ? `${glossaryTerms.length}+ términos de inteligencia artificial explicados`
                : `${glossaryTerms.length}+ artificial intelligence terms explained`}
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
                placeholder={language === "es" ? "Buscar términos..." : "Search terms..."}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSelectedLetter(null);
                }}
                className="pl-10 h-12"
              />
            </div>
          </motion.div>

          {/* Alphabet Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-1 mb-8"
          >
            {alphabet.map((letter) => (
              <Button
                key={letter}
                variant={selectedLetter === letter ? "default" : "outline"}
                size="sm"
                className="w-9 h-9 p-0"
                onClick={() => {
                  setSelectedLetter(selectedLetter === letter ? null : letter);
                  setSearchQuery("");
                }}
              >
                {letter}
              </Button>
            ))}
          </motion.div>

          {/* Category Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-2 mb-8"
          >
            <Badge
              variant={selectedCategory === null ? "default" : "outline"}
              className="cursor-pointer px-4 py-1"
              onClick={() => setSelectedCategory(null)}
            >
              {language === "es" ? "Todas" : "All"}
            </Badge>
            {glossaryCategories.map((cat) => (
              <Badge
                key={cat.id}
                variant={selectedCategory === cat.id ? "default" : "outline"}
                className="cursor-pointer px-4 py-1"
                onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
              >
                {language === "es" ? cat.nameEs : cat.name}
              </Badge>
            ))}
          </motion.div>

          {/* Results Count */}
          <div className="text-center mb-6">
            <p className="text-muted-foreground">
              {filteredTerms.length} {language === "es" ? "términos encontrados" : "terms found"}
            </p>
          </div>

          {/* Terms Grid by Letter */}
          <div className="space-y-8">
            {Object.entries(termsByLetter)
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([letter, terms]) => (
                <motion.div
                  key={letter}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h2 className="text-2xl font-bold mb-4 flex items-center">
                    <span className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3 text-primary">
                      {letter}
                    </span>
                    {terms.length} {language === "es" ? "términos" : "terms"}
                  </h2>
                  <div className="space-y-3">
                    {terms.map((term) => (
                      <Card 
                        key={term.id}
                        className="hover:border-primary/50 transition-all cursor-pointer"
                        onClick={() => setExpandedTerm(expandedTerm === term.id ? null : term.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg">{term.term}</h3>
                              <Badge variant="outline" className="mt-1">
                                {glossaryCategories.find(c => c.id === term.category)?.name}
                              </Badge>
                            </div>
                            <ChevronRight className={`w-5 h-5 transition-transform ${expandedTerm === term.id ? 'rotate-90' : ''}`} />
                          </div>
                          {expandedTerm === term.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              className="mt-4 pt-4 border-t"
                            >
                              <p className="text-muted-foreground mb-3">
                                {language === "es" ? term.definitionEs : term.definition}
                              </p>
                              {term.relatedTerms.length > 0 && (
                                <div>
                                  <p className="text-sm font-medium mb-2">
                                    {language === "es" ? "Términos relacionados:" : "Related terms:"}
                                  </p>
                                  <div className="flex flex-wrap gap-2">
                                    {term.relatedTerms.map((related) => (
                                      <Badge key={related} variant="secondary">
                                        {related}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </motion.div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </motion.div>
              ))}
          </div>

          {filteredTerms.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {language === "es" ? "No se encontraron términos" : "No terms found"}
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
