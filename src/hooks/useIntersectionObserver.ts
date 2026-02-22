"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/**
 * useIntersectionObserver Hook
 * 
 * A performant hook for detecting when an element enters/exits the viewport.
 * Used for lazy loading images, infinite scroll, and scroll-triggered animations.
 * 
 * @param options - IntersectionObserver options
 * @returns ref to attach to element, and isIntersecting boolean
 * 
 * @example
 * const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });
 * if (isIntersecting) loadMore();
 */
export function useIntersectionObserver<T extends HTMLElement = HTMLDivElement>(
  options: IntersectionObserverInit = {}
) {
  const { threshold = 0, root = null, rootMargin = "100px" } = options;
  const ref = useRef<T>(null);
  
  // Check for browser support on initial render
  const [isIntersecting, setIsIntersecting] = useState<boolean>(() => {
    if (typeof IntersectionObserver === "undefined") return true;
    return false;
  });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Already handled in initial state for browsers without IntersectionObserver
    if (typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold, root, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, root, rootMargin]);

  return { ref, isIntersecting };
}

/**
 * useInfiniteScroll Hook
 * 
 * Implements infinite scroll with virtualization support.
 * Loads more content when user scrolls near the bottom.
 * 
 * @param callback - Function to call when more content should load
 * @param hasMore - Whether there is more content to load
 * @param threshold - Distance from bottom to trigger load (in pixels)
 * 
 * @example
 * const { sentinelRef, isLoading } = useInfiniteScroll(loadMore, hasMore);
 */
export function useInfiniteScroll(
  callback: () => void | Promise<void>,
  hasMore: boolean,
  threshold = 200
) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const isLoadingRef = useRef(false);

  const loadMore = useCallback(async () => {
    if (isLoadingRef.current || !hasMore) return;
    
    isLoadingRef.current = true;
    setIsLoading(true);
    
    try {
      await callback();
    } finally {
      isLoadingRef.current = false;
      setIsLoading(false);
    }
  }, [callback, hasMore]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || typeof IntersectionObserver === "undefined") {
      // Fallback for browsers without IntersectionObserver
      const handleScroll = () => {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = window.scrollY;
        const clientHeight = window.innerHeight;
        
        if (scrollHeight - scrollTop - clientHeight < threshold && hasMore && !isLoadingRef.current) {
          loadMore();
        }
      };
      
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !isLoadingRef.current) {
          loadMore();
        }
      },
      { rootMargin: `${threshold}px` }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, threshold, loadMore]);

  return { sentinelRef, isLoading };
}

/**
 * useDebounce Hook
 * 
 * Debounces a value to prevent excessive updates.
 * Useful for search inputs and resize handlers.
 */
export function useDebounce<T>(value: T, delay = 300): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

/**
 * useMediaQuery Hook
 * 
 * Responsive breakpoint detection following mobile-first approach.
 * 
 * @example
 * const isMobile = useMediaQuery("(max-width: 768px)");
 */
export function useMediaQuery(query: string): boolean {
  const getMatches = (q: string): boolean => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(q).matches;
  };

  const [matches, setMatches] = useState<boolean>(() => getMatches(query));

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const media = window.matchMedia(query);
    
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMatches(media.matches);
    
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}

/**
 * useReducedMotion Hook
 * 
 * Respects user's prefers-reduced-motion preference for accessibility.
 * Returns true if user prefers reduced motion.
 * 
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
 */
export function useReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
