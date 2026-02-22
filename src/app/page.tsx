"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Zap, TrendingUp, Search, X, Coffee, ArrowRight, Bot, Palette, Video, MessageSquare, Code, BarChart3, Music, Image, Presentation, LineChart, Box, Megaphone, Microscope, Star, Clock, Users, Briefcase, GraduationCap, Pen, Settings, Heart, Cpu, Layers, Loader2 } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ToolCard } from "@/components/ToolCard";
import { CategoryFilter } from "@/components/CategoryFilter";
import { CookieBanner } from "@/components/CookieBanner";
import { AdBanner, AdGrid } from "@/components/AdBanner";
import { AIAssistant } from "@/components/AIAssistant";
import { InFeedAd, NativeAd } from "@/components/AdSenseAd";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { categories, CategoryId, popularTasks, professionFilters, TaskType, ProfessionType, aiGlossary, AITool } from "@/lib/tools-data";
import { useLanguage } from "@/contexts/LanguageContext";

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

// Category counts (static, based on known data)
const categoryCounts: Record<string, number> = {
  audio: 50,
  images: 500,
  video: 200,
  chat: 100,
  coding: 150,
  productivity: 400,
  presentations: 50,
  data: 100,
  "3d": 80,
  marketing: 300,
  research: 100,
};

