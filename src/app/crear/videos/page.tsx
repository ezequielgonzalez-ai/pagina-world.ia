"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Video,
  ExternalLink,
  Sparkles,
  Zap,
  Users,
  Film,
  Loader2,
  Play,
  Download,
  RefreshCw,
  ImageIcon,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { toast } from "sonner";

const VIDEO_TOOLS = [
  {
    id: "runway",
    name: "Runway ML",
    description: "Gen-2 text-to-video with advanced AI video editing",
    descriptionEs: "Gen-2 texto-a-video con edición avanzada de video con IA",
    url: "https://runwayml.com",
    icon: "🎬",
    featured: true,
  },
  {
    id: "pika",
    name: "Pika Labs",
    description: "AI video generator for creating videos from text or images",
    descriptionEs: "Generador de video con IA desde texto o imágenes",
    url: "https://pika.art",
    icon: "🎥",
    featured: true,
  },
  {
    id: "sora",
    name: "OpenAI Sora",
    description: "Revolutionary text-to-video model by OpenAI",
    descriptionEs: "Modelo revolucionario de texto-a-video por OpenAI",
    url: "https://openai.com/sora",
    icon: "🌟",
    featured: true,
  },
  {
    id: "synthesia",
    name: "Synthesia",
    description: "Create AI videos with digital avatars in 120+ languages",
    descriptionEs: "Crea videos con avatares digitales en más de 120 idiomas",
    url: "https://synthesia.io",
    icon: "🤖",
  },
  {
    id: "heygen",
    name: "HeyGen",
    description: "AI video creation with realistic avatars and voice cloning",
    descriptionEs: "Creación de video con avatares realistas y clonación de voz",
    url: "https://heygen.com",
    icon: "🎭",
  },
  {
    id: "luma",
    name: "Luma AI",
    description: "Create 3D videos and captures with NeRF technology",
    descriptionEs: "Crea videos 3D y capturas con tecnología NeRF",
    url: "https://lumalabs.ai",
    icon: "✨",
  },
];

const FEATURES = [
  {
    icon: Zap,
    title: "Text to Video",
    titleEs: "Texto a Video",
    description: "Generate videos from text descriptions",
    descriptionEs: "Genera videos desde descripciones de texto",
  },
  {
    icon: Users,
    title: "AI Avatars",
    titleEs: "Avatares IA",
    description: "Create videos with realistic AI presenters",
    descriptionEs: "Crea videos con presentadores IA realistas",
  },
  {
    icon: Film,
    title: "Video Editing",
    titleEs: "Edición de Video",
    description: "AI-powered video editing and enhancement",
    descriptionEs: "Edición y mejora de video potenciada con IA",
  },
];

const VIDEO_SIZES = [
  { value: "1024x1024", label: "1024×1024 (Cuadrado)" },
  { value: "1344x768", label: "1344×768 (Horizontal)" },
  { value: "1920x1080", label: "1920×1080 (Full HD)" },
  { value: "768x1344", label: "768×1344 (Vertical)" },
];

interface VideoTask {
  taskId: string;
  status: string;
  prompt: string;
  videoUrl?: string;
  createdAt: Date;
}

