"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Wand2,
  ImageIcon,
  ExternalLink,
  Copy,
  Check,
  Crown,
  Palette,
  Zap,
  Star,
  Globe,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";

// Free AI Image Generation Services
const freeImageServices = [
  {
    id: "flux-ai",
    name: "Flux AI",
    url: "https://flux1.ai",
    icon: "⚡",
    description: "Generate stunning AI images for free with Flux. No signup required for basic usage.",
    descriptionEs: "Genera imágenes IA impresionantes gratis con Flux. No requiere registro para uso básico.",
    features: ["Free tier", "Fast generation", "High quality", "Multiple styles"],
    featuresEs: ["Nivel gratis", "Generación rápida", "Alta calidad", "Múltiples estilos"],
    color: "from-yellow-500 to-orange-500",
    featured: true,
  },
  {
    id: "leonardo-ai",
    name: "Leonardo AI",
    url: "https://leonardo.ai",
    icon: "🎭",
    description: "Create production-quality visual assets with AI. 150 free credits daily.",
    descriptionEs: "Crea activos visuales de calidad profesional con IA. 150 créditos gratis diarios.",
    features: ["150 free credits/day", "Game assets", "Multiple models", "API access"],
    featuresEs: ["150 créditos gratis/día", "Assets de juegos", "Múltiples modelos", "Acceso API"],
    color: "from-purple-500 to-pink-500",
    featured: true,
  },
  {
    id: "ideogram",
    name: "Ideogram",
    url: "https://ideogram.ai",
    icon: "📝",
    description: "AI image generator with perfect text rendering. Free tier available.",
    descriptionEs: "Generador de imágenes IA con renderizado perfecto de texto. Nivel gratis disponible.",
    features: ["Text rendering", "Free daily credits", "Typography", "Logos"],
    featuresEs: ["Renderizado de texto", "Créditos diarios gratis", "Tipografía", "Logos"],
    color: "from-blue-500 to-cyan-500",
    featured: true,
  },
  {
    id: "civitai",
    name: "Civitai",
    url: "https://civitai.com",
    icon: "🎨",
    description: "Community platform for AI art with free image generation.",
    descriptionEs: "Plataforma comunitaria para arte IA con generación de imágenes gratis.",
    features: ["Community models", "Free generation", "Style library", "NSFW filter"],
    featuresEs: ["Modelos comunitarios", "Generación gratis", "Biblioteca de estilos", "Filtro NSFW"],
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "tensor-art",
    name: "Tensor.art",
    url: "https://tensor.art",
    icon: "🖼️",
    description: "AI image generation platform with diverse model library.",
    descriptionEs: "Plataforma de generación de imágenes IA con biblioteca diversa de modelos.",
    features: ["Multiple models", "Free credits", "Style transfer", "Upscaling"],
    featuresEs: ["Múltiples modelos", "Créditos gratis", "Transferencia de estilo", "Escalado"],
    color: "from-indigo-500 to-purple-500",
  },
  {
    id: "playground-ai",
    name: "Playground AI",
    url: "https://playground.com",
    icon: "🎪",
    description: "Free AI image generator with powerful editing tools.",
    descriptionEs: "Generador de imágenes IA gratis con potentes herramientas de edición.",
    features: ["500 images/day free", "Editing tools", "Mixed styles", "Canvas mode"],
    featuresEs: ["500 imágenes/día gratis", "Herramientas de edición", "Estilos mixtos", "Modo canvas"],
    color: "from-pink-500 to-rose-500",
  },
  {
    id: "seaart-ai",
    name: "SeaArt AI",
    url: "https://seaart.ai",
    icon: "🌊",
    description: "AI art generator with extensive model collection.",
    descriptionEs: "Generador de arte IA con extensa colección de modelos.",
    features: ["300 free credits/day", "Model hub", "Civitai integration", "Training tools"],
    featuresEs: ["300 créditos gratis/día", "Hub de modelos", "Integración Civitai", "Herramientas de entrenamiento"],
    color: "from-cyan-500 to-blue-500",
  },
  {
    id: "bing-image",
    name: "Bing Image Creator",
    url: "https://www.bing.com/images/create",
    icon: "🔍",
    description: "Microsoft's free AI image generator powered by DALL-E.",
    descriptionEs: "Generador de imágenes IA gratuito de Microsoft potenciado por DALL-E.",
    features: ["Completely free", "DALL-E powered", "Microsoft account", "15 boosts/day"],
    featuresEs: ["Completamente gratis", "Potenciado por DALL-E", "Cuenta Microsoft", "15 boosts/día"],
    color: "from-blue-600 to-indigo-600",
  },
];

