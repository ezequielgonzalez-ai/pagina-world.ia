"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface LikeButtonProps {
  itemId: string;
  itemType: "tool" | "promptPack" | "product";
  initialCount?: number;
  initialLiked?: boolean;
  showCount?: boolean;
  size?: "sm" | "md" | "lg";
}

export function LikeButton({
  itemId,
  itemType,
  initialCount = 0,
  initialLiked = false,
  showCount = true,
  size = "md",
}: LikeButtonProps) {
  const { user } = useAuth();
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch initial state
    fetch(`/api/interactions/like?itemId=${itemId}&itemType=${itemType}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.count !== undefined) setCount(data.count);
        if (data.isLiked !== undefined) setLiked(data.isLiked);
      })
      .catch(console.error);
  }, [itemId, itemType]);

  const handleLike = async () => {
    if (!user) {
      toast.error("Please sign in to like");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/interactions/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId, itemType }),
      });

      if (!response.ok) throw new Error("Failed to toggle like");

      const data = await response.json();
      setLiked(data.liked);
      setCount((prev) => (data.liked ? prev + 1 : prev - 1));
    } catch (error) {
      console.error("Like error:", error);
      toast.error("Failed to update like");
    } finally {
      setLoading(false);
    }
  };

  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-9 w-9",
    lg: "h-10 w-10",
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  return (
    <div className="flex items-center gap-1">
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          sizeClasses[size],
          liked && "text-red-500 hover:text-red-600"
        )}
        onClick={handleLike}
        disabled={loading}
      >
        {loading ? (
          <Loader2 className={cn(iconSizes[size], "animate-spin")} />
        ) : (
          <motion.div
            whileTap={{ scale: 0.8 }}
            animate={liked ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            <Heart
              className={cn(iconSizes[size], liked && "fill-current")}
            />
          </motion.div>
        )}
      </Button>
      {showCount && (
        <span className="text-sm text-muted-foreground min-w-[20px]">
          {count}
        </span>
      )}
    </div>
  );
}
