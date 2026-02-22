"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Settings,
  X,
  Sun,
  Moon,
  Monitor,
  Globe,
  Bell,
  BellOff,
  Shield,
  Palette,
  Volume2,
  VolumeX,
  Eye,
  EyeOff,
  Trash2,
  Download,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "next-themes";

interface UserSettings {
  theme: "light" | "dark" | "system";
  language: "es" | "en";
  notifications: boolean;
  soundEffects: boolean;
  animations: boolean;
  dataCollection: boolean;
  marketingEmails: boolean;
  compactMode: boolean;
  showTrending: boolean;
}

const LOCAL_STORAGE_KEY = "worldia_settings";

const defaultSettings: UserSettings = {
  theme: "system",
  language: "es",
  notifications: true,
  soundEffects: true,
  animations: true,
  dataCollection: false,
  marketingEmails: false,
  compactMode: false,
  showTrending: true,
};

// Initialize settings from localStorage
const getInitialSettings = (): UserSettings => {
  if (typeof window === 'undefined') return defaultSettings;
  
  const savedSettings = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (savedSettings) {
    try {
      return { ...defaultSettings, ...JSON.parse(savedSettings) };
    } catch {
      return defaultSettings;
    }
  }
  return defaultSettings;
};

export function SettingsPanel() {
  const { language: currentLanguage, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const [settings, setSettings] = useState<UserSettings>(getInitialSettings);
  const [isOpen, setIsOpen] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    // Sync language setting with global context
    if (settings.language !== currentLanguage) {
      setLanguage(settings.language);
    }
  }, [settings.language, currentLanguage, setLanguage]);

  useEffect(() => {
    // Sync theme setting with next-themes
    if (settings.theme && theme) {
      setTheme(settings.theme);
    }
  }, [settings.theme, setTheme]);

  const updateSetting = <K extends keyof UserSettings>(
    key: K,
    value: UserSettings[K]
  ) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newSettings));
    setHasChanges(true);
  };

  const resetToDefaults = () => {
    setSettings(defaultSettings);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(defaultSettings));
    setTheme(defaultSettings.theme);
    setLanguage(defaultSettings.language);
    setHasChanges(false);
  };

  const exportSettings = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    const exportFileDefaultName = "worldia-settings.json";
    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  const themeOptions = [
    {
      value: "light",
      label: currentLanguage === "es" ? "Claro" : "Light",
      icon: Sun,
      description: currentLanguage === "es" ? "Tema claro" : "Light theme",
    },
    {
      value: "dark",
      label: currentLanguage === "es" ? "Oscuro" : "Dark",
      icon: Moon,
      description: currentLanguage === "es" ? "Tema oscuro" : "Dark theme",
    },
    {
      value: "system",
      label: currentLanguage === "es" ? "Sistema" : "System",
      icon: Monitor,
      description:
        currentLanguage === "es"
          ? "Seguir preferencias del sistema"
          : "Follow system preferences",
    },
  ];

  const languageOptions = [
    {
      value: "es",
      label: "Español",
      flag: "🇪🇸",
      description: "Español",
    },
    {
      value: "en",
      label: "English",
      flag: "🇺🇸",
      description: "English",
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative rounded-full hover:bg-accent/50 transition-all duration-300 group"
        >
          <Settings className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
          <motion.span
            className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto settings-panel">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Settings className="w-5 h-5 text-primary" />
            {currentLanguage === "es" ? "Configuración" : "Settings"}
          </DialogTitle>
        </DialogHeader>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="space-y-6 py-4"
            >
              {/* Appearance Section */}
              <section>
                <h3 className="flex items-center gap-2 text-sm font-semibold text-muted-foreground mb-4">
                  <Palette className="w-4 h-4" />
                  {currentLanguage === "es" ? "Apariencia" : "Appearance"}
                </h3>

                <div className="space-y-4">
                  {/* Theme Selection */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">
                      {currentLanguage === "es" ? "Tema" : "Theme"}
                    </Label>
                    <div className="grid grid-cols-3 gap-2">
                      {themeOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() =>
                            updateSetting(
                              "theme",
                              option.value as UserSettings["theme"]
                            )
                          }
                          className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-300 ${
                            settings.theme === option.value
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border hover:border-primary/50 hover:bg-accent/50"
                          }`}
                        >
                          <option.icon className="w-6 h-6" />
                          <span className="text-sm font-medium">
                            {option.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Animations Toggle */}
                  <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-medium flex items-center gap-2">
                        {currentLanguage === "es"
                          ? "Animaciones"
                          : "Animations"}
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        {currentLanguage === "es"
                          ? "Habilitar efectos de animación"
                          : "Enable animation effects"}
                      </p>
                    </div>
                    <Switch
                      checked={settings.animations}
                      onCheckedChange={(checked) =>
                        updateSetting("animations", checked)
                      }
                    />
                  </div>

                  {/* Compact Mode */}
                  <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-medium flex items-center gap-2">
                        {currentLanguage === "es"
                          ? "Modo Compacto"
                          : "Compact Mode"}
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        {currentLanguage === "es"
                          ? "Reducir espaciado en la interfaz"
                          : "Reduce interface spacing"}
                      </p>
                    </div>
                    <Switch
                      checked={settings.compactMode}
                      onCheckedChange={(checked) =>
                        updateSetting("compactMode", checked)
                      }
                    />
                  </div>
                </div>
              </section>

              <Separator />

              {/* Language Section */}
              <section>
                <h3 className="flex items-center gap-2 text-sm font-semibold text-muted-foreground mb-4">
                  <Globe className="w-4 h-4" />
                  {currentLanguage === "es" ? "Idioma" : "Language"}
                </h3>

                <div className="grid grid-cols-2 gap-2">
                  {languageOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() =>
                        updateSetting(
                          "language",
                          option.value as UserSettings["language"]
                        )
                      }
                      className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-300 ${
                        settings.language === option.value
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border hover:border-primary/50 hover:bg-accent/50"
                      }`}
                    >
                      <span className="text-2xl">{option.flag}</span>
                      <div className="text-left">
                        <div className="font-medium">{option.label}</div>
                        <div className="text-xs text-muted-foreground">
                          {option.description}
                        </div>
                      </div>
                      {settings.language === option.value && (
                        <Check className="w-5 h-5 ml-auto" />
                      )}
                    </button>
                  ))}
                </div>
              </section>

              <Separator />

              {/* Notifications Section */}
              <section>
                <h3 className="flex items-center gap-2 text-sm font-semibold text-muted-foreground mb-4">
                  <Bell className="w-4 h-4" />
                  {currentLanguage === "es"
                    ? "Notificaciones"
                    : "Notifications"}
                </h3>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-medium flex items-center gap-2">
                        {settings.notifications ? (
                          <Bell className="w-4 h-4 text-primary" />
                        ) : (
                          <BellOff className="w-4 h-4 text-muted-foreground" />
                        )}
                        {currentLanguage === "es"
                          ? "Notificaciones Push"
                          : "Push Notifications"}
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        {currentLanguage === "es"
                          ? "Recibir notificaciones del navegador"
                          : "Receive browser notifications"}
                      </p>
                    </div>
                    <Switch
                      checked={settings.notifications}
                      onCheckedChange={(checked) =>
                        updateSetting("notifications", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-medium flex items-center gap-2">
                        {settings.soundEffects ? (
                          <Volume2 className="w-4 h-4 text-primary" />
                        ) : (
                          <VolumeX className="w-4 h-4 text-muted-foreground" />
                        )}
                        {currentLanguage === "es"
                          ? "Efectos de Sonido"
                          : "Sound Effects"}
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        {currentLanguage === "es"
                          ? "Reproducir sonidos en la interfaz"
                          : "Play interface sounds"}
                      </p>
                    </div>
                    <Switch
                      checked={settings.soundEffects}
                      onCheckedChange={(checked) =>
                        updateSetting("soundEffects", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-medium flex items-center gap-2">
                        {settings.marketingEmails ? (
                          <Eye className="w-4 h-4 text-primary" />
                        ) : (
                          <EyeOff className="w-4 h-4 text-muted-foreground" />
                        )}
                        {currentLanguage === "es"
                          ? "Correos de Marketing"
                          : "Marketing Emails"}
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        {currentLanguage === "es"
                          ? "Recibir novedades y ofertas"
                          : "Receive news and offers"}
                      </p>
                    </div>
                    <Switch
                      checked={settings.marketingEmails}
                      onCheckedChange={(checked) =>
                        updateSetting("marketingEmails", checked)
                      }
                    />
                  </div>
                </div>
              </section>

              <Separator />

              {/* Privacy Section */}
              <section>
                <h3 className="flex items-center gap-2 text-sm font-semibold text-muted-foreground mb-4">
                  <Shield className="w-4 h-4" />
                  {currentLanguage === "es" ? "Privacidad" : "Privacy"}
                </h3>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-medium">
                        {currentLanguage === "es"
                          ? "Recopilación de Datos"
                          : "Data Collection"}
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        {currentLanguage === "es"
                          ? "Permitir recopilación de datos anónimos para mejorar la experiencia"
                          : "Allow anonymous data collection to improve experience"}
                      </p>
                    </div>
                    <Switch
                      checked={settings.dataCollection}
                      onCheckedChange={(checked) =>
                        updateSetting("dataCollection", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-medium">
                        {currentLanguage === "es"
                          ? "Mostrar Tendencias"
                          : "Show Trending"}
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        {currentLanguage === "es"
                          ? "Mostrar sección de herramientas en tendencia"
                          : "Show trending tools section"}
                      </p>
                    </div>
                    <Switch
                      checked={settings.showTrending}
                      onCheckedChange={(checked) =>
                        updateSetting("showTrending", checked)
                      }
                    />
                  </div>
                </div>
              </section>

              <Separator />

              {/* Actions Section */}
              <section className="flex flex-col sm:flex-row gap-2">
                <Button
                  variant="outline"
                  onClick={exportSettings}
                  className="flex-1 gap-2"
                >
                  <Download className="w-4 h-4" />
                  {currentLanguage === "es"
                    ? "Exportar Configuración"
                    : "Export Settings"}
                </Button>
                <Button
                  variant="outline"
                  onClick={resetToDefaults}
                  className="flex-1 gap-2 text-red-500 hover:text-red-600 hover:bg-red-500/10"
                >
                  <Trash2 className="w-4 h-4" />
                  {currentLanguage === "es"
                    ? "Restablecer"
                    : "Reset to Defaults"}
                </Button>
              </section>

              {/* Version Info */}
              <div className="text-center text-xs text-muted-foreground pt-2">
                <p>WORLD.IA v2.0.0 • {new Date().getFullYear()}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