const aiStyles = [
  { id: "realistic", label: "Fotorrealista", labelEn: "Photorealistic", suffix: ", photorealistic, ultra detailed, 8k" },
  { id: "anime", label: "Anime/Manga", labelEn: "Anime/Manga", suffix: ", anime style, manga art, vibrant colors" },
  { id: "digital-art", label: "Arte Digital", labelEn: "Digital Art", suffix: ", digital art, concept art, artstation" },
  { id: "3d-render", label: "Render 3D", labelEn: "3D Render", suffix: ", 3D render, octane render, unreal engine" },
  { id: "oil-painting", label: "Pintura al Óleo", labelEn: "Oil Painting", suffix: ", oil painting, classical art, museum quality" },
  { id: "watercolor", label: "Acuarela", labelEn: "Watercolor", suffix: ", watercolor painting, soft colors, artistic" },
  { id: "cyberpunk", label: "Cyberpunk", labelEn: "Cyberpunk", suffix: ", cyberpunk style, neon lights, futuristic" },
  { id: "fantasy", label: "Fantasía", labelEn: "Fantasy", suffix: ", epic fantasy art, magical, mystical" },
];

const promptSuggestions = [
  { prompt: "A futuristic cyberpunk city at night with neon lights and flying cars", labelEs: "Ciudad Cyberpunk", labelEn: "Cyberpunk City", icon: "🌃" },
  { prompt: "A majestic dragon flying over snow-capped mountains at sunset", labelEs: "Dragón Fantástico", labelEn: "Fantasy Dragon", icon: "🐉" },
  { prompt: "A cozy coffee shop interior with warm lighting and books", labelEs: "Cafetería Acogedora", labelEn: "Cozy Coffee Shop", icon: "☕" },
  { prompt: "An astronaut floating in space with Earth in the background", labelEs: "Astronauta Espacial", labelEn: "Space Astronaut", icon: "🚀" },
  { prompt: "A magical forest with glowing mushrooms and fairy lights", labelEs: "Bosque Mágico", labelEn: "Magical Forest", icon: "🍄" },
  { prompt: "A cute robot character with big eyes holding a flower", labelEs: "Robot Kawaii", labelEn: "Kawaii Robot", icon: "🤖" },
];

