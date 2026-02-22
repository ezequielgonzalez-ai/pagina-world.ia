"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Heart,
  History,
  Settings,
  LogOut,
  ChevronDown,
  Star,
  Bookmark,
  Bell,
  CreditCard,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";

interface UserProfile {
  name: string;
  email: string;
  avatar?: string;
  favoritesCount: number;
  historyCount: number;
}

const LOCAL_STORAGE_KEY = "worldia_profile";

const defaultProfile: UserProfile = {
  name: "Usuario",
  email: "usuario@ejemplo.com",
  favoritesCount: 0,
  historyCount: 0,
};

export function ProfileDropdown() {
  const { language } = useLanguage();
  const { user, isAuthenticated, logout } = useAuth();

  // Initialize profile from localStorage and auth data
  const getInitialProfile = (): UserProfile => {
    if (typeof window === 'undefined') return defaultProfile;
    
    const savedProfile = localStorage.getItem(LOCAL_STORAGE_KEY);
    let storedProfile = defaultProfile;
    
    if (savedProfile) {
      try {
        storedProfile = { ...defaultProfile, ...JSON.parse(savedProfile) };
      } catch {
        // use default
      }
    }

    // If user is authenticated, use auth data
    if (user) {
      return {
        ...storedProfile,
        name: user.name || storedProfile.name,
        email: user.email || storedProfile.email,
        avatar: user.avatar || storedProfile.avatar,
      };
    }
    
    return storedProfile;
  };

  const [profile, setProfile] = useState<UserProfile>(getInitialProfile);
  const [isOpen, setIsOpen] = useState(false);

  const saveProfile = (newProfile: Partial<UserProfile>) => {
    const updated = { ...profile, ...newProfile };
    setProfile(updated);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  };

  const menuItems = [
    {
      icon: User,
      label: language === "es" ? "Mi Perfil" : "My Profile",
      href: "/perfil",
      description: language === "es" ? "Ver y editar perfil" : "View and edit profile",
    },
    {
      icon: Heart,
      label: language === "es" ? "Favoritos" : "Favorites",
      href: "/favoritos",
      description: language === "es" ? "Herramientas guardadas" : "Saved tools",
      badge: profile.favoritesCount > 0 ? profile.favoritesCount.toString() : undefined,
    },
    {
      icon: History,
      label: language === "es" ? "Historial" : "History",
      href: "/historial",
      description: language === "es" ? "Actividad reciente" : "Recent activity",
      badge: profile.historyCount > 0 ? profile.historyCount.toString() : undefined,
    },
    {
      icon: Bookmark,
      label: language === "es" ? "Colecciones" : "Collections",
      href: "/colecciones",
      description: language === "es" ? "Tus colecciones" : "Your collections",
    },
    {
      icon: Bell,
      label: language === "es" ? "Notificaciones" : "Notifications",
      href: "/notificaciones",
      description: language === "es" ? "Alertas y avisos" : "Alerts and notices",
    },
    {
      icon: CreditCard,
      label: language === "es" ? "Suscripción" : "Subscription",
      href: "/suscripcion",
      description: language === "es" ? "Planes y pagos" : "Plans and payments",
    },
    {
      icon: Settings,
      label: language === "es" ? "Configuración" : "Settings",
      href: "/configuracion",
      description: language === "es" ? "Preferencias de cuenta" : "Account preferences",
    },
    {
      icon: HelpCircle,
      label: language === "es" ? "Ayuda" : "Help",
      href: "/ayuda",
      description: language === "es" ? "Centro de ayuda" : "Help center",
    },
  ];

  const initials = profile.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-auto p-1.5 rounded-full hover:bg-accent/50 transition-all duration-300 group"
        >
          <div className="relative">
            <Avatar className="h-9 w-9 border-2 border-transparent group-hover:border-primary/50 transition-all duration-300">
              <AvatarImage src={profile.avatar} alt={profile.name} />
              <AvatarFallback className="bg-gradient-to-br from-primary via-purple-500 to-pink-500 text-white font-semibold text-sm">
                {initials}
              </AvatarFallback>
            </Avatar>
            {/* Online indicator */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-background rounded-full"
            >
              <motion.div
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-full h-full bg-green-500 rounded-full"
              />
            </motion.div>
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-80 p-0 profile-dropdown"
        align="end"
        sideOffset={8}
      >
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {/* Profile Header */}
              <div className="p-4 bg-gradient-to-br from-primary/10 via-purple-500/5 to-pink-500/10 dark:from-primary/5 dark:via-purple-500/5 dark:to-pink-500/5">
                <div className="flex items-center gap-3">
                  <Avatar className="h-14 w-14 border-2 border-primary/20">
                    <AvatarImage src={profile.avatar} alt={profile.name} />
                    <AvatarFallback className="bg-gradient-to-br from-primary via-purple-500 to-pink-500 text-white font-bold text-lg">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground truncate">
                      {profile.name}
                    </h3>
                    <p className="text-sm text-muted-foreground truncate">
                      {profile.email}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <Badge
                        variant="secondary"
                        className="text-xs bg-primary/10 text-primary hover:bg-primary/20"
                      >
                        <Star className="w-3 h-3 mr-1" />
                        {language === "es" ? "Miembro Pro" : "Pro Member"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-1 p-2 bg-muted/30">
                <div className="text-center p-2 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
                  <div className="text-lg font-bold text-foreground">
                    {profile.favoritesCount}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {language === "es" ? "Favoritos" : "Favorites"}
                  </div>
                </div>
                <div className="text-center p-2 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
                  <div className="text-lg font-bold text-foreground">
                    {profile.historyCount}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {language === "es" ? "Vistas" : "Views"}
                  </div>
                </div>
                <div className="text-center p-2 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
                  <div className="text-lg font-bold text-foreground">
                    {language === "es" ? "∞" : "∞"}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {language === "es" ? "Créditos" : "Credits"}
                  </div>
                </div>
              </div>

              <DropdownMenuSeparator />

              {/* Menu Items */}
              <DropdownMenuGroup className="p-1">
                {menuItems.slice(0, 4).map((item) => (
                  <DropdownMenuItem
                    key={item.href}
                    asChild
                    className="flex items-center gap-3 p-3 cursor-pointer rounded-lg hover:bg-accent/50 focus:bg-accent/50 transition-colors"
                  >
                    <a href={item.href}>
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                        <item.icon className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{item.label}</span>
                          {item.badge && (
                            <Badge
                              variant="secondary"
                              className="text-xs bg-primary/10 text-primary"
                            >
                              {item.badge}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuGroup className="p-1">
                {menuItems.slice(4).map((item) => (
                  <DropdownMenuItem
                    key={item.href}
                    asChild
                    className="flex items-center gap-3 p-2.5 cursor-pointer rounded-lg hover:bg-accent/50 focus:bg-accent/50 transition-colors"
                  >
                    <a href={item.href}>
                      <item.icon className="w-4 h-4 text-muted-foreground" />
                      <span>{item.label}</span>
                    </a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              {/* Logout */}
              <div className="p-1">
                <DropdownMenuItem
                  onClick={() => logout()}
                  className="flex items-center gap-3 p-3 cursor-pointer rounded-lg hover:bg-red-500/10 focus:bg-red-500/10 text-red-500 transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-red-500/10 flex items-center justify-center">
                    <LogOut className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-medium">
                      {language === "es" ? "Cerrar Sesión" : "Sign Out"}
                    </span>
                    <p className="text-xs text-muted-foreground">
                      {language === "es"
                        ? "Salir de tu cuenta"
                        : "Sign out of your account"}
                    </p>
                  </div>
                </DropdownMenuItem>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
