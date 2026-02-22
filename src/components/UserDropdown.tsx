"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Settings, LogOut, Heart, Image, MessageSquare, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface UserDropdownProps {
  onOpenAuth: (mode: "login" | "register") => void;
}

export function UserDropdown({ onOpenAuth }: UserDropdownProps) {
  const { user, isLoading, logout } = useAuth();
  const { language } = useLanguage();

  if (isLoading) {
    return (
      <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
    );
  }

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onOpenAuth("login")}
          className="hidden sm:flex"
        >
          {language === "es" ? "Iniciar Sesión" : "Sign In"}
        </Button>
        <Button
          size="sm"
          onClick={() => onOpenAuth("register")}
          className="bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90 text-white"
        >
          {language === "es" ? "Registrarse" : "Sign Up"}
        </Button>
      </div>
    );
  }

  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : user.email.slice(0, 2).toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 px-2 hover:bg-accent"
        >
          <Avatar className="w-8 h-8 border-2 border-primary/20">
            <AvatarImage src={user.avatar || undefined} alt={user.name || user.email} />
            <AvatarFallback className="bg-gradient-to-br from-primary to-blue-500 text-white text-sm">
              {initials}
            </AvatarFallback>
          </Avatar>
          <span className="hidden md:block max-w-[100px] truncate text-sm font-medium">
            {user.name || user.email.split("@")[0]}
          </span>
          <ChevronDown className="w-4 h-4 text-muted-foreground hidden md:block" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">{user.name || "User"}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <User className="w-4 h-4 mr-2" />
          {language === "es" ? "Mi Perfil" : "My Profile"}
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <Image className="w-4 h-4 mr-2" />
          {language === "es" ? "Mis Imágenes" : "My Images"}
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <Heart className="w-4 h-4 mr-2" />
          {language === "es" ? "Favoritos" : "Favorites"}
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <MessageSquare className="w-4 h-4 mr-2" />
          {language === "es" ? "Mis Conversaciones" : "My Conversations"}
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <Settings className="w-4 h-4 mr-2" />
          {language === "es" ? "Configuración" : "Settings"}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer text-red-500 focus:text-red-500"
          onClick={logout}
        >
          <LogOut className="w-4 h-4 mr-2" />
          {language === "es" ? "Cerrar Sesión" : "Sign Out"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
