export interface PromptPack {
  id: string;
  name: string;
  nameEs: string;
  description: string;
  descriptionEs: string;
  category: PromptCategory;
  prompts: PromptItem[];
  isPremium: boolean;
  ai: "chatgpt" | "claude" | "midjourney" | "dalle" | "gemini" | "general";
  icon: string;
  featured?: boolean;
  downloads: number;
  rating: number;
}

export interface PromptItem {
  id: string;
  title: string;
  titleEs: string;
  prompt: string;
  promptEs: string;
  tags: string[];
}

export type PromptCategory =
  | "business"
  | "creative"
  | "coding"
  | "marketing"
  | "writing"
  | "productivity"
  | "education"
  | "image";

export const promptPacks: PromptPack[] = [
  {
    id: "chatgpt-business-pro",
    name: "Business Pro Pack",
    nameEs: "Pack Business Pro",
    description: "Essential prompts for business professionals, entrepreneurs, and managers",
    descriptionEs: "Prompts esenciales para profesionales de negocios, emprendedores y gerentes",
    category: "business",
    ai: "chatgpt",
    icon: "💼",
    featured: true,
    isPremium: false,
    downloads: 15420,
    rating: 4.8,
    prompts: [
      {
        id: "bp1",
        title: "Executive Summary Generator",
        titleEs: "Generador de Resumen Ejecutivo",
        prompt: "Create a comprehensive executive summary for a business plan about [TOPIC]. Include: 1) Company Overview, 2) Market Analysis, 3) Competitive Advantage, 4) Financial Projections, 5) Key Milestones. Make it compelling for potential investors.",
        promptEs: "Crea un resumen ejecutivo completo para un plan de negocios sobre [TEMA]. Incluye: 1) Descripción de la Empresa, 2) Análisis de Mercado, 3) Ventaja Competitiva, 4) Proyecciones Financieras, 5) Hitos Clave. Hazlo atractivo para inversores potenciales.",
        tags: ["business", "startup", "investment"],
      },
      {
        id: "bp2",
        title: "SWOT Analysis Expert",
        titleEs: "Experto en Análisis FODA",
        prompt: "Perform a detailed SWOT analysis for [COMPANY/PRODUCT]. For each section, provide 5-7 specific points with actionable insights. Include recommendations based on the findings.",
        promptEs: "Realiza un análisis FODA detallado para [EMPRESA/PRODUCTO]. Para cada sección, proporciona 5-7 puntos específicos con insights accionables. Incluye recomendaciones basadas en los hallazgos.",
        tags: ["strategy", "analysis", "business"],
      },
      {
        id: "bp3",
        title: "Negotiation Script Writer",
        titleEs: "Guion de Negociación",
        prompt: "Write a negotiation script for [SCENARIO]. Include opening statements, key arguments, potential objections with responses, and closing strategies. Make it professional and persuasive.",
        promptEs: "Escribe un guion de negociación para [ESCENARIO]. Incluye declaraciones iniciales, argumentos clave, posibles objeciones con respuestas, y estrategias de cierre. Hazlo profesional y persuasivo.",
        tags: ["negotiation", "sales", "communication"],
      },
    ],
  },
  {
    id: "midjourney-artistic",
    name: "Artistic Vision Pack",
    nameEs: "Pack Visión Artística",
    description: "Create stunning artistic images with Midjourney using these carefully crafted prompts",
    descriptionEs: "Crea imágenes artísticas impresionantes con Midjourney usando estos prompts cuidadosamente elaborados",
    category: "image",
    ai: "midjourney",
    icon: "🎨",
    featured: true,
    isPremium: false,
    downloads: 28950,
    rating: 4.9,
    prompts: [
      {
        id: "ma1",
        title: "Cyberpunk City",
        titleEs: "Ciudad Cyberpunk",
        prompt: "A cyberpunk cityscape at night, neon lights reflecting on wet streets, towering holographic advertisements, flying cars, ultra detailed, cinematic lighting, 8k resolution, art by Syd Mead and Simon Stålenhag --ar 16:9 --v 6",
        promptEs: "Un paisaje urbano cyberpunk de noche, luces neón reflejándose en calles mojadas, anuncios holográficos gigantes, coches voladores, ultra detallado, iluminación cinematográfica, resolución 8k, arte de Syd Mead y Simon Stålenhag --ar 16:9 --v 6",
        tags: ["cyberpunk", "city", "neon", "futuristic"],
      },
      {
        id: "ma2",
        title: "Fantasy Portrait",
        titleEs: "Retrato Fantástico",
        prompt: "Ethereal fantasy portrait of a mystical sorceress, flowing silver hair, glowing eyes, ornate magical jewelry, surrounded by floating crystals, dreamy atmosphere, soft lighting, digital art by Artgerm and Charlie Bowater --ar 2:3 --v 6",
        promptEs: "Retrato fantástico etéreo de una hechicera mística, cabello plateado fluyendo, ojos brillantes, joyería mágica ornamental, rodeada de cristales flotantes, atmósfera onírica, iluminación suave, arte digital de Artgerm y Charlie Bowater --ar 2:3 --v 6",
        tags: ["portrait", "fantasy", "magic", "ethereal"],
      },
      {
        id: "ma3",
        title: "Abstract Landscape",
        titleEs: "Paisaje Abstracto",
        prompt: "Abstract landscape interpretation of a mountain range at sunset, geometric shapes, vibrant color gradients, minimalist style, inspired by Kandinsky and Rothko, contemporary art --ar 16:9 --v 6",
        promptEs: "Interpretación abstracta de un paisaje de cordillera al atardecer, formas geométricas, gradientes de color vibrantes, estilo minimalista, inspirado en Kandinsky y Rothko, arte contemporáneo --ar 16:9 --v 6",
        tags: ["abstract", "landscape", "geometric", "minimalist"],
      },
    ],
  },
  {
    id: "coding-master",
    name: "Coding Master Pack",
    nameEs: "Pack Maestro de Código",
    description: "Level up your coding with prompts for debugging, refactoring, and building",
    descriptionEs: "Mejora tu programación con prompts para debugging, refactoring y construcción",
    category: "coding",
    ai: "chatgpt",
    icon: "💻",
    isPremium: false,
    downloads: 12580,
    rating: 4.7,
    prompts: [
      {
        id: "cm1",
        title: "Code Review Expert",
        titleEs: "Experto en Code Review",
        prompt: "Review the following code for: 1) Security vulnerabilities, 2) Performance issues, 3) Best practices, 4) Code smells, 5) Suggested improvements. Provide specific line-by-line feedback:\n\n```\n[PASTE CODE HERE]\n```",
        promptEs: "Revisa el siguiente código buscando: 1) Vulnerabilidades de seguridad, 2) Problemas de rendimiento, 3) Mejores prácticas, 4) Code smells, 5) Mejoras sugeridas. Proporciona feedback específico línea por línea:\n\n```\n[PEGA TU CÓDIGO AQUÍ]\n```",
        tags: ["review", "security", "performance"],
      },
      {
        id: "cm2",
        title: "Algorithm Optimizer",
        titleEs: "Optimizador de Algoritmos",
        prompt: "Analyze this algorithm for time and space complexity. Suggest optimizations and explain the trade-offs. Provide the optimized implementation:\n\n```\n[PASTE ALGORITHM]\n```",
        promptEs: "Analiza este algoritmo para complejidad de tiempo y espacio. Sugiere optimizaciones y explica los trade-offs. Proporciona la implementación optimizada:\n\n```\n[PEGA EL ALGORITMO]\n```",
        tags: ["algorithm", "optimization", "complexity"],
      },
      {
        id: "cm3",
        title: "Test Generator",
        titleEs: "Generador de Tests",
        prompt: "Generate comprehensive unit tests for the following function using Jest/Vitest. Include edge cases, error handling tests, and integration test suggestions:\n\n```\n[PASTE FUNCTION]\n```",
        promptEs: "Genera tests unitarios comprehensivos para la siguiente función usando Jest/Vitest. Incluye casos borde, tests de manejo de errores, y sugerencias de tests de integración:\n\n```\n[PEGA LA FUNCIÓN]\n```",
        tags: ["testing", "jest", "unit-tests"],
      },
    ],
  },
  {
    id: "content-creator",
    name: "Content Creator Pack",
    nameEs: "Pack Creador de Contenido",
    description: "Perfect prompts for YouTubers, bloggers, and social media creators",
    descriptionEs: "Prompts perfectos para YouTubers, bloggers y creadores de redes sociales",
    category: "marketing",
    ai: "chatgpt",
    icon: "📱",
    featured: true,
    isPremium: false,
    downloads: 18750,
    rating: 4.6,
    prompts: [
      {
        id: "cc1",
        title: "YouTube Script Writer",
        titleEs: "Guionista de YouTube",
        prompt: "Write an engaging YouTube video script about [TOPIC]. Include: 1) Hook (first 10 seconds), 2) Introduction, 3) Main content with 3-5 key points, 4) B-roll suggestions, 5) Call to action. Target length: 10-12 minutes. Style: [EDUCATIONAL/ENTERTAINING/MIXED]",
        promptEs: "Escribe un guion atractivo para video de YouTube sobre [TEMA]. Incluye: 1) Hook (primeros 10 segundos), 2) Introducción, 3) Contenido principal con 3-5 puntos clave, 4) Sugerencias de B-roll, 5) Llamada a la acción. Duración objetivo: 10-12 minutos. Estilo: [EDUCATIVO/ENTRETENIDO/MIXTO]",
        tags: ["youtube", "video", "script"],
      },
      {
        id: "cc2",
        title: "Viral Thread Writer",
        titleEs: "Creador de Hilos Virales",
        prompt: "Create a viral Twitter/X thread about [TOPIC]. Make it: 1) Attention-grabbing first tweet, 2) Value-packed content, 3) Easy to read format, 4) Include data/insights, 5) Strong ending with CTA. Length: 8-12 tweets.",
        promptEs: "Crea un hilo viral de Twitter/X sobre [TEMA]. Hazlo: 1) Primer tweet que capte la atención, 2) Contenido lleno de valor, 3) Formato fácil de leer, 4) Incluye datos/insights, 5) Fuerte final con CTA. Longitud: 8-12 tweets.",
        tags: ["twitter", "thread", "viral"],
      },
      {
        id: "cc3",
        title: "Blog Post Outline",
        titleEs: "Estructura de Blog Post",
        prompt: "Create a detailed blog post outline for [TOPIC]. Include: 1) SEO-optimized title options, 2) Meta description, 3) H2/H3 structure, 4) Key points for each section, 5) Internal linking suggestions, 6) FAQ section. Target word count: [WORDS]",
        promptEs: "Crea un esquema detallado de blog post para [TEMA]. Incluye: 1) Opciones de título optimizado para SEO, 2) Meta descripción, 3) Estructura H2/H3, 4) Puntos clave de cada sección, 5) Sugerencias de enlaces internos, 6) Sección FAQ. Palabras objetivo: [PALABRAS]",
        tags: ["blog", "seo", "content"],
      },
    ],
  },
  {
    id: "creative-writing",
    name: "Creative Writing Pack",
    nameEs: "Pack Escritura Creativa",
    description: "Unlock your creativity with prompts for stories, poetry, and creative content",
    descriptionEs: "Desbloquea tu creatividad con prompts para historias, poesía y contenido creativo",
    category: "creative",
    ai: "claude",
    icon: "✨",
    isPremium: false,
    downloads: 9840,
    rating: 4.8,
    prompts: [
      {
        id: "cw1",
        title: "Story Starter",
        titleEs: "Inicio de Historia",
        prompt: "Write the opening chapter of a [GENRE] story with the following premise: [PREMISE]. Create compelling characters, establish the setting vividly, and end with a hook that makes readers want to continue. Tone: [TONE]. Length: ~1000 words.",
        promptEs: "Escribe el primer capítulo de una historia de [GÉNERO] con la siguiente premisa: [PREMISA]. Crea personajes convincentes, establece el escenario vívidamente, y termina con un hook que haga querer seguir leyendo. Tono: [TONO]. Longitud: ~1000 palabras.",
        tags: ["story", "fiction", "creative"],
      },
      {
        id: "cw2",
        title: "Character Developer",
        titleEs: "Desarrollador de Personajes",
        prompt: "Create a detailed character profile for a [ROLE] in a [GENRE] story. Include: 1) Physical description, 2) Personality traits (with flaws), 3) Background story, 4) Motivations and fears, 5) Speaking style, 6) Character arc potential.",
        promptEs: "Crea un perfil detallado de personaje para un [ROL] en una historia de [GÉNERO]. Incluye: 1) Descripción física, 2) Rasgos de personalidad (con defectos), 3) Historia de fondo, 4) Motivaciones y miedos, 5) Estilo de habla, 6) Potencial de arco de personaje.",
        tags: ["character", "development", "storytelling"],
      },
    ],
  },
  {
    id: "productivity-boost",
    name: "Productivity Boost Pack",
    nameEs: "Pack Productividad Boost",
    description: "Maximize your efficiency with these productivity-focused prompts",
    descriptionEs: "Maximiza tu eficiencia con estos prompts enfocados en productividad",
    category: "productivity",
    ai: "chatgpt",
    icon: "🚀",
    isPremium: false,
    downloads: 14320,
    rating: 4.5,
    prompts: [
      {
        id: "pb1",
        title: "Daily Planner",
        titleEs: "Planificador Diario",
        prompt: "Help me plan my day efficiently. I have these tasks: [LIST TASKS]. My priorities are: [PRIORITIES]. Available hours: [HOURS]. Create a time-blocked schedule that maximizes productivity and includes breaks.",
        promptEs: "Ayúdame a planificar mi día eficientemente. Tengo estas tareas: [LISTA TAREAS]. Mis prioridades son: [PRIORIDADES]. Horas disponibles: [HORAS]. Crea un horario con bloques de tiempo que maximice la productividad e incluya descansos.",
        tags: ["planning", "time-management", "daily"],
      },
      {
        id: "pb2",
        title: "Goal Breakdown",
        titleEs: "Desglose de Metas",
        prompt: "Break down my goal of [GOAL] into actionable steps. Create a SMART goal framework, identify milestones, potential obstacles, and weekly action items for the next 4 weeks.",
        promptEs: "Desglosa mi meta de [META] en pasos accionables. Crea un marco SMART, identifica hitos, obstáculos potenciales, y acciones semanales para las próximas 4 semanas.",
        tags: ["goals", "planning", "achievement"],
      },
    ],
  },
  {
    id: "dalle-photography",
    name: "DALL-E Photography Pack",
    nameEs: "Pack Fotografía DALL-E",
    description: "Create photorealistic images with DALL-E using these professional prompts",
    descriptionEs: "Crea imágenes fotorrealistas con DALL-E usando estos prompts profesionales",
    category: "image",
    ai: "dalle",
    icon: "📷",
    isPremium: true,
    downloads: 8650,
    rating: 4.7,
    prompts: [
      {
        id: "dp1",
        title: "Product Photography",
        titleEs: "Fotografía de Producto",
        prompt: "Professional product photography of [PRODUCT], clean white background, studio lighting, high-end commercial style, 4k quality, sharp focus, slight reflection on surface",
        promptEs: "Fotografía profesional de producto de [PRODUCTO], fondo blanco limpio, iluminación de estudio, estilo comercial de alta gama, calidad 4k, enfoque nítido, ligero reflejo en superficie",
        tags: ["product", "commercial", "studio"],
      },
      {
        id: "dp2",
        title: "Portrait Photography",
        titleEs: "Fotografía de Retrato",
        prompt: "Professional portrait photograph of [SUBJECT], natural lighting, shallow depth of field, bokeh background, Canon EOS R5 style, editorial quality, warm tones",
        promptEs: "Fotografía de retrato profesional de [SUJETO], iluminación natural, poca profundidad de campo, fondo bokeh, estilo Canon EOS R5, calidad editorial, tonos cálidos",
        tags: ["portrait", "editorial", "professional"],
      },
    ],
  },
];

export const promptCategories = [
  { id: "business", icon: "💼", nameEn: "Business", nameEs: "Negocios" },
  { id: "creative", icon: "✨", nameEn: "Creative", nameEs: "Creativo" },
  { id: "coding", icon: "💻", nameEn: "Coding", nameEs: "Programación" },
  { id: "marketing", icon: "📱", nameEn: "Marketing", nameEs: "Marketing" },
  { id: "writing", icon: "✍️", nameEn: "Writing", nameEs: "Escritura" },
  { id: "productivity", icon: "🚀", nameEn: "Productivity", nameEs: "Productividad" },
  { id: "education", icon: "📚", nameEn: "Education", nameEs: "Educación" },
  { id: "image", icon: "🎨", nameEn: "Image Generation", nameEs: "Generación de Imágenes" },
];
