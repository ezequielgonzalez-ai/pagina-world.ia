"use client";

import { useState, useEffect, useCallback } from 'react';
import { AITool, categories, popularTasks, professionFilters, aiGlossary, CategoryId, TaskType, ProfessionType } from '@/lib/tools-data';

interface UseToolsDataOptions {
  initialLimit?: number;
  category?: CategoryId;
  search?: string;
  task?: TaskType | null;
  profession?: ProfessionType | null;
}

interface ToolsResponse {
  tools: AITool[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
  };
  totalCount: number;
}

// Static data (small, can be imported directly)
export { categories, popularTasks, professionFilters, aiGlossary };

export function useToolsData(options: UseToolsDataOptions = {}) {
  const { initialLimit = 50, category = 'all', search = '', task = null, profession = null } = options;

  const [tools, setTools] = useState<AITool[]>([]);
  const [featuredTools, setFeaturedTools] = useState<AITool[]>([]);
  const [trendingTools, setTrendingTools] = useState<AITool[]>([]);
  const [newestTools, setNewestTools] = useState<AITool[]>([]);
  const [topRatedTools, setTopRatedTools] = useState<AITool[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Fetch main tools with filters
  const fetchTools = useCallback(async (pageNum: number, append: boolean = false) => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.set('page', pageNum.toString());
      params.set('limit', initialLimit.toString());
      if (category !== 'all') params.set('category', category);
      if (search) params.set('search', search);

      // Map task/profession to categories
      if (task) {
        const taskData = popularTasks.find(t => t.id === task);
        if (taskData?.categories) {
          // Use first category for now
        }
      }

      const response = await fetch(`/api/tools?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch tools');

      const data: ToolsResponse = await response.json();

      if (append) {
        setTools(prev => [...prev, ...data.tools]);
      } else {
        setTools(data.tools);
      }

      setTotalCount(data.totalCount);
      setHasMore(data.pagination.hasMore);
      setPage(pageNum);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [initialLimit, category, search, task, profession]);

  // Fetch featured tools
  const fetchFeatured = useCallback(async () => {
    try {
      const response = await fetch('/api/tools?featured=true&limit=8');
      if (response.ok) {
        const data = await response.json();
        setFeaturedTools(data.tools);
      }
    } catch (err) {
      console.error('Failed to fetch featured tools:', err);
    }
  }, []);

  // Fetch trending tools
  const fetchTrending = useCallback(async () => {
    try {
      const response = await fetch('/api/tools?trending=true&limit=8');
      if (response.ok) {
        const data = await response.json();
        setTrendingTools(data.tools);
      }
    } catch (err) {
      console.error('Failed to fetch trending tools:', err);
    }
  }, []);

  // Fetch newest tools
  const fetchNewest = useCallback(async () => {
    try {
      const response = await fetch('/api/tools?newest=true&limit=12');
      if (response.ok) {
        const data = await response.json();
        setNewestTools(data.tools);
      }
    } catch (err) {
      console.error('Failed to fetch newest tools:', err);
    }
  }, []);

  // Fetch top rated tools
  const fetchTopRated = useCallback(async () => {
    try {
      const response = await fetch('/api/tools?topRated=true&limit=12');
      if (response.ok) {
        const data = await response.json();
        setTopRatedTools(data.tools);
      }
    } catch (err) {
      console.error('Failed to fetch top rated tools:', err);
    }
  }, []);

  // Load more tools (for infinite scroll)
  const loadMore = useCallback(() => {
    if (hasMore && !loading) {
      fetchTools(page + 1, true);
    }
  }, [hasMore, loading, page, fetchTools]);

  // Initial fetch
  useEffect(() => {
    fetchTools(1);
    fetchFeatured();
    fetchTrending();
    fetchNewest();
    fetchTopRated();
  }, [fetchTools, fetchFeatured, fetchTrending, fetchNewest, fetchTopRated]);

  // Refetch when filters change
  useEffect(() => {
    setPage(1);
    fetchTools(1);
  }, [category, search, task, profession, fetchTools]);

  return {
    tools,
    featuredTools,
    trendingTools,
    newestTools,
    topRatedTools,
    totalCount,
    loading,
    error,
    hasMore,
    loadMore,
    refetch: () => fetchTools(1),
  };
}
