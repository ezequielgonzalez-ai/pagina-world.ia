"use client";

import { memo, useState } from "react";
import { motion } from "framer-motion";
import {
  ExternalLink,
  Star,
  Sparkles,
  TrendingUp,
  Zap,
  Heart,
  Share2,
  Bookmark,
  MessageCircle,
  Twitter,
  Facebook,
  Linkedin,
  Link2,
  Check,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AITool } from "@/lib/tools-data";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface ToolCardProps {
  tool: AITool;
  index: number;
}

const pricingColors = {
  free: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 dark:bg-emerald-500/20",
  freemium: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20 dark:bg-cyan-500/20",
  paid: "bg-violet-500/10 text-violet-400 border-violet-500/20 dark:bg-violet-500/20",
};

export const ToolCard = memo(function ToolCard({ tool, index }: ToolCardProps) {
  const { language, t } = useLanguage();
  const [isLiked, setIsLiked] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [likesCount, setLikesCount] = useState(tool.rating ? Math.floor(tool.rating * 100) : 100);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const description = language === "es" ? tool.descriptionEs : tool.description;

  // Track click for monetization
  const trackClick = async (action: string) => {
    try {
      await fetch('/api/analytics/click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toolId: tool.id,
          toolName: tool.name,
          toolUrl: tool.url,
          category: tool.category,
          action,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (error) {
      console.error('Tracking error:', error);
    }
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isLiked) {
      setLikesCount((prev) => prev - 1);
    } else {
      setLikesCount((prev) => prev + 1);
      trackClick('like');
    }
    setIsLiked(!isLiked);
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorited(!isFavorited);
    if (!isFavorited) {
      trackClick('favorite');
    }
  };

  const handleShare = (platform: string) => {
    const url = encodeURIComponent(tool.url);
    const text = encodeURIComponent(`${tool.name}: ${description}`);

    const shareUrls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      whatsapp: `https://wa.me/?text=${text}%20${url}`,
    };

    trackClick('share');

    if (platform === "copy") {
      navigator.clipboard.writeText(tool.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else if (shareUrls[platform]) {
      window.open(shareUrls[platform], "_blank", "width=600,height=400");
    }
    setShowShareMenu(false);
  };

  const handleVisit = () => {
    trackClick('visit');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: index * 0.03,
        ease: "easeOut",
      }}
      className="h-full"
      style={{ willChange: "transform, opacity" }}
    >
      <Card className="group relative h-full overflow-hidden bg-card/60 dark:bg-card/40 backdrop-blur-sm border-border/50 hover:border-cyan-500/40 transition-all duration-300 card-scan">
        {/* Neon glow effect on hover */}
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            boxShadow: "0 0 30px rgba(0, 240, 255, 0.15), inset 0 0 30px rgba(0, 240, 255, 0.03)"
          }}
        />
        
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Scan line effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-60 group-hover:animate-[scan-line_1s_ease-out]" />
        </div>

        {/* Badges */}
        <div className="absolute top-3 right-3 z-10 flex flex-col gap-1">
          {tool.featured && (
            <Badge className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-0 text-xs font-medium">
              <Sparkles className="w-3 h-3 mr-1" />
              {t.toolCard.featured}
            </Badge>
          )}
          {tool.trending && (
            <Badge className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white border-0 text-xs font-medium">
              <TrendingUp className="w-3 h-3 mr-1" />
              {t.toolCard.trending}
            </Badge>
          )}
          {tool.isNew && (
            <Badge className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white border-0 text-xs font-medium">
              <Zap className="w-3 h-3 mr-1" />
              {t.toolCard.new}
            </Badge>
          )}
        </div>

        <CardContent className="p-5 h-full flex flex-col relative z-10">
          {/* Icon and Name */}
          <div className="flex items-start gap-4 mb-3">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 3 }}
              transition={{ duration: 0.2 }}
              className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 via-violet-500/10 to-transparent flex items-center justify-center text-2xl border border-cyan-500/20 group-hover:border-cyan-500/40 transition-colors"
              style={{ willChange: "transform" }}
            >
              {tool.icon}
            </motion.div>
            <div className="flex-1 min-w-0 pt-1">
              <h3 className="font-semibold text-lg text-foreground group-hover:text-cyan-400 transition-colors truncate">
                {tool.name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className={`text-xs ${pricingColors[tool.pricing]}`}>
                  {t.toolCard[tool.pricing]}
                </Badge>
                {tool.rating && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{tool.rating}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-2 flex-1 mb-4">
            {description}
          </p>

          {/* Social Interactions */}
          <div className="flex items-center justify-between mb-3 pt-2 border-t border-border/30">
            {/* Like Button */}
            <motion.button
              onClick={handleLike}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all",
                isLiked
                  ? "bg-pink-500/15 text-pink-400"
                  : "bg-muted/50 text-muted-foreground hover:bg-pink-500/10 hover:text-pink-400"
              )}
              style={{ willChange: "transform" }}
            >
              <Heart className={cn("w-4 h-4", isLiked && "fill-pink-400")} />
              <span>{likesCount}</span>
            </motion.button>

            {/* Share Dropdown */}
            <DropdownMenu open={showShareMenu} onOpenChange={setShowShareMenu}>
              <DropdownMenuTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-muted/50 text-muted-foreground hover:bg-cyan-500/10 hover:text-cyan-400 transition-all"
                  style={{ willChange: "transform" }}
                >
                  <Share2 className="w-4 h-4" />
                </motion.button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem onClick={() => handleShare("twitter")} className="cursor-pointer">
                  <Twitter className="w-4 h-4 mr-2 text-cyan-400" />
                  Twitter / X
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleShare("facebook")} className="cursor-pointer">
                  <Facebook className="w-4 h-4 mr-2 text-blue-500" />
                  Facebook
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleShare("linkedin")} className="cursor-pointer">
                  <Linkedin className="w-4 h-4 mr-2 text-blue-400" />
                  LinkedIn
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleShare("whatsapp")} className="cursor-pointer">
                  <MessageCircle className="w-4 h-4 mr-2 text-emerald-500" />
                  WhatsApp
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleShare("copy")} className="cursor-pointer">
                  {copied ? <Check className="w-4 h-4 mr-2 text-emerald-500" /> : <Link2 className="w-4 h-4 mr-2" />}
                  {copied ? (language === "es" ? "¡Copiado!" : "Copied!") : (language === "es" ? "Copiar link" : "Copy link")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Favorite Button */}
            <motion.button
              onClick={handleFavorite}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all",
                isFavorited
                  ? "bg-amber-500/15 text-amber-400"
                  : "bg-muted/50 text-muted-foreground hover:bg-amber-500/10 hover:text-amber-400"
              )}
              style={{ willChange: "transform" }}
            >
              <Bookmark className={cn("w-4 h-4", isFavorited && "fill-amber-400")} />
            </motion.button>
          </div>

          {/* Action Button */}
          <Button
            asChild
            className="w-full bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-400 hover:to-violet-400 text-white transition-all duration-300 group/btn font-medium"
          >
            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer sponsored"
              onClick={handleVisit}
              className="flex items-center justify-center gap-2"
            >
              <span>{t.toolCard.visit}</span>
              <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </a>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
});