export default function HomePage() {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<CategoryId>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTask, setActiveTask] = useState<TaskType | null>(null);
  const [activeProfession, setActiveProfession] = useState<ProfessionType | null>(null);
  
  // Client-side data fetching state
  const [tools, setTools] = useState<AITool[]>([]);
  const [featuredTools, setFeaturedTools] = useState<AITool[]>([]);
  const [trendingTools, setTrendingTools] = useState<AITool[]>([]);
  const [newestTools, setNewestTools] = useState<AITool[]>([]);
  const [topRatedTools, setTopRatedTools] = useState<AITool[]>([]);
  const [totalCount, setTotalCount] = useState(6367);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const toolsPerPage = 100; // Aumentado para mejor UX

  // Fetch tools from API
  const fetchTools = useCallback(async (pageNum: number, append: boolean = false) => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.set('page', pageNum.toString());
      params.set('limit', toolsPerPage.toString());
      if (activeCategory !== 'all') params.set('category', activeCategory);
      if (searchQuery) params.set('search', searchQuery);

      const response = await fetch(`/api/tools?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch tools');

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
      console.error('Failed to fetch tools:', err);
    } finally {
      setLoading(false);
    }
  }, [activeCategory, searchQuery]);

  // Fetch featured, trending, newest, top rated tools
  useEffect(() => {
    const fetchSpecialTools = async () => {
      try {
        const [featuredRes, trendingRes, newestRes, topRatedRes] = await Promise.all([
          fetch('/api/tools?featured=true&limit=8'),
          fetch('/api/tools?trending=true&limit=8'),
          fetch('/api/tools?newest=true&limit=12'),
          fetch('/api/tools?topRated=true&limit=12'),
        ]);

        if (featuredRes.ok) {
          const data = await featuredRes.json();
          setFeaturedTools(data.tools);
        }
        if (trendingRes.ok) {
          const data = await trendingRes.json();
          setTrendingTools(data.tools);
        }
        if (newestRes.ok) {
          const data = await newestRes.json();
          setNewestTools(data.tools);
        }
        if (topRatedRes.ok) {
          const data = await topRatedRes.json();
          setTopRatedTools(data.tools);
        }
      } catch (err) {
        console.error('Failed to fetch special tools:', err);
      }
    };

    fetchSpecialTools();
  }, []);

  // Fetch tools when filters change
  useEffect(() => {
    setPage(1);
    fetchTools(1);
  }, [activeCategory, searchQuery, fetchTools]);

  // Load more tools
  const loadMore = useCallback(() => {
    if (hasMore && !loading) {
      fetchTools(page + 1, true);
    }
  }, [hasMore, loading, page, fetchTools]);

  // Infinite scroll - auto load when near bottom
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1000 &&
        hasMore &&
        !loading
      ) {
        loadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, loading, loadMore]);

  // Filter tools by task/profession (client-side)
  const filteredTools = useMemo(() => {
    let result = tools;

    // Filter by task
    if (activeTask) {
      result = result.filter((tool) => {
        const task = popularTasks.find(t => t.id === activeTask);
        return task?.categories.includes(tool.category);
      });
    }

    // Filter by profession
    if (activeProfession) {
      result = result.filter((tool) => {
        const profession = professionFilters.find(p => p.id === activeProfession);
        return profession?.categories.includes(tool.category);
      });
    }

    return result;
  }, [tools, activeTask, activeProfession]);

  // Dynamic stats based on actual data - 2025-2026
  const stats = [
    { value: `${totalCount.toLocaleString()}+`, label: t.stats.tools, icon: Bot, color: "from-purple-500 to-pink-500" },
    { value: `${popularTasks.length}+`, label: language === "es" ? "Tareas" : "Tasks", icon: Settings, color: "from-blue-500 to-cyan-500" },
    { value: `${professionFilters.length}+`, label: language === "es" ? "Profesiones" : "Professions", icon: Users, color: "from-green-500 to-emerald-500" },
    { value: `${aiGlossary.length}+`, label: language === "es" ? "Términos IA" : "AI Terms", icon: Sparkles, color: "from-orange-500 to-yellow-500" },
  ];

  // Task icons mapping (50+ tasks)
  const taskIcons: Record<string, React.ReactNode> = {
    writing: <Pen className="w-5 h-5" />,
    "image-generation": <Palette className="w-5 h-5" />,
    "video-creation": <Video className="w-5 h-5" />,
    "code-generation": <Code className="w-5 h-5" />,
    "data-analysis": <LineChart className="w-5 h-5" />,
    "voice-synthesis": <Music className="w-5 h-5" />,
    translation: <Users className="w-5 h-5" />,
    summarization: <BarChart3 className="w-5 h-5" />,
    chatbots: <MessageSquare className="w-5 h-5" />,
    seo: <TrendingUp className="w-5 h-5" />,
    marketing: <Megaphone className="w-5 h-5" />,
    research: <Microscope className="w-5 h-5" />,
    "audio-editing": <Music className="w-5 h-5" />,
    "music-generation": <Music className="w-5 h-5" />,
    "image-editing": <Palette className="w-5 h-5" />,
    "logo-design": <Palette className="w-5 h-5" />,
    presentation: <Presentation className="w-5 h-5" />,
    "email-writing": <Pen className="w-5 h-5" />,
    "social-media": <Megaphone className="w-5 h-5" />,
    "content-creation": <Video className="w-5 h-5" />,
    copywriting: <Pen className="w-5 h-5" />,
    transcription: <Music className="w-5 h-5" />,
    "meeting-notes": <Pen className="w-5 h-5" />,
    "note-taking": <Pen className="w-5 h-5" />,
    "project-management": <Briefcase className="w-5 h-5" />,
    "customer-support": <MessageSquare className="w-5 h-5" />,
    sales: <TrendingUp className="w-5 h-5" />,
    "hr-recruiting": <Users className="w-5 h-5" />,
    education: <GraduationCap className="w-5 h-5" />,
    learning: <GraduationCap className="w-5 h-5" />,
    podcasting: <Music className="w-5 h-5" />,
    streaming: <Video className="w-5 h-5" />,
    gaming: <Video className="w-5 h-5" />,
    "3d-modeling": <Box className="w-5 h-5" />,
    animation: <Video className="w-5 h-5" />,
    "photo-enhancement": <Palette className="w-5 h-5" />,
    "background-removal": <Palette className="w-5 h-5" />,
    "avatar-creation": <Users className="w-5 h-5" />,
    "text-to-speech": <Music className="w-5 h-5" />,
    "speech-to-text": <Music className="w-5 h-5" />,
    "coding-assistant": <Code className="w-5 h-5" />,
    debugging: <Code className="w-5 h-5" />,
    "api-development": <Code className="w-5 h-5" />,
    "data-visualization": <LineChart className="w-5 h-5" />,
    "excel-spreadsheets": <BarChart3 className="w-5 h-5" />,
    "document-analysis": <BarChart3 className="w-5 h-5" />,
    legal: <Briefcase className="w-5 h-5" />,
    finance: <LineChart className="w-5 h-5" />,
    healthcare: <Heart className="w-5 h-5" />,
    "real-estate": <Briefcase className="w-5 h-5" />,
  };

  // Profession icons mapping (25+ professions)
  const professionIcons: Record<string, React.ReactNode> = {
    developers: <Code className="w-5 h-5" />,
    designers: <Palette className="w-5 h-5" />,
    marketers: <Megaphone className="w-5 h-5" />,
    writers: <Pen className="w-5 h-5" />,
    managers: <Briefcase className="w-5 h-5" />,
    students: <GraduationCap className="w-5 h-5" />,
    researchers: <Microscope className="w-5 h-5" />,
    creators: <Video className="w-5 h-5" />,
    entrepreneurs: <Briefcase className="w-5 h-5" />,
    teachers: <GraduationCap className="w-5 h-5" />,
    "healthcare-professionals": <Heart className="w-5 h-5" />,
    lawyers: <Briefcase className="w-5 h-5" />,
    accountants: <BarChart3 className="w-5 h-5" />,
    architects: <Box className="w-5 h-5" />,
    musicians: <Music className="w-5 h-5" />,
    photographers: <Palette className="w-5 h-5" />,
    videographers: <Video className="w-5 h-5" />,
    podcasters: <Music className="w-5 h-5" />,
    streamers: <Video className="w-5 h-5" />,
    gamers: <Video className="w-5 h-5" />,
    salespeople: <TrendingUp className="w-5 h-5" />,
    "hr-professionals": <Users className="w-5 h-5" />,
    recruiters: <Users className="w-5 h-5" />,
    "real-estate-agents": <Briefcase className="w-5 h-5" />,
    consultants: <Briefcase className="w-5 h-5" />,
    coaches: <Users className="w-5 h-5" />,
    agencies: <Briefcase className="w-5 h-5" />,
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Futuristic 2025-2026 Background - Optimized */}
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

      <main className="relative z-10">
        {/* Hero Section */}
        <section id="home" className="relative pt-32 pb-20 px-4">
          <div className="container mx-auto">
            <div className="text-center max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 mb-6"
              >
                <Badge className="bg-gradient-to-r from-cyan-500/20 via-violet-500/20 to-fuchsia-500/20 text-cyan-400 border-cyan-500/30 px-4 py-1.5 text-sm backdrop-blur-sm">
                  <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
                  {language === "es" ? "Directorio de IA #1 en Español • 2025" : "#1 AI Tools Directory • 2025"}
                  <span className="ml-2 w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                </Badge>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
              >
                <span className="text-foreground">{t.hero.title}</span>
                <br />
                <span className="neon-text-gradient">{t.hero.titleHighlight}</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
              >
                {t.hero.subtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-400 hover:to-violet-400 text-white px-8 font-medium neon-glow"
                >
                  <a href="#tools">
                    {t.hero.cta}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-border/50 hover:bg-card/50"
                >
                  <a href="https://ko-fi.com/ezequielia" target="_blank" rel="noopener noreferrer">
                    <Coffee className="w-5 h-5 mr-2" />
                    {t.nav.donate}
                  </a>
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="group relative p-4 rounded-2xl bg-card/60 dark:bg-card/40 backdrop-blur-sm border border-border/50 hover:border-cyan-500/40 transition-all duration-300 overflow-hidden"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                    <stat.icon className="w-6 h-6 text-cyan-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
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

        {/* Featured Tools Section */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                <Sparkles className="w-6 h-6 inline-block mr-2 text-cyan-400" />
                {language === "es" ? "Herramientas Destacadas" : "Featured Tools"}
              </h2>
              <p className="text-muted-foreground">
                {language === "es"
                  ? "Las mejores herramientas de IA seleccionadas por expertos"
                  : "The best AI tools handpicked by experts"}
              </p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {featuredTools.slice(0, 8).map((tool, index) => (
                <ToolCard key={tool.id} tool={tool} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Newest AIs Section */}
        <section className="py-12 px-4 bg-card/30 dark:bg-card/20">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                <Clock className="w-6 h-6 inline-block mr-2 text-emerald-400" />
                {language === "es" ? "Nuevas Herramientas de IA" : "Newest AI Tools"}
              </h2>
              <p className="text-muted-foreground">
                {language === "es"
                  ? "Las últimas herramientas de IA añadidas a nuestra colección"
                  : "The latest AI tools added to our collection"}
              </p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {newestTools.slice(0, 8).map((tool, index) => (
                <ToolCard key={tool.id} tool={tool} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Top Rated Section */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                <Star className="w-6 h-6 inline-block mr-2 text-amber-400" />
                {language === "es" ? "Mejor Valoradas" : "Top Rated AI Tools"}
              </h2>
              <p className="text-muted-foreground">
                {language === "es"
                  ? "Herramientas de IA con las mejores calificaciones de los usuarios"
                  : "AI tools with the highest user ratings"}
              </p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {topRatedTools.slice(0, 8).map((tool, index) => (
                <ToolCard key={tool.id} tool={tool} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Browse by Task Section */}
        <section className="py-12 px-4 bg-card/30 dark:bg-card/20">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                <Settings className="w-6 h-6 inline-block mr-2 text-cyan-400" />
                {language === "es" ? "Explorar por Tarea" : "Browse by Task"}
              </h2>
              <p className="text-muted-foreground">
                {language === "es"
                  ? "Encuentra herramientas de IA según lo que quieres lograr"
                  : "Find AI tools based on what you want to accomplish"}
              </p>
            </motion.div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {popularTasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -4 }}
                  onClick={() => {
                    setActiveTask(activeTask === task.id ? null : task.id);
                    setActiveProfession(null);
                    setActiveCategory("all");
                  }}
                  className="cursor-pointer"
                >
                  <Card className={`bg-card/60 dark:bg-card/40 backdrop-blur-sm border-border/50 hover:border-cyan-500/40 transition-all duration-300 overflow-hidden group ${activeTask === task.id ? 'border-cyan-500 ring-2 ring-cyan-500/20' : ''}`}>
                    <CardContent className="p-4 text-center">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-500/10 flex items-center justify-center text-xl mx-auto mb-2 group-hover:scale-110 transition-transform text-cyan-400">
                        {taskIcons[task.id]}
                      </div>
                      <h3 className="font-semibold text-sm">
                        {language === "es" ? task.nameEs : task.name}
                      </h3>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            {activeTask && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mt-6"
              >
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveTask(null)}
                >
                  <X className="w-4 h-4 mr-2" />
                  {language === "es" ? "Limpiar filtro" : "Clear filter"}
                </Button>
              </motion.div>
            )}
          </div>
        </section>

        {/* Browse by Profession Section */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                <Users className="w-6 h-6 inline-block mr-2 text-violet-400" />
                {language === "es" ? "Herramientas por Profesión" : "Tools by Profession"}
              </h2>
              <p className="text-muted-foreground">
                {language === "es"
                  ? "Herramientas de IA diseñadas para tu profesión"
                  : "AI tools designed for your profession"}
              </p>
            </motion.div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {professionFilters.map((profession, index) => (
                <motion.div
                  key={profession.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -4 }}
                  onClick={() => {
                    setActiveProfession(activeProfession === profession.id ? null : profession.id);
                    setActiveTask(null);
                    setActiveCategory("all");
                  }}
                  className="cursor-pointer"
                >
                  <Card className={`bg-card/60 dark:bg-card/40 backdrop-blur-sm border-border/50 hover:border-violet-500/40 transition-all duration-300 overflow-hidden group ${activeProfession === profession.id ? 'border-violet-500 ring-2 ring-violet-500/20' : ''}`}>
                    <CardContent className="p-4 text-center">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/10 flex items-center justify-center text-xl mx-auto mb-2 group-hover:scale-110 transition-transform text-violet-400">
                        {professionIcons[profession.id]}
                      </div>
                      <h3 className="font-semibold text-sm">
                        {language === "es" ? profession.nameEs : profession.name}
                      </h3>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            {activeProfession && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mt-6"
              >
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveProfession(null)}
                >
                  <X className="w-4 h-4 mr-2" />
                  {language === "es" ? "Limpiar filtro" : "Clear filter"}
                </Button>
              </motion.div>
            )}
          </div>
        </section>

        {/* Ad Banner - Featured */}
        <section className="py-8 px-4">
          <div className="container mx-auto">
            <AdBanner type="featured" />
          </div>
        </section>

        {/* Category Cards Section */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                {language === "es" ? "Explora por Categoría" : "Explore by Category"}
              </h2>
              <p className="text-muted-foreground">
                {language === "es"
                  ? "Encuentra la herramienta perfecta para tu necesidad"
                  : "Find the perfect tool for your need"}
              </p>
            </motion.div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {categories.slice(1).map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -4 }}
                  onClick={() => setActiveCategory(category.id)}
                  className="cursor-pointer"
                >
                  <Card className="bg-card/60 dark:bg-card/40 backdrop-blur-sm border-border/50 hover:border-cyan-500/40 transition-all duration-300 overflow-hidden group">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-500/10 flex items-center justify-center text-2xl mx-auto mb-3 group-hover:scale-110 transition-transform text-cyan-400">
                        {category.icon}
                      </div>
                      <h3 className="font-semibold text-sm mb-1">
                        {t.categories[category.id as keyof typeof t.categories]}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {categoryCounts[category.id] || 100}{" "}
                        {language === "es" ? "herramientas" : "tools"}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Tools Section */}
        <section id="tools" className="py-16 px-4">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t.nav.tools}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {language === "es"
                  ? "Descubre nuestra colección completa de herramientas de IA"
                  : "Discover our complete collection of AI tools"}
              </p>
            </motion.div>

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
                    {filteredTools.length}{" "}
                    {language === "es" ? "resultados para" : "results for"} "
                    {searchQuery}"
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="w-4 h-4 mr-1" />
                    {t.search.clearFilters}
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Tools Counter */}
            <div className="text-center mb-6">
              <Badge variant="outline" className="text-sm py-2 px-4 border-cyan-500/30">
                <Bot className="w-4 h-4 mr-2 text-cyan-400" />
                {language === "es" 
                  ? `Mostrando ${filteredTools.length.toLocaleString()} de ${totalCount.toLocaleString()} herramientas`
                  : `Showing ${filteredTools.length.toLocaleString()} of ${totalCount.toLocaleString()} tools`}
                {hasMore && <Loader2 className="w-4 h-4 ml-2 animate-spin text-cyan-400" />}
              </Badge>
            </div>

            {/* Tools Grid */}
            {loading && tools.length === 0 ? (
              <div className="flex justify-center items-center py-16">
                <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
              </div>
            ) : filteredTools.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredTools.flatMap((tool, index) => [
                    // Insert ad every 16 tools
                    ...(index > 0 && index % 16 === 0 ? [<InFeedAd key={`ad-${index}`} index={index} />] : []),
                    <ToolCard key={tool.id} tool={tool} index={index} />
                  ])}
                  
                  {/* Native Ad at the end */}
                  {filteredTools.length > 20 && (
                    <NativeAd key="native-ad-end" />
                  )}
                </div>
                
                {/* Loading indicator at bottom */}
                {loading && tools.length > 0 && (
                  <div className="flex justify-center items-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin text-cyan-400 mr-2" />
                    <span className="text-muted-foreground">
                      {language === "es" ? "Cargando más herramientas..." : "Loading more tools..."}
                    </span>
                  </div>
                )}
                
                {/* Load More Button (backup for users who prefer clicking) */}
                {hasMore && !loading && (
                  <div className="text-center mt-8">
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={loadMore}
                      className="border-cyan-500/30 hover:bg-cyan-500/10"
                    >
                      {language === "es" ? "Cargar más herramientas" : "Load more tools"}
                    </Button>
                  </div>
                )}
                
                {/* End of list indicator */}
                {!hasMore && tools.length > 0 && (
                  <div className="text-center mt-8 py-4">
                    <Badge className="bg-gradient-to-r from-cyan-500/20 to-violet-500/20 text-cyan-400 border-cyan-500/30">
                      <Sparkles className="w-4 h-4 mr-2" />
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
                <Search className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
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
          </div>
        </section>

        {/* Trending Tools */}
        <section className="py-12 px-4 bg-card/30 dark:bg-card/20">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                <TrendingUp className="w-6 h-6 inline-block mr-2 text-fuchsia-400" />
                {language === "es" ? "Tendencias" : "Trending Now"}
              </h2>
              <p className="text-muted-foreground">
                {language === "es"
                  ? "Herramientas de IA que están ganando popularidad"
                  : "AI tools that are gaining popularity"}
              </p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {trendingTools.slice(0, 8).map((tool, index) => (
                <ToolCard key={tool.id} tool={tool} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* AI Glossary Section */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                <Sparkles className="w-6 h-6 inline-block mr-2 text-cyan-400" />
                {language === "es" ? "Glosario de IA" : "AI Glossary"}
              </h2>
              <p className="text-muted-foreground">
                {language === "es"
                  ? "Aprende los términos clave de inteligencia artificial"
                  : "Learn key artificial intelligence terms"}
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
              {aiGlossary.slice(0, 12).map((item, index) => (
                <motion.div
                  key={item.term}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="bg-card/60 dark:bg-card/40 backdrop-blur-sm border-border/50 hover:border-cyan-500/40 transition-all duration-300 h-full">
                    <CardContent className="p-4">
                      <h3 className="font-bold text-cyan-400 mb-2">{item.term}</h3>
                      <p className="text-sm text-muted-foreground">
                        {language === "es" ? item.definitionEs : item.definition}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Amazon Ads Grid */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                {language === "es" ? "Recursos Recomendados" : "Recommended Resources"}
              </h2>
              <p className="text-muted-foreground">
                {language === "es"
                  ? "Productos de Amazon para potenciar tu aprendizaje en IA"
                  : "Amazon products to boost your AI learning"}
              </p>
            </motion.div>
            <AdGrid />
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Avatar className="w-24 h-24 mx-auto mb-6 border-4 border-cyan-500/30">
                <AvatarImage src="/avatar.png" alt="WORLD.IA" />
                <AvatarFallback>EG</AvatarFallback>
              </Avatar>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {language === "es" ? "Sobre Mí" : "About Me"}
              </h2>
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                {language === "es"
                  ? "¡Hola! Soy Ezequiel Gonzalez, creador de contenido especializado en Inteligencia Artificial. Mi misión es ayudarte a descubrir y dominar las mejores herramientas de IA para potenciar tu productividad y creatividad."
                  : "Hi! I'm Ezequiel Gonzalez, a content creator specialized in Artificial Intelligence. My mission is to help you discover and master the best AI tools to boost your productivity and creativity."}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  asChild
                  className="bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-400 hover:to-violet-400 text-white font-medium neon-glow"
                >
                  <a
                    href="https://ko-fi.com/ezequielia"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Coffee className="w-5 h-5 mr-2" />
                    {t.nav.donate}
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-4 bg-card/30 dark:bg-card/20">
          <div className="container mx-auto max-w-2xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t.footer.contact}
              </h2>
              <p className="text-muted-foreground mb-6">
                {language === "es"
                  ? "¿Tienes alguna pregunta o sugerencia? ¡Me encantaría escucharte!"
                  : "Have any questions or suggestions? I'd love to hear from you!"}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  asChild
                  className="bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-400 hover:to-violet-400 text-white font-medium neon-glow"
                >
                  <a href="https://www.instagram.com/m.ezequiel.gonzalez/" target="_blank" rel="noopener noreferrer">
                    Instagram
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-border/50 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/50"
                >
                  <a href="https://www.youtube.com/@Mat%C3%ADasEzequielGonz%C3%A1lez-d4d6v" target="_blank" rel="noopener noreferrer">
                    YouTube
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-cyan-500/30 hover:bg-cyan-500/10 hover:text-cyan-400 hover:border-cyan-500/50"
                >
                  <a href="https://x.com/MGonzalez85598" target="_blank" rel="noopener noreferrer">
                    X (Twitter)
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-cyan-500/30 hover:bg-blue-500/10 hover:text-blue-400 hover:border-blue-500/50"
                >
                  <a href="https://www.linkedin.com/in/matiasezequielgonzalez/" target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
      <CookieBanner />
      <AIAssistant />
    </div>
  );
}
