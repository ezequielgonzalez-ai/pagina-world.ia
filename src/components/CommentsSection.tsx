"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  Send,
  ThumbsUp,
  ThumbsDown,
  Reply,
  MoreHorizontal,
  User,
  Clock,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { AuthModal } from "./AuthModal";
import { cn } from "@/lib/utils";

interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  timestamp: Date;
  likes: number;
  dislikes: number;
  userVote?: "up" | "down" | null;
  replies?: Comment[];
}

interface CommentsSectionProps {
  toolId: string;
  toolName: string;
}

// Simulated comments store (in production, use database)
const commentsStore: Record<string, Comment[]> = {};

export function CommentsSection({ toolId, toolName }: CommentsSectionProps) {
  const { language } = useLanguage();
  const { isAuthenticated, user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");

  // Initialize comments for this tool
  if (!commentsStore[toolId]) {
    commentsStore[toolId] = [
      {
        id: `${toolId}-1`,
        userId: "user1",
        userName: "Carlos M.",
        userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=carlos",
        content:
          language === "es"
            ? `¡Excelente herramienta! La uso todos los días para mi trabajo.`
            : `Excellent tool! I use it every day for my work.`,
        timestamp: new Date(Date.now() - 86400000 * 2),
        likes: 24,
        dislikes: 2,
        replies: [],
      },
      {
        id: `${toolId}-2`,
        userId: "user2",
        userName: "Ana L.",
        userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ana",
        content:
          language === "es"
            ? `Muy útil para principiantes. La interfaz es muy intuitiva.`
            : `Very useful for beginners. The interface is very intuitive.`,
        timestamp: new Date(Date.now() - 86400000),
        likes: 15,
        dislikes: 0,
        replies: [],
      },
    ];
  }

  const comments = commentsStore[toolId];

  const handleSubmitComment = useCallback(async () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    if (!newComment.trim()) return;

    setIsSubmitting(true);

    try {
      const comment: Comment = {
        id: `${toolId}-${Date.now()}`,
        userId: user?.id || "anonymous",
        userName: user?.name || "Usuario",
        userAvatar: user?.avatar,
        content: newComment,
        timestamp: new Date(),
        likes: 0,
        dislikes: 0,
        replies: [],
      };

      commentsStore[toolId] = [comment, ...commentsStore[toolId]];
      setNewComment("");

      // API call in background
      await fetch("/api/interactions/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ toolId, content: newComment }),
      });
    } catch (error) {
      console.error("Comment error:", error);
    } finally {
      setIsSubmitting(false);
    }
  }, [isAuthenticated, newComment, toolId, user]);

  const handleSubmitReply = useCallback(
    async (parentId: string) => {
      if (!isAuthenticated) {
        setShowAuthModal(true);
        return;
      }

      if (!replyContent.trim()) return;

      const reply: Comment = {
        id: `${toolId}-${Date.now()}`,
        userId: user?.id || "anonymous",
        userName: user?.name || "Usuario",
        userAvatar: user?.avatar,
        content: replyContent,
        timestamp: new Date(),
        likes: 0,
        dislikes: 0,
        replies: [],
      };

      // Find parent and add reply
      const addReplyToParent = (comments: Comment[]): Comment[] => {
        return comments.map((c) => {
          if (c.id === parentId) {
            return { ...c, replies: [...(c.replies || []), reply] };
          }
          if (c.replies?.length) {
            return { ...c, replies: addReplyToParent(c.replies) };
          }
          return c;
        });
      };

      commentsStore[toolId] = addReplyToParent(commentsStore[toolId]);
      setReplyContent("");
      setReplyingTo(null);
    },
    [isAuthenticated, replyContent, toolId, user]
  );

  const handleVote = useCallback(
    (commentId: string, vote: "up" | "down") => {
      if (!isAuthenticated) {
        setShowAuthModal(true);
        return;
      }

      const updateVote = (comments: Comment[]): Comment[] => {
        return comments.map((c) => {
          if (c.id === commentId) {
            const currentVote = c.userVote;
            let newLikes = c.likes;
            let newDislikes = c.dislikes;

            if (currentVote === vote) {
              // Remove vote
              if (vote === "up") newLikes--;
              else newDislikes--;
              return { ...c, likes: newLikes, dislikes: newDislikes, userVote: null };
            } else {
              // Change or add vote
              if (currentVote === "up") newLikes--;
              if (currentVote === "down") newDislikes--;
              if (vote === "up") newLikes++;
              else newDislikes++;
              return { ...c, likes: newLikes, dislikes: newDislikes, userVote: vote };
            }
          }
          if (c.replies?.length) {
            return { ...c, replies: updateVote(c.replies) };
          }
          return c;
        });
      };

      commentsStore[toolId] = updateVote(commentsStore[toolId]);
    },
    [isAuthenticated, toolId]
  );

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return language === "es" ? `hace ${days}d` : `${days}d ago`;
    }
    if (hours > 0) {
      return language === "es" ? `hace ${hours}h` : `${hours}h ago`;
    }
    return language === "es" ? "ahora" : "now";
  };

  const CommentItem = ({ comment, depth = 0 }: { comment: Comment; depth?: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("relative", depth > 0 && "ml-8 pl-4 border-l-2 border-border/30")}
    >
      <div className="flex gap-3 py-4">
        <Avatar className="w-8 h-8 flex-shrink-0">
          <AvatarImage src={comment.userAvatar} />
          <AvatarFallback className="bg-primary/20 text-primary text-xs">
            {comment.userName.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-sm">{comment.userName}</span>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatTime(comment.timestamp)}
            </span>
          </div>
          <p className="text-sm text-foreground/90 mb-2">{comment.content}</p>

          <div className="flex items-center gap-4">
            {/* Vote buttons */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => handleVote(comment.id, "up")}
                className={cn(
                  "p-1 rounded transition-colors",
                  comment.userVote === "up"
                    ? "text-green-500 bg-green-500/10"
                    : "text-muted-foreground hover:text-green-500 hover:bg-green-500/10"
                )}
              >
                <ThumbsUp className="w-4 h-4" />
              </button>
              <span className="text-xs font-medium min-w-[20px] text-center">
                {comment.likes - comment.dislikes}
              </span>
              <button
                onClick={() => handleVote(comment.id, "down")}
                className={cn(
                  "p-1 rounded transition-colors",
                  comment.userVote === "down"
                    ? "text-red-500 bg-red-500/10"
                    : "text-muted-foreground hover:text-red-500 hover:bg-red-500/10"
                )}
              >
                <ThumbsDown className="w-4 h-4" />
              </button>
            </div>

            {/* Reply button */}
            <button
              onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
              className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors"
            >
              <Reply className="w-3 h-3" />
              {language === "es" ? "Responder" : "Reply"}
            </button>
          </div>

          {/* Reply input */}
          <AnimatePresence>
            {replyingTo === comment.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3"
              >
                <div className="flex gap-2">
                  <Textarea
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    placeholder={language === "es" ? "Escribe tu respuesta..." : "Write your reply..."}
                    className="min-h-[60px] resize-none text-sm"
                  />
                  <Button
                    onClick={() => handleSubmitReply(comment.id)}
                    disabled={!replyContent.trim()}
                    size="sm"
                    className="self-end"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Nested replies */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-2">
              {comment.replies.map((reply) => (
                <CommentItem key={reply.id} comment={reply} depth={depth + 1} />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );

  return (
    <>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">
            {language === "es" ? "Comentarios" : "Comments"} ({comments.length})
          </h3>
        </div>

        {/* New Comment */}
        <div className="flex gap-3">
          <Avatar className="w-8 h-8 flex-shrink-0">
            <AvatarImage src={user?.avatar} />
            <AvatarFallback className="bg-primary/20 text-primary">
              {isAuthenticated && user?.name ? user.name.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 flex gap-2">
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder={
                isAuthenticated
                  ? language === "es"
                    ? `Escribe un comentario sobre ${toolName}...`
                    : `Write a comment about ${toolName}...`
                  : language === "es"
                  ? "Inicia sesión para comentar..."
                  : "Sign in to comment..."
              }
              className="min-h-[60px] resize-none"
              disabled={!isAuthenticated}
              onClick={() => !isAuthenticated && setShowAuthModal(true)}
            />
            <Button
              onClick={handleSubmitComment}
              disabled={!newComment.trim() || isSubmitting}
              size="sm"
              className="self-end"
            >
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Comments List */}
        <div className="divide-y divide-border/30">
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>

        {comments.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>{language === "es" ? "Sé el primero en comentar" : "Be the first to comment"}</p>
          </div>
        )}
      </div>

      {/* Auth Modal */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
}
