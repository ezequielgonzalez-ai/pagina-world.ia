"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Coffee, Search, Home, Grid, ShoppingBag, Trophy, BookOpen, User, LogOut, Settings, Sparkles, Palette, Code, Video, MessageSquare, LogIn, Clock, Star, Send, Users, Layers, BookMarked } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ProfileDropdown } from "./ProfileDropdown";
import { SettingsPanel } from "./SettingsPanel";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { AuthModal } from "./AuthModal";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";

interface NavbarProps {
  onSearch?: (query: string) => void;
  searchQuery?: string;
}

export function Navbar({ onSearch, searchQuery = "" }: NavbarProps) {
  const { t, language } = useLanguage();
  const { user, isAuthenticated, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  const handleSearchChange = (value: string) => {
    setLocalSearch(value);
    onSearch?.(value);
  };

  const navLinks = [
    { href: "/", label: language === "es" ? "Inicio" : "Home", icon: Home },
    { href: "/#tools", label: language === "es" ? "Directorio IA" : "AI Directory", icon: Grid },
    { href: "/tienda", label: language === "es" ? "Tienda" : "Store", icon: ShoppingBag },
    { href: "/rankings", label: language === "es" ? "Rankings" : "Rankings", icon: Trophy },
    { href: "/aprende", label: language === "es" ? "Aprende" : "Learn", icon: BookOpen },
  ];

  const createLinks = [
    { href: "/crear/imagenes", label: language === "es" ? "Generar Imágenes" : "Generate Images", icon: Palette, desc: language === "es" ? "IA para crear imágenes" : "AI image creation" },
    { href: "/crear/codigo", label: language === "es" ? "Asistente de Código" : "Code Assistant", icon: Code, desc: language === "es" ? "Escribe y depura código" : "Write and debug code" },
    { href: "/prompts", label: language === "es" ? "Prompt Packs" : "Prompt Packs", icon: Sparkles, desc: language === "es" ? "Prompts optimizados" : "Optimized prompts" },
  ];

  const exploreLinks = [
    { href: "/tasks", label: language === "es" ? "Tareas de IA" : "AI Tasks", icon: Layers, desc: language === "es" ? "Tareas organizadas A-Z" : "Tasks organized A-Z" },
    { href: "/jobs", label: language === "es" ? "Por Profesión" : "By Profession", icon: Users, desc: language === "es" ? "Herramientas por trabajo" : "Tools by job" },
    { href: "/glossary", label: language === "es" ? "Glosario" : "Glossary", icon: BookMarked, desc: language === "es" ? "Términos de IA" : "AI terms" },
    { href: "/new", label: language === "es" ? "Nuevos Lanzamientos" : "Just Released", icon: Clock, desc: language === "es" ? "Últimas herramientas" : "Latest tools" },
    { href: "/top-rated", label: language === "es" ? "Mejor Valoradas" : "Top Rated", icon: Star, desc: language === "es" ? "Mejor puntuación" : "Highest rated" },
    { href: "/submit", label: language === "es" ? "Enviar Herramienta" : "Submit Tool", icon: Send, desc: language === "es" ? "Añade tu herramienta" : "Add your tool" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-background/80 dark:bg-background/60 backdrop-blur-xl shadow-lg border-b border-border/50"
            : "bg-transparent"
        }`}
      >
        <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#home"
            className="flex items-center gap-3 group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative">
              <Avatar className="w-10 h-10 border-2 border-primary/20 group-hover:border-primary/50 transition-colors">
                <AvatarImage src="/avatar.png" alt="WORLD.IA" />
                <AvatarFallback>WI</AvatarFallback>
              </Avatar>
              <motion.div
                className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-500/30 to-violet-500/30 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ zIndex: -1 }}
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-bold text-lg neon-text-gradient">
                WORLD.IA
              </h1>
            </div>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Nav Links */}
            {navLinks.slice(0, 2).map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
                whileHover={{ y: -1 }}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}

            {/* Create Dropdown */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-sm font-medium text-muted-foreground hover:text-foreground data-[state=open]:text-foreground">
                    {language === "es" ? "Crear" : "Create"}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[280px] gap-1 p-2">
                      {createLinks.map((link) => (
                        <li key={link.href}>
                          <NavigationMenuLink asChild>
                            <a
                              href={link.href}
                              className="flex items-center gap-3 select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                <link.icon className="w-4 h-4 text-primary" />
                              </div>
                              <div>
                                <div className="text-sm font-medium leading-none">{link.label}</div>
                                <p className="text-xs text-muted-foreground mt-1">{link.desc}</p>
                              </div>
                            </a>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Explore Dropdown */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-sm font-medium text-muted-foreground hover:text-foreground data-[state=open]:text-foreground">
                    {language === "es" ? "Explorar" : "Explore"}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[320px] gap-1 p-2">
                      {exploreLinks.map((link) => (
                        <li key={link.href}>
                          <NavigationMenuLink asChild>
                            <a
                              href={link.href}
                              className="flex items-center gap-3 select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                <link.icon className="w-4 h-4 text-primary" />
                              </div>
                              <div>
                                <div className="text-sm font-medium leading-none">{link.label}</div>
                                <p className="text-xs text-muted-foreground mt-1">{link.desc}</p>
                              </div>
                            </a>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* More Links */}
            {navLinks.slice(2).map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
                whileHover={{ y: -1 }}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Search */}
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              className="relative"
            >
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t.nav.search}
                value={localSearch}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-9 w-48 bg-card/50 dark:bg-card/30 border-border/50 focus:border-primary/50 transition-all"
              />
            </motion.div>

            {/* Ko-fi Button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                size="sm"
                className="bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-400 hover:to-violet-400 text-white font-medium neon-glow"
              >
                <a
                  href="https://ko-fi.com/ezequielia"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Coffee className="w-4 h-4 mr-2" />
                  {t.nav.donate}
                </a>
              </Button>
            </motion.div>

            {/* Theme & Language Toggles */}
            <div className="flex items-center gap-1">
              <LanguageSwitcher />
              <ThemeToggle />
              <SettingsPanel />
            </div>

            {/* Auth */}
            {isAuthenticated ? (
              <ProfileDropdown />
            ) : (
              <Button
                onClick={() => setAuthModalOpen(true)}
                variant="outline"
                size="sm"
                className="border-cyan-500/50 hover:bg-cyan-500/10 hover:text-cyan-400"
              >
                <LogIn className="w-4 h-4 mr-2" />
                {language === "es" ? "Ingresar" : "Sign In"}
              </Button>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="flex lg:hidden items-center gap-2">
            <SettingsPanel />
            <LanguageSwitcher />
            <ThemeToggle />
            {isAuthenticated && (
              <ProfileDropdown />
            )}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[350px]">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src="/avatar.png" alt="WORLD.IA" />
                      <AvatarFallback>WI</AvatarFallback>
                    </Avatar>
                    WORLD.IA
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-8 flex flex-col gap-4">
                  {/* Mobile Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder={t.nav.search}
                      value={localSearch}
                      onChange={(e) => handleSearchChange(e.target.value)}
                      className="pl-9 w-full"
                    />
                  </div>

                  {/* Mobile Nav Links */}
                  {navLinks.map((link, index) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                    >
                      <link.icon className="w-5 h-5 text-primary" />
                      <span className="font-medium">{link.label}</span>
                    </motion.a>
                  ))}

                  {/* Create Section */}
                  <div className="pt-2 border-t border-border/50">
                    <p className="text-xs text-muted-foreground px-3 mb-2">
                      {language === "es" ? "CREAR" : "CREATE"}
                    </p>
                    {createLinks.map((link, index) => (
                      <motion.a
                        key={link.href}
                        href={link.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (navLinks.length + index) * 0.1 }}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                      >
                        <link.icon className="w-5 h-5 text-primary" />
                        <span className="font-medium">{link.label}</span>
                      </motion.a>
                    ))}
                  </div>

                  {/* Explore Section */}
                  <div className="pt-2 border-t border-border/50">
                    <p className="text-xs text-muted-foreground px-3 mb-2">
                      {language === "es" ? "EXPLORAR" : "EXPLORE"}
                    </p>
                    {exploreLinks.map((link, index) => (
                      <motion.a
                        key={link.href}
                        href={link.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (navLinks.length + createLinks.length + index) * 0.1 }}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                      >
                        <link.icon className="w-5 h-5 text-primary" />
                        <span className="font-medium">{link.label}</span>
                      </motion.a>
                    ))}
                  </div>

                  {/* Mobile Auth */}
                  {!isAuthenticated ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="pt-4"
                    >
                      <Button
                        onClick={() => setAuthModalOpen(true)}
                        className="w-full bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-400 hover:to-violet-400 font-medium"
                      >
                        <LogIn className="w-4 h-4 mr-2" />
                        {language === "es" ? "Ingresar / Registrarse" : "Sign In / Sign Up"}
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="pt-4"
                    >
                      <Button
                        onClick={logout}
                        variant="outline"
                        className="w-full text-red-500 border-red-500/50"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        {language === "es" ? "Cerrar Sesión" : "Sign Out"}
                      </Button>
                    </motion.div>
                  )}

                  {/* Mobile Ko-fi Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-4"
                  >
                    <Button
                      asChild
                      className="w-full bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-400 hover:to-violet-400 text-white font-medium"
                    >
                      <a
                        href="https://ko-fi.com/ezequielia"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Coffee className="w-4 h-4 mr-2" />
                        {t.nav.donate}
                      </a>
                    </Button>
                  </motion.div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </motion.header>

      {/* Auth Modal */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  );
}
