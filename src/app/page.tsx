"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, TrendingUp, Search, X, Coffee, ArrowRight, Bot, Palette, Video, MessageSquare, Code, BarChart3, Music, Presentation, LineChart, Box, Megaphone, Microscope, Users, Briefcase, GraduationCap, Pen, Settings, Loader2, AlertCircle, RefreshCw } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ToolCard } from "@/components/ToolCard";
import { CategoryFilter } from "@/components/CategoryFilter";
import { CookieBanner } from "@/components/CookieBanner";
import { AdGrid } from "@/components/AdBanner";
import { AIAssistant } from "@/components/AIAssistant";
import { InFeedAd, NativeAd } from "@/components/AdSenseAd";
import { SkeletonGrid } from "@/components/SkeletonCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { categories, CategoryId, popularTasks, professionFilters, TaskType, ProfessionType, AITool } from "@/lib/tools-data";
import { useLanguage } from "@/contexts/LanguageContext";
import { useData } from "@/hooks/useData";

// ============================================
// ANIMACIÓN OPTIMIZADA - Max 300ms, respeta prefers-reduced-motion
// ============================================
const shouldReduceMotion = typeof window !== 'undefined' 
  ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
  : false;

const fadeInUp = {
  initial: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: shouldReduceMotion ? 0 : -10 },
  transition: { duration: shouldReduceMotion ? 0 : 0.25, ease: "easeOut" }
};

const staggerContainer = {
  animate: { transition: { staggerChildren: shouldReduceMotion ? 0 : 0.03 } }
};

// ============================================
// CATEGORÍAS - Datos estáticos (no fetch)
// ============================================
const categoryIcons: Record<string, React.ReactNode> = {
  audio: <Music className="w-5 h-5" />,
  images: <Palette className="w-5 h-5" />,
  video: <Video className="w-5 h-5" />,
  chat: <MessageSquare className="w-5 h-5" />,
  coding: <Code className="w-5 h-5" />,
  productivity: <BarChart3 className="w-5 h-5" />,
  presentations: <Presentation className="w-5 h-5" />,
  data: <LineChart className="w-5 h-5" />,
  "3d": <Box className="w-5 h-5" />,
  marketing: <Megaphone className="w-5 h-5" />,
  research: <Microscope className="w-5 h-5" />,
};

const categoryCounts: Record<string, number> = {
  audio: 50, images: 500, video: 200, chat: 100, coding: 150,
  productivity: 400, presentations: 50, data: 100, "3d": 80, marketing: 300, research: 100,
};

const taskIcons: Record<string, React.ReactNode> = {
  writing: <Pen className="w-5 h-5" />, "image-generation": <Palette className="w-5 h-5" />,
  "video-creation": <Video className="w-5 h-5" />, "code-generation": <Code className="w-5 h-5" />,
  "data-analysis": <LineChart className="w-5 h-5" />, "voice-synthesis": <Music className="w-5 h-5" />,
  translation: <Users className="w-5 h-5" />, summarization: <BarChart3 className="w-5 h-5" />,
  chatbots: <MessageSquare className="w-5 h-5" />, seo: <TrendingUp className="w-5 h-5" />,
  marketing: <Megaphone className="w-5 h-5" />, research: <Microscope className="w-5 h-5" />,
};

const professionIcons: Record<string, React.ReactNode> = {
  developers: <Code className="w-5 h-5" />, designers: <Palette className="w-5 h-5" />,
  marketers: <Megaphone className="w-5 h-5" />, writers: <Pen className="w-5 h-5" />,
  managers: <Briefcase className="w-5 h-5" />, students: <GraduationCap className="w-5 h-5" />,
  researchers: <Microscope className="w-5 h-5" />, creators: <Video className="w-5 h-5" />,
};

// ============================================
// COMPONENTE: Estado de Error
// ============================================
function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  const { language } = useLanguage();
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <AlertCircle className="w-12 h-12 text-red-400 mb-4" />
      <p className="text-muted-foreground mb-4">{message}</p>
      {onRetry && (
        <Button variant="outline" onClick={onRetry}>
          <RefreshCw className="w-4 h-4 mr-2" />
          {language === "es" ? "Reintentar" : "Retry"}
        </Button>
      )}
    </div>
  );
}

