import { NextResponse } from 'next/server';
import { aiTools, categories, popularTasks, professionFilters, aiGlossary } from '@/lib/tools-data';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '50');
  const category = searchParams.get('category') || 'all';
  const search = searchParams.get('search') || '';
  const featured = searchParams.get('featured') === 'true';
  const trending = searchParams.get('trending') === 'true';
  const newest = searchParams.get('newest') === 'true';
  const topRated = searchParams.get('topRated') === 'true';

  let filteredTools = [...aiTools];

  // Filter by category
  if (category && category !== 'all') {
    filteredTools = filteredTools.filter(tool => tool.category === category);
  }

  // Filter by search
  if (search) {
    const searchLower = search.toLowerCase();
    filteredTools = filteredTools.filter(
      tool =>
        tool.name.toLowerCase().includes(searchLower) ||
        tool.description.toLowerCase().includes(searchLower) ||
        tool.descriptionEs.toLowerCase().includes(searchLower)
    );
  }

  // Filter by featured
  if (featured) {
    filteredTools = filteredTools.filter(tool => tool.featured);
  }

  // Filter by trending
  if (trending) {
    filteredTools = filteredTools.filter(tool => tool.trending);
  }

  // Filter by newest
  if (newest) {
    filteredTools = filteredTools.filter(tool => tool.isNew);
  }

  // Filter by top rated
  if (topRated) {
    filteredTools = filteredTools
      .filter(tool => tool.rating && tool.rating >= 4.5)
      .sort((a, b) => (b.rating || 0) - (a.rating || 0));
  }

  // Calculate pagination
  const total = filteredTools.length;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const paginatedTools = filteredTools.slice(startIndex, startIndex + limit);

  return NextResponse.json({
    tools: paginatedTools,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasMore: page < totalPages,
    },
    categories: categories,
    popularTasks: popularTasks,
    professionFilters: professionFilters,
    aiGlossary: aiGlossary,
    totalCount: aiTools.length,
  });
}
