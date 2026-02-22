"use client";

import { memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * SkeletonCard Component
 * 
 * Displays a placeholder card while content is loading.
 * This improves perceived performance and prevents CLS (Cumulative Layout Shift).
 * 
 * @why - Skeleton screens reduce perceived loading time by 30-50%
 * @accessibility - Uses aria-busy and aria-live for screen readers
 */
export const SkeletonCard = memo(function SkeletonCard() {
  return (
    <Card 
      className="h-full overflow-hidden bg-card/60 dark:bg-card/40 backdrop-blur-sm border-border/50"
      aria-busy="true"
      aria-live="polite"
    >
      <CardContent className="p-5 h-full flex flex-col">
        {/* Icon and Name skeleton */}
        <div className="flex items-start gap-4 mb-3">
          <Skeleton className="flex-shrink-0 w-12 h-12 rounded-xl" />
          <div className="flex-1 pt-1 space-y-2">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>

        {/* Description skeleton */}
        <div className="flex-1 space-y-2 mb-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>

        {/* Social buttons skeleton */}
        <div className="flex items-center justify-between mb-3 pt-2 border-t border-border/30">
          <Skeleton className="h-8 w-16 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>

        {/* Action button skeleton */}
        <Skeleton className="h-10 w-full rounded-md" />
      </CardContent>
    </Card>
  );
});

/**
 * SkeletonGrid Component
 * 
 * Renders multiple skeleton cards in a grid layout.
 * Used for initial page load and infinite scroll loading states.
 */
export const SkeletonGrid = memo(function SkeletonGrid({ count = 8 }: { count?: number }) {
  return (
    <div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      role="status"
      aria-label="Cargando herramientas..."
    >
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
});