export default function CreateImagesPage() {
  const { language } = useLanguage();
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("realistic");
  const [copied, setCopied] = useState(false);
  const [showProDialog, setShowProDialog] = useState(false);

  const copyPrompt = (text: string) => {
    const selectedStyle = aiStyles.find(s => s.id === style);
    const enhancedPrompt = text + (selectedStyle?.suffix || "");
    navigator.clipboard.writeText(enhancedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success(language === "es" ? "¡Prompt copiado! Ahora úsalo en uno de los servicios gratuitos" : "Prompt copied! Now use it in one of the free services");
  };

  const generateAndCopy = () => {
    if (!prompt.trim()) {
      toast.error(language === "es" ? "Ingresa un prompt" : "Enter a prompt");
      return;
    }
    copyPrompt(prompt);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
                <ImageIcon className="w-6 h-6 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text-animated">
                {language === "es" ? "Generador de Imágenes IA Gratis" : "Free AI Image Generator"}
              </span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-4">
              {language === "es"
                ? "Crea imágenes increíbles con IA completamente gratis. Te conectamos con los mejores servicios gratuitos de generación de imágenes."
                : "Create amazing images with AI completely free. We connect you with the best free image generation services."}
            </p>
            <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
              <Zap className="w-3 h-3 mr-1" />
              {language === "es" ? "100% Gratis • Sin límites" : "100% Free • No limits"}
            </Badge>
          </motion.div>

          {/* Prompt Builder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12"
          >
            <Card className="bg-card/50 dark:bg-card/30 backdrop-blur-sm border-border/50">
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Prompt Input */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-base font-medium flex items-center gap-2">
                        <Wand2 className="w-4 h-4" />
                        {language === "es" ? "Describe tu imagen" : "Describe your image"}
                      </Label>
                      <Textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder={
                          language === "es"
                            ? "Ej: Un gato astronauta en el espacio, colores vibrantes..."
                            : "Ex: An astronaut cat in space, vibrant colors..."
                        }
                        className="min-h-[120px] resize-none"
                      />
                    </div>

                    {/* Style Selection */}
                    <div className="space-y-2">
                      <Label className="text-base font-medium flex items-center gap-2">
                        <Palette className="w-4 h-4" />
                        {language === "es" ? "Estilo de IA" : "AI Style"}
                      </Label>
                      <Select value={style} onValueChange={setStyle}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {aiStyles.map((s) => (
                            <SelectItem key={s.id} value={s.id}>
                              {language === "es" ? s.label : s.labelEn}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Copy Button */}
                    <Button
                      onClick={generateAndCopy}
                      disabled={!prompt.trim()}
                      className="w-full bg-gradient-to-r from-primary via-purple-500 to-blue-500 hover:from-primary/90 hover:via-purple-500/90 hover:to-blue-500/90 text-white h-12"
                    >
                      {copied ? (
                        <>
                          <Check className="w-5 h-5 mr-2" />
                          {language === "es" ? "¡Prompt Copiado!" : "Prompt Copied!"}
                        </>
                      ) : (
                        <>
                          <Copy className="w-5 h-5 mr-2" />
                          {language === "es" ? "Generar y Copiar Prompt" : "Generate & Copy Prompt"}
                        </>
                      )}
                    </Button>
                  </div>

                  {/* Suggestions */}
                  <div className="space-y-4">
                    <Label className="text-sm text-muted-foreground">
                      {language === "es" ? "Sugerencias rápidas:" : "Quick suggestions:"}
                    </Label>
                    <div className="grid grid-cols-2 gap-2">
                      {promptSuggestions.map((suggestion, index) => (
                        <motion.button
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 + index * 0.05 }}
                          onClick={() => setPrompt(suggestion.prompt)}
                          className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-left group"
                        >
                          <span className="text-lg">{suggestion.icon}</span>
                          <span className="text-xs flex-1">
                            {language === "es" ? suggestion.labelEs : suggestion.labelEn}
                          </span>
                        </motion.button>
                      ))}
                    </div>

                    <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                      <p className="text-sm text-muted-foreground">
                        <Sparkles className="w-4 h-4 inline mr-1 text-primary" />
                        {language === "es"
                          ? "Copia tu prompt mejorado y úsalo en cualquiera de los servicios gratuitos de abajo. ¡Cada uno ofrece créditos gratis diarios!"
                          : "Copy your enhanced prompt and use it in any of the free services below. Each offers free daily credits!"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Free Services Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Globe className="w-6 h-6 text-primary" />
              {language === "es" ? "Mejores Servicios Gratuitos de IA" : "Best Free AI Services"}
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {freeImageServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <Card className={`h-full bg-card/50 dark:bg-card/30 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 ${service.featured ? 'ring-2 ring-primary/20' : ''}`}>
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center text-xl`}>
                            {service.icon}
                          </div>
                          <div>
                            <h3 className="font-semibold">{service.name}</h3>
                            {service.featured && (
                              <Badge variant="secondary" className="text-xs">
                                <Star className="w-3 h-3 mr-1" />
                                {language === "es" ? "Recomendado" : "Featured"}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mb-3">
                        {language === "es" ? service.descriptionEs : service.description}
                      </p>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {(language === "es" ? service.featuresEs : service.features).map((feature, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>

                      <Button
                        asChild
                        className={`w-full bg-gradient-to-r ${service.color} text-white`}
                        onClick={() => {
                          if (prompt.trim()) {
                            copyPrompt(prompt);
                          }
                        }}
                      >
                        <a href={service.url} target="_blank" rel="noopener noreferrer">
                          {prompt.trim() ? (
                            <>
                              <Copy className="w-4 h-4 mr-2" />
                              {language === "es" ? "Copiar Prompt y Abrir" : "Copy Prompt & Open"}
                            </>
                          ) : (
                            <>
                              <ExternalLink className="w-4 h-4 mr-2" />
                              {language === "es" ? "Abrir Servicio" : "Open Service"}
                            </>
                          )}
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Tips Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12"
          >
            <Card className="bg-gradient-to-r from-purple-500/10 via-primary/10 to-blue-500/10 border-primary/20">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  {language === "es" ? "Tips para Mejores Resultados" : "Tips for Better Results"}
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                  <div className="space-y-2">
                    <p>✓ {language === "es" ? "Sé específico: describe estilo, colores, iluminación" : "Be specific: describe style, colors, lighting"}</p>
                    <p>✓ {language === "es" ? "Incluye detalles: sujeto, acción, ambiente" : "Include details: subject, action, environment"}</p>
                    <p>✓ {language === "es" ? "Menciona calidad: 'high quality', 'detailed', '4K'" : "Mention quality: 'high quality', 'detailed', '4K'"}</p>
                  </div>
                  <div className="space-y-2">
                    <p>✓ {language === "es" ? "Prueba diferentes estilos para variar resultados" : "Try different styles to vary results"}</p>
                    <p>✓ {language === "es" ? "Usa los créditos gratis diarios de cada servicio" : "Use each service's free daily credits"}</p>
                    <p>✓ {language === "es" ? "Regístrate para obtener más créditos" : "Sign up to get more credits"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