export default function VideosPage() {
  const { language } = useLanguage();
  const [prompt, setPrompt] = useState("");
  const [quality, setQuality] = useState<"speed" | "quality">("speed");
  const [duration, setDuration] = useState<5 | 10>(5);
  const [size, setSize] = useState("1344x768");
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTask, setCurrentTask] = useState<VideoTask | null>(null);
  const [completedVideos, setCompletedVideos] = useState<VideoTask[]>([]);

  // Poll for video status
  const pollVideoStatus = useCallback(async (taskId: string) => {
    let pollCount = 0;
    const maxPolls = 120; // 10 minutes max

    const poll = async () => {
      try {
        const response = await fetch(`/api/ai/video?taskId=${taskId}`);
        const data = await response.json();

        if (data.status === "SUCCESS" && data.videoUrl) {
          setCurrentTask((prev) =>
            prev ? { ...prev, status: "SUCCESS", videoUrl: data.videoUrl } : null
          );
          setCompletedVideos((prev) => [
            {
              taskId,
              status: "SUCCESS",
              prompt,
              videoUrl: data.videoUrl,
              createdAt: new Date(),
            },
            ...prev.slice(0, 9), // Keep last 10 videos
          ]);
          setIsGenerating(false);
          setProgress(100);
          toast.success(language === "es" ? "¡Video generado!" : "Video generated!");
          return true;
        }

        if (data.status === "FAIL") {
          setCurrentTask((prev) => (prev ? { ...prev, status: "FAIL" } : null));
          setIsGenerating(false);
          toast.error(language === "es" ? "Error al generar video" : "Video generation failed");
          return true;
        }

        if (data.status === "PROCESSING" && pollCount < maxPolls) {
          pollCount++;
          setProgress(Math.min(90, pollCount * 0.75));
          setTimeout(poll, 5000);
          return false;
        }

        if (pollCount >= maxPolls) {
          setIsGenerating(false);
          toast.error(language === "es" ? "Tiempo de espera agotado" : "Timeout");
          return true;
        }
      } catch (error) {
        console.error("Poll error:", error);
        if (pollCount < maxPolls) {
          pollCount++;
          setTimeout(poll, 5000);
        }
      }
    };

    await poll();
  }, [prompt, language]);

  const generateVideo = useCallback(async () => {
    if (!prompt.trim()) {
      toast.error(language === "es" ? "Ingresa una descripción" : "Enter a description");
      return;
    }

    setIsGenerating(true);
    setProgress(10);

    try {
      const response = await fetch("/api/ai/video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          quality,
          duration,
          size,
        }),
      });

      const data = await response.json();

      if (data.success && data.taskId) {
        setCurrentTask({
          taskId: data.taskId,
          status: data.status,
          prompt,
          createdAt: new Date(),
        });
        setProgress(20);
        await pollVideoStatus(data.taskId);
      } else {
        throw new Error(data.error || "Failed to create task");
      }
    } catch (error) {
      console.error("Video generation error:", error);
      toast.error(language === "es" ? "Error al crear video" : "Failed to create video");
      setIsGenerating(false);
      setProgress(0);
    }
  }, [prompt, quality, duration, size, pollVideoStatus, language]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-full">
              <Video className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">
                {language === "es" ? "Videos IA" : "AI Videos"}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text-animated">
                {language === "es"
                  ? "Generación de Video con IA"
                  : "AI Video Generation"}
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {language === "es"
                ? "Crea videos impresionantes con inteligencia artificial directamente en tu navegador"
                : "Create amazing videos with artificial intelligence directly in your browser"}
            </p>
          </motion.div>

          <Tabs defaultValue="create" className="space-y-8">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
              <TabsTrigger value="create">
                {language === "es" ? "Crear Video" : "Create Video"}
              </TabsTrigger>
              <TabsTrigger value="tools">
                {language === "es" ? "Herramientas Externas" : "External Tools"}
              </TabsTrigger>
            </TabsList>

            {/* Create Video Tab */}
            <TabsContent value="create">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Input Section */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Card className="bg-card/50 dark:bg-card/30 backdrop-blur-sm border-border/50 h-full">
                    <CardContent className="p-6 space-y-6">
                      {/* Prompt */}
                      <div className="space-y-2">
                        <Label className="text-base font-medium">
                          {language === "es" ? "Describe tu video" : "Describe your video"}
                        </Label>
                        <Textarea
                          value={prompt}
                          onChange={(e) => setPrompt(e.target.value)}
                          placeholder={
                            language === "es"
                              ? "Ej: Un gato jugando con una pelota en un jardín soleado..."
                              : "Ex: A cat playing with a ball in a sunny garden..."
                          }
                          className="min-h-[120px] resize-none"
                          disabled={isGenerating}
                        />
                      </div>

                      {/* Settings Grid */}
                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label className="text-sm">
                            {language === "es" ? "Calidad" : "Quality"}
                          </Label>
                          <Select
                            value={quality}
                            onValueChange={(v) => setQuality(v as "speed" | "quality")}
                            disabled={isGenerating}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="speed">
                                {language === "es" ? "Rápido" : "Speed"}
                              </SelectItem>
                              <SelectItem value="quality">
                                {language === "es" ? "Calidad" : "Quality"}
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-sm">
                            {language === "es" ? "Duración" : "Duration"}
                          </Label>
                          <Select
                            value={duration.toString()}
                            onValueChange={(v) => setDuration(Number(v) as 5 | 10)}
                            disabled={isGenerating}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="5">5s</SelectItem>
                              <SelectItem value="10">10s</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-sm">
                            {language === "es" ? "Tamaño" : "Size"}
                          </Label>
                          <Select value={size} onValueChange={setSize} disabled={isGenerating}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {VIDEO_SIZES.map((s) => (
                                <SelectItem key={s.value} value={s.value}>
                                  {s.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Generate Button */}
                      <Button
                        onClick={generateVideo}
                        disabled={isGenerating || !prompt.trim()}
                        className="w-full bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90 text-white h-12 text-lg"
                      >
                        {isGenerating ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            {language === "es" ? "Generando..." : "Generating..."}
                          </>
                        ) : (
                          <>
                            <Video className="w-5 h-5 mr-2" />
                            {language === "es" ? "Generar Video" : "Generate Video"}
                          </>
                        )}
                      </Button>

                      {isGenerating && (
                        <div className="space-y-2">
                          <Progress value={progress} className="h-2" />
                          <p className="text-xs text-muted-foreground text-center">
                            {language === "es"
                              ? "Esto puede tomar 2-5 minutos. Por favor espera..."
                              : "This may take 2-5 minutes. Please wait..."}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Output Section */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card className="bg-card/50 dark:bg-card/30 backdrop-blur-sm border-border/50 h-full min-h-[400px]">
                    <CardContent className="p-6 h-full flex flex-col">
                      <div className="flex items-center justify-between mb-4">
                        <Label className="text-base font-medium">
                          {language === "es" ? "Video generado" : "Generated video"}
                        </Label>
                        {currentTask?.videoUrl && (
                          <Button asChild variant="outline" size="sm">
                            <a href={currentTask.videoUrl} download target="_blank" rel="noopener noreferrer">
                              <Download className="w-4 h-4 mr-1" />
                              {language === "es" ? "Descargar" : "Download"}
                            </a>
                          </Button>
                        )}
                      </div>

                      <div className="flex-1 rounded-xl bg-muted/30 overflow-hidden flex items-center justify-center">
                        <AnimatePresence mode="wait">
                          {isGenerating ? (
                            <motion.div
                              key="generating"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="flex flex-col items-center gap-4 p-8"
                            >
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                              >
                                <Film className="w-16 h-16 text-primary" />
                              </motion.div>
                              <p className="text-muted-foreground text-center">
                                {language === "es"
                                  ? "Creando tu video... Esto puede tomar unos minutos."
                                  : "Creating your video... This may take a few minutes."}
                              </p>
                            </motion.div>
                          ) : currentTask?.videoUrl ? (
                            <motion.div
                              key="video"
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0 }}
                              className="w-full h-full"
                            >
                              <video
                                src={currentTask.videoUrl}
                                controls
                                autoPlay
                                loop
                                className="w-full h-full object-contain"
                              />
                            </motion.div>
                          ) : completedVideos.length > 0 ? (
                            <motion.div
                              key="history"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="w-full p-4 space-y-3"
                            >
                              <p className="text-sm text-muted-foreground mb-2">
                                {language === "es" ? "Videos recientes:" : "Recent videos:"}
                              </p>
                              {completedVideos.map((video) => (
                                <div
                                  key={video.taskId}
                                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                                >
                                  <video
                                    src={video.videoUrl}
                                    className="w-16 h-16 object-cover rounded"
                                  />
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm truncate">{video.prompt}</p>
                                    <p className="text-xs text-muted-foreground">
                                      <Clock className="w-3 h-3 inline mr-1" />
                                      {video.createdAt.toLocaleTimeString()}
                                    </p>
                                  </div>
                                  <Button asChild size="sm" variant="ghost">
                                    <a href={video.videoUrl} target="_blank" rel="noopener noreferrer">
                                      <Play className="w-4 h-4" />
                                    </a>
                                  </Button>
                                </div>
                              ))}
                            </motion.div>
                          ) : (
                            <motion.div
                              key="empty"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="flex flex-col items-center gap-4 p-8 text-center"
                            >
                              <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center">
                                <Video className="w-10 h-10 text-muted-foreground" />
                              </div>
                              <p className="text-muted-foreground">
                                {language === "es"
                                  ? "Tu video aparecerá aquí"
                                  : "Your video will appear here"}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </TabsContent>

            {/* External Tools Tab */}
            <TabsContent value="tools">
              {/* Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="grid md:grid-cols-3 gap-6 mb-12"
              >
                {FEATURES.map((feature) => (
                  <Card key={feature.title} className="bg-card/50 border-border/50 text-center">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-primary/20 to-blue-500/20 flex items-center justify-center">
                        <feature.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">
                        {language === "es" ? feature.titleEs : feature.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {language === "es" ? feature.descriptionEs : feature.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </motion.div>

              {/* Video Tools Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {VIDEO_TOOLS.map((tool, index) => (
                  <motion.div
                    key={tool.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <Card
                      className={`bg-card/50 border-border/50 hover:border-primary/50 transition-all duration-300 h-full ${
                        tool.featured ? "ring-1 ring-primary/20" : ""
                      }`}
                    >
                      <CardContent className="p-6 flex flex-col h-full">
                        <div className="flex items-start justify-between mb-4">
                          <div className="text-4xl">{tool.icon}</div>
                          {tool.featured && (
                            <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">
                              {language === "es" ? "Destacado" : "Featured"}
                            </span>
                          )}
                        </div>
                        <h3 className="text-lg font-semibold mb-2">{tool.name}</h3>
                        <p className="text-sm text-muted-foreground flex-1">
                          {language === "es" ? tool.descriptionEs : tool.description}
                        </p>
                        <Button
                          asChild
                          className="mt-4 w-full bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90"
                        >
                          <a href={tool.url} target="_blank" rel="noopener noreferrer">
                            {language === "es" ? "Visitar" : "Visit"}
                            <ExternalLink className="w-4 h-4 ml-2" />
                          </a>
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}
