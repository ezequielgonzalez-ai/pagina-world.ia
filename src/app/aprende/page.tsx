"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Play, FileText, Video, GraduationCap, Star, ExternalLink, Clock, Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const courses = [
  {
    id: 1,
    title: "Machine Learning con Python",
    titleEs: "Machine Learning con Python",
    description: "Complete course on ML fundamentals",
    descriptionEs: "Curso completo sobre fundamentos de ML",
    platform: "Coursera",
    duration: "60 horas",
    students: "500K+",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400",
    url: "https://www.coursera.org/learn/machine-learning",
    featured: true,
    free: false
  },
  {
    id: 2,
    title: "Deep Learning Specialization",
    titleEs: "Especialización en Deep Learning",
    description: "Master neural networks and deep learning",
    descriptionEs: "Domina redes neuronales y deep learning",
    platform: "Coursera",
    duration: "80 horas",
    students: "300K+",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400",
    url: "https://www.coursera.org/specializations/deep-learning",
    featured: true,
    free: false
  },
  {
    id: 3,
    title: "AI for Everyone",
    titleEs: "IA para Todos",
    description: "Introduction to AI for non-technical people",
    descriptionEs: "Introducción a IA para no técnicos",
    platform: "Coursera",
    duration: "6 horas",
    students: "1M+",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400",
    url: "https://www.coursera.org/learn/ai-for-everyone",
    featured: true,
    free: true
  },
  {
    id: 4,
    title: "ChatGPT Prompt Engineering",
    titleEs: "Ingeniería de Prompts ChatGPT",
    description: "Master the art of prompt engineering",
    descriptionEs: "Domina el arte de la ingeniería de prompts",
    platform: "DeepLearning.AI",
    duration: "3 horas",
    students: "800K+",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1676299081847-5f74f0c7f5e7?w=400",
    url: "https://www.deeplearning.ai/short-courses/",
    featured: false,
    free: true
  },
  {
    id: 5,
    title: "Python for Data Science",
    titleEs: "Python para Ciencia de Datos",
    description: "Learn Python for data analysis",
    descriptionEs: "Aprende Python para análisis de datos",
    platform: "edX",
    duration: "40 horas",
    students: "400K+",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400",
    url: "https://www.edx.org/learn/python",
    featured: false,
    free: true
  },
  {
    id: 6,
    title: "Natural Language Processing",
    titleEs: "Procesamiento de Lenguaje Natural",
    description: "Build NLP models and applications",
    descriptionEs: "Construye modelos y aplicaciones de PLN",
    platform: "Coursera",
    duration: "50 horas",
    students: "200K+",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400",
    url: "https://www.coursera.org/specializations/natural-language-processing",
    featured: false,
    free: false
  }
];

const resources = [
  { title: "Documentación OpenAI", titleEs: "OpenAI Documentation", icon: FileText, url: "https://platform.openai.com/docs" },
  { title: "Hugging Face Models", titleEs: "Modelos Hugging Face", icon: BookOpen, url: "https://huggingface.co/models" },
  { title: "Papers With Code", titleEs: "Papers With Code", icon: FileText, url: "https://paperswithcode.com" },
  { title: "Kaggle Competitions", titleEs: "Competiciones Kaggle", icon: GraduationCap, url: "https://www.kaggle.com/competitions" },
];

export default function AprendePage() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <Badge className="mb-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-600 dark:text-blue-400 border-blue-500/30">
              <GraduationCap className="w-4 h-4 mr-2" />
              {language === "es" ? "Centro de Aprendizaje" : "Learning Center"}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {language === "es" ? "Aprende IA desde Cero" : "Learn AI from Scratch"}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {language === "es"
                ? "Los mejores cursos, recursos y materiales para dominar la Inteligencia Artificial."
                : "The best courses, resources, and materials to master Artificial Intelligence."}
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          >
            {[
              { value: "6+", label: language === "es" ? "Cursos" : "Courses" },
              { value: "3M+", label: language === "es" ? "Estudiantes" : "Students" },
              { value: "Free", label: language === "es" ? "Gratis" : "Free" },
              { value: "4.8★", label: language === "es" ? "Rating" : "Rating" },
            ].map((stat, index) => (
              <Card key={index} className="bg-card/50 backdrop-blur-sm border-border/50 text-center p-4">
                <div className="text-2xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </Card>
            ))}
          </motion.div>

          {/* Featured Courses */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <div className="flex items-center gap-2 mb-6">
              <Star className="w-6 h-6 text-yellow-500" />
              <h2 className="text-2xl font-bold">
                {language === "es" ? "Cursos Destacados" : "Featured Courses"}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {courses.filter(c => c.featured).map((course, index) => (
                <CourseCard key={course.id} course={course} index={index} language={language} />
              ))}
            </div>
          </motion.div>

          {/* All Courses */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">
                {language === "es" ? "Todos los Cursos" : "All Courses"}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course, index) => (
                <CourseCard key={course.id} course={course} index={index} language={language} />
              ))}
            </div>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <FileText className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">
                {language === "es" ? "Recursos Útiles" : "Useful Resources"}
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {resources.map((resource, index) => (
                <motion.a
                  key={index}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                >
                  <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all p-4 text-center h-full">
                    <resource.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                    <h3 className="font-semibold text-sm">
                      {language === "es" ? resource.titleEs : resource.title}
                    </h3>
                  </Card>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function CourseCard({ course, index, language }: { course: typeof courses[0]; index: number; language: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4 }}
    >
      <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all overflow-hidden h-full group">
        <div className="relative h-40 overflow-hidden">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {course.free && (
            <Badge className="absolute top-2 right-2 bg-green-500 text-white">
              {language === "es" ? "Gratis" : "Free"}
            </Badge>
          )}
          <Badge className="absolute top-2 left-2 bg-black/70 text-white">
            {course.platform}
          </Badge>
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-1 line-clamp-2 group-hover:text-primary transition-colors">
            {language === "es" ? course.titleEs : course.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {language === "es" ? course.descriptionEs : course.description}
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {course.duration}
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {course.students}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="font-bold">{course.rating}</span>
            </div>
            <Button asChild size="sm" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              <a href={course.url} target="_blank" rel="noopener noreferrer">
                {language === "es" ? "Ver Curso" : "View Course"}
                <ExternalLink className="w-3 h-3 ml-2" />
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