// ============================================
// COMPONENTE: Sección con Loading State
// ============================================
function ToolsSection({ 
  title, 
  subtitle, 
  tools, 
  isLoading, 
  error,
  icon: Icon,
  iconColor = "text-cyan-400",
  bgColor = ""
}: { 
  title: string; 
  subtitle: string; 
  tools: AITool[]; 
  isLoading: boolean;
  error?: Error;
  icon: React.ElementType;
  iconColor?: string;
  bgColor?: string;
}) {
  if (error) {
    return (
      <section className={`py-12 px-4 ${bgColor}`}>
        <div className="container mx-auto">
          <ErrorState message={error.message} />
        </div>
      </section>
    );
  }

  return (
    <section className={`py-12 px-4 ${bgColor}`}>
      <div className="container mx-auto">
        <motion.div
          initial={fadeInUp.initial}
          whileInView={fadeInUp.animate}
          viewport={{ once: true, margin: "100px" }}
          transition={fadeInUp.transition}
          className="text-center mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            <Icon className={`w-6 h-6 inline-block mr-2 ${iconColor}`} />
            {title}
          </h2>
          <p className="text-muted-foreground">{subtitle}</p>
        </motion.div>
        
        {isLoading ? (
          <SkeletonGrid count={4} />
        ) : tools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tools.slice(0, 8).map((tool, index) => (
              <ToolCard key={tool.id} tool={tool} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            No hay herramientas disponibles
          </div>
        )}
      </div>
    </section>
  );
}

// ============================================
// PÁGINA PRINCIPAL
// ============================================
export default function HomePage() {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<CategoryId>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTask, setActiveTask] = useState<TaskType | null>(null);
  const [activeProfession, setActiveProfession] = useState<ProfessionType | null>(null);
  
  // PAGINACIÓN: Solo 20 herramientas inicialmente (antes 100)
  // CORREGIDO: Inicializar totalCount con 6367 para evitar "0 de 6,367"
  const TOTAL_TOOLS = 6367; // Hardcoded para mostrar desde el inicio
  const [tools, setTools] = useState<AITool[]>([]);
  const [totalCount, setTotalCount] = useState(TOTAL_TOOLS);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  // CONTADOR INMEDIATO: Reservar espacio para evitar CLS
  const [showInitialLoader, setShowInitialLoader] = useState(true);
  const loaderRef = useRef<HTMLDivElement>(null);
  const initialLoadDone = useRef(false);
  
  const TOOLS_PER_PAGE = 20; // Reducido de 100 a 20 para LCP

  // FETCH con caché: Herramientas destacadas
  const { data: featuredTools, isLoading: loadingFeatured, error: errorFeatured } = useData(
    'featured-tools',
    async () => {
      const res = await fetch('/api/tools?featured=true&limit=8');
      if (!res.ok) throw new Error('Error cargando destacados');
      return (await res.json()).tools as AITool[];
    }
  );

  // FETCH: Lista principal con paginación
  const fetchTools = useCallback(async (pageNum: number, append: boolean = false) => {
    try {
      if (append) {
        setIsLoadingMore(true);
      } else {
        setShowInitialLoader(true);
      }
      setError(null);

      const params = new URLSearchParams();
      params.set('page', pageNum.toString());
      params.set('limit', TOOLS_PER_PAGE.toString());
      if (activeCategory !== 'all') params.set('category', activeCategory);
      if (searchQuery) params.set('search', searchQuery);

      const response = await fetch(`/api/tools?${params.toString()}`);
      if (!response.ok) throw new Error('Error al cargar herramientas');

      const data = await response.json();

      if (append) {
        setTools(prev => [...prev, ...data.tools]);
      } else {
        setTools(data.tools);
      }

      setTotalCount(data.totalCount || 6367);
      setHasMore(data.pagination?.hasMore || false);
      setPage(pageNum);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error desconocido'));
    } finally {
      setShowInitialLoader(false);
      setIsLoadingMore(false);
    }
  }, [activeCategory, searchQuery]);

  // Carga inicial - solo una vez
  useEffect(() => {
    if (!initialLoadDone.current) {
      initialLoadDone.current = true;
      fetchTools(1);
    }
  }, []);
  
  // Refetch cuando cambian filtros
  useEffect(() => {
    if (initialLoadDone.current) {
      setPage(1);
      setTools([]);
      fetchTools(1);
    }
  }, [activeCategory, searchQuery]);

  // Infinite scroll optimizado con Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoadingMore && !showInitialLoader) {
          fetchTools(page + 1, true);
          setPage(p => p + 1);
        }
      },
      { rootMargin: "500px" } // Cargar 500px antes de llegar al final
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, isLoadingMore, showInitialLoader, page, fetchTools]);

  // Filtros cliente
  const filteredTools = useMemo(() => {
    let result = tools;
    if (activeTask) {
      result = result.filter((tool) => {
        const task = popularTasks.find(t => t.id === activeTask);
        return task?.categories.includes(tool.category);
      });
    }
    if (activeProfession) {
      result = result.filter((tool) => {
        const profession = professionFilters.find(p => p.id === activeProfession);
        return profession?.categories.includes(tool.category);
      });
    }
    return result;
  }, [tools, activeTask, activeProfession]);

  // Stats dinámicos
  const stats = useMemo(() => [
    { value: `${TOTAL_TOOLS.toLocaleString()}+`, label: t.stats.tools, icon: Bot, color: "from-purple-500 to-pink-500" },
    { value: "11", label: language === "es" ? "Categorías" : "Categories", icon: Settings, color: "from-blue-500 to-cyan-500" },
    { value: `${popularTasks.length}+`, label: language === "es" ? "Tareas" : "Tasks", icon: Pen, color: "from-green-500 to-emerald-500" },
    { value: `${professionFilters.length}+`, label: language === "es" ? "Profesiones" : "Professions", icon: Users, color: "from-orange-500 to-yellow-500" },
  ], [t.stats.tools, language]);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background optimizado */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 gradient-mesh-2026 opacity-40" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="aurora-layer" />
        </div>
        <div className="orb orb-1 animate-blob" style={{ animationDelay: "0s", willChange: "transform" }} />
        <div className="orb orb-2 animate-blob" style={{ animationDelay: "3s", willChange: "transform" }} />
        <div className="bubble bubble-1" style={{ bottom: "-80px", willChange: "transform" }} />
        <div className="bubble bubble-2" style={{ bottom: "-60px", willChange: "transform" }} />
        <div className="absolute inset-0 cyber-grid [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black_40%,transparent_100%)]" />
        <div className="absolute inset-0 noise-overlay opacity-30" />
      </div>

      <Navbar onSearch={setSearchQuery} searchQuery={searchQuery} />

      <main className="relative z-10" role="main">
        {/* HERO - Optimizado */}
        <section id="home" className="relative pt-32 pb-20 px-4" aria-labelledby="hero-title">
          <div className="container mx-auto">
            <div className="text-center max-w-4xl mx-auto">
              <motion.div
                initial={fadeInUp.initial}
                animate={fadeInUp.animate}
                transition={fadeInUp.transition}
                className="inline-flex items-center gap-2 mb-6"
              >
                <Badge className="bg-gradient-to-r from-cyan-500/20 via-violet-500/20 to-fuchsia-500/20 text-cyan-400 border-cyan-500/30 px-4 py-1.5 text-sm backdrop-blur-sm">
                  <Sparkles className="w-4 h-4 mr-2 animate-pulse" aria-hidden="true" />
                  {language === "es" ? "Directorio de IA #1 en Español • 2025" : "#1 AI Tools Directory • 2025"}
                  <span className="ml-2 w-2 h-2 bg-emerald-500 rounded-full animate-pulse" aria-hidden="true" />
                </Badge>
              </motion.div>

              <motion.h1
                id="hero-title"
                initial={fadeInUp.initial}
                animate={fadeInUp.animate}
                transition={{ ...fadeInUp.transition, delay: 0.1 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
              >
                <span className="text-foreground">{t.hero.title}</span>
                <br />
                <span className="neon-text-gradient">{t.hero.titleHighlight}</span>
              </motion.h1>

              <motion.p
                initial={fadeInUp.initial}
                animate={fadeInUp.animate}
                transition={{ ...fadeInUp.transition, delay: 0.2 }}
                className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
              >
                {t.hero.subtitle}
              </motion.p>

              <motion.div
                initial={fadeInUp.initial}
                animate={fadeInUp.animate}
                transition={{ ...fadeInUp.transition, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-400 hover:to-violet-400 text-white px-8 font-medium neon-glow"
                >
                  <a href="#tools">
                    {t.hero.cta}
                    <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-border/50 hover:bg-card/50"
                >
                  <a href="https://ko-fi.com/ezequielia" target="_blank" rel="noopener noreferrer">
                    <Coffee className="w-5 h-5 mr-2" aria-hidden="true" />
                    {t.nav.donate}
                  </a>
                </Button>
              </motion.div>

              {/* Stats con skeletons reservando espacio */}
              <motion.div
                initial={fadeInUp.initial}
                animate={fadeInUp.animate}
                transition={{ ...fadeInUp.transition, delay: 0.4 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
                role="list"
                aria-label="Estadísticas"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -5 }}
                    className="group relative p-4 rounded-2xl bg-card/60 dark:bg-card/40 backdrop-blur-sm border border-border/50 hover:border-cyan-500/40 transition-all duration-300 overflow-hidden min-h-[88px]"
                    role="listitem"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                    <stat.icon className="w-6 h-6 text-cyan-400 mx-auto mb-2 group-hover:scale-110 transition-transform" aria-hidden="true" />
                    <div className="text-2xl md:text-3xl font-bold text-foreground relative z-10">
                      {stat.value}
                    </div>
                    <div className="text-xs text-muted-foreground relative z-10">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* SECCIÓN DESTACADA - Solo una, combinada */}
        <ToolsSection
          title={language === "es" ? "⭐ Herramientas Destacadas" : "⭐ Featured Tools"}
          subtitle={language === "es" ? "Las mejores herramientas de IA seleccionadas por expertos" : "The best AI tools handpicked by experts"}
          tools={featuredTools || []}
          isLoading={loadingFeatured}
          error={errorFeatured}
          icon={Sparkles}
          iconColor="text-cyan-400"
        />

        {/* Categories - Compacto */}
        <section className="py-12 px-4" aria-labelledby="categories-title">
          <div className="container mx-auto">
            <div className="text-center mb-8">
              <h2 id="categories-title" className="text-2xl md:text-3xl font-bold mb-2">
                {language === "es" ? "Explora por Categoría" : "Explore by Category"}
              </h2>
              <p className="text-muted-foreground">
                {language === "es" ? "Encuentra la herramienta perfecta para tu necesidad" : "Find the perfect tool for your need"}
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {categories.slice(1).map((category) => (
                <motion.button
                  key={category.id}
                  whileHover={shouldReduceMotion ? {} : { y: -4 }}
                  whileFocus={shouldReduceMotion ? {} : { scale: 1.02 }}
                  onClick={() => setActiveCategory(category.id)}
                  className="cursor-pointer rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2"
                >
                  <Card className="bg-card/60 dark:bg-card/40 backdrop-blur-sm border-border/50 hover:border-cyan-500/40 transition-colors h-full">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-500/10 flex items-center justify-center text-2xl mx-auto mb-3 text-cyan-400">
                        {category.icon}
                      </div>
                      <h3 className="font-semibold text-sm mb-1">
                        {t.categories[category.id as keyof typeof t.categories]}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {categoryCounts[category.id] || 100} {language === "es" ? "herramientas" : "tools"}
                      </p>
                    </CardContent>
                  </Card>
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* MAIN TOOLS SECTION - Con contador correcto */}
        <section id="tools" className="py-16 px-4" aria-labelledby="tools-title">
          <div className="container mx-auto">
            <div className="text-center mb-8">
              <h2 id="tools-title" className="text-3xl md:text-4xl font-bold mb-4">
                {t.nav.tools}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {language === "es" ? "Descubre nuestra colección completa de herramientas de IA" : "Discover our complete collection of AI tools"}
              </p>
            </div>

            <CategoryFilter
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />

            <AnimatePresence>
              {searchQuery && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center justify-center gap-2 mb-6"
                >
                  <Badge variant="outline" className="text-sm">
                    {filteredTools.length} {language === "es" ? "resultados para" : "results for"} "{searchQuery}"
                  </Badge>
                  <Button variant="ghost" size="sm" onClick={() => setSearchQuery("")}>
                    <X className="w-4 h-4 mr-1" />
                    {t.search.clearFilters}
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* CONTADOR - CORREGIDO: Muestra herramientas cargadas + total */}
            <div className="text-center mb-6" role="status" aria-live="polite">
              <Badge variant="outline" className="text-sm py-2 px-4 border-cyan-500/30">
                <Bot className="w-4 h-4 mr-2 text-cyan-400" aria-hidden="true" />
                {language === "es" 
                  ? `Mostrando ${tools.length.toLocaleString()} de ${TOTAL_TOOLS.toLocaleString()} herramientas`
                  : `Showing ${tools.length.toLocaleString()} of ${TOTAL_TOOLS.toLocaleString()} tools`}
                {isLoadingMore && <Loader2 className="w-4 h-4 ml-2 animate-spin text-cyan-400" aria-hidden="true" />}
              </Badge>
            </div>

            {/* TOOLS GRID - Con skeletons inmediatos */}
            {showInitialLoader ? (
              <SkeletonGrid count={8} />
            ) : error ? (
              <ErrorState message={error.message} onRetry={() => fetchTools(1)} />
            ) : filteredTools.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredTools.flatMap((tool, index) => [
                    ...(index > 0 && index % 16 === 0 ? [<InFeedAd key={`ad-${index}`} index={index} />] : []),
                    <ToolCard key={tool.id} tool={tool} index={index} />
                  ])}
                  {filteredTools.length > 20 && <NativeAd key="native-ad-end" />}
                </div>
                
                {/* Loading indicator */}
                {isLoadingMore && (
                  <div className="flex justify-center items-center py-8" role="status">
                    <Loader2 className="w-6 h-6 animate-spin text-cyan-400 mr-2" aria-hidden="true" />
                    <span className="text-muted-foreground">
                      {language === "es" ? "Cargando más herramientas..." : "Loading more tools..."}
                    </span>
                  </div>
                )}
                
                {/* Load More Button */}
                {hasMore && !isLoadingMore && (
                  <div className="text-center mt-8">
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => fetchTools(page + 1, true)}
                      className="border-cyan-500/30 hover:bg-cyan-500/10"
                    >
                      {language === "es" ? "Cargar más herramientas" : "Load more tools"}
                    </Button>
                  </div>
                )}
                
                {/* End indicator */}
                {!hasMore && tools.length > 0 && (
                  <div className="text-center mt-8 py-4">
                    <Badge className="bg-gradient-to-r from-cyan-500/20 to-violet-500/20 text-cyan-400 border-cyan-500/30">
                      <Sparkles className="w-4 h-4 mr-2" aria-hidden="true" />
                      {language === "es" 
                        ? `¡Has visto todas las ${totalCount.toLocaleString()} herramientas!`
                        : `You've seen all ${totalCount.toLocaleString()} tools!`}
                    </Badge>
                  </div>
                )}
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <Search className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" aria-hidden="true" />
                <p className="text-lg text-muted-foreground">{t.search.noResults}</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("all");
                  }}
                >
                  {t.search.clearFilters}
                </Button>
              </motion.div>
            )}
            
            {/* Intersection Observer target */}
            <div ref={loaderRef} className="h-4" aria-hidden="true" />
          </div>
        </section>

        {/* About + Contact Combinados */}
        <section id="about" className="py-16 px-4" aria-labelledby="about-title">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center">
              <Avatar className="w-20 h-20 mx-auto mb-4 border-4 border-cyan-500/30">
                <AvatarImage src="/avatar.png" alt="WORLD.IA" />
                <AvatarFallback>EG</AvatarFallback>
              </Avatar>
              <h2 id="about-title" className="text-2xl md:text-3xl font-bold mb-3">
                {language === "es" ? "Sobre Mí" : "About Me"}
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                {language === "es"
                  ? "¡Hola! Soy Ezequiel Gonzalez, creador de contenido especializado en IA. Mi misión es ayudarte a descubrir las mejores herramientas para potenciar tu productividad."
                  : "Hi! I'm Ezequiel Gonzalez, a content creator specialized in AI. My mission is to help you discover the best tools to boost your productivity."}
              </p>
              
              {/* Redes Sociales */}
              <div className="flex flex-wrap justify-center gap-3 mb-6">
                <Button asChild size="sm" className="bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-400 hover:to-violet-400 text-white">
                  <a href="https://www.instagram.com/m.ezequiel.gonzalez/" target="_blank" rel="noopener noreferrer">
                    Instagram
                  </a>
                </Button>
                <Button asChild size="sm" variant="outline" className="border-red-500/30 hover:bg-red-500/10 hover:text-red-500">
                  <a href="https://www.youtube.com/@Mat%C3%ADasEzequielGonz%C3%A1lez-d4d6v" target="_blank" rel="noopener noreferrer">
                    YouTube
                  </a>
                </Button>
                <Button asChild size="sm" variant="outline" className="border-cyan-500/30 hover:bg-cyan-500/10 hover:text-cyan-400">
                  <a href="https://x.com/MGonzalez85598" target="_blank" rel="noopener noreferrer">
                    X (Twitter)
                  </a>
                </Button>
                <Button asChild size="sm" variant="outline" className="border-blue-500/30 hover:bg-blue-500/10 hover:text-blue-400">
                  <a href="https://www.linkedin.com/in/matiasezequielgonzalez/" target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                </Button>
                <Button asChild size="sm" className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-400 hover:to-orange-400 text-white">
                  <a href="https://ko-fi.com/ezequielia" target="_blank" rel="noopener noreferrer">
                    <Coffee className="w-4 h-4 mr-1" aria-hidden="true" />
                    {t.nav.donate}
                  </a>
                </Button>
              </div>
              
              {/* Amazon Ads */}
              <AdGrid />
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <CookieBanner />
      <AIAssistant />
    </div>
  );
}
