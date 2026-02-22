"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { categories } from "@/lib/tools-data";
import { useLanguage } from "@/contexts/LanguageContext";

export default function SubmitPage() {
  const { language } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    description: "",
    category: "",
    pricing: "freemium",
    email: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.url || !formData.description || !formData.category) {
      setError(language === "es" ? "Por favor completa todos los campos requeridos" : "Please complete all required fields");
      return;
    }

    // Here you would normally send to an API
    console.log("Submitted:", formData);
    setSubmitted(true);
    setError("");
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar onSearch={() => {}} searchQuery="" />
        <main className="relative z-10 pt-24 pb-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-lg mx-auto text-center py-16"
            >
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
              <h1 className="text-3xl font-bold mb-4">
                {language === "es" ? "¡Gracias por tu envío!" : "Thank you for your submission!"}
              </h1>
              <p className="text-muted-foreground mb-8">
                {language === "es"
                  ? "Hemos recibido tu sugerencia. Nuestro equipo la revisará y la añadirá a nuestro directorio si cumple con nuestros criterios."
                  : "We've received your suggestion. Our team will review it and add it to our directory if it meets our criteria."}
              </p>
              <Button onClick={() => setSubmitted(false)}>
                {language === "es" ? "Enviar otra herramienta" : "Submit another tool"}
              </Button>
            </motion.div>
          </div>
        </main>
        <Footer />
        <CookieBanner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar onSearch={() => {}} searchQuery="" />
      
      <main className="relative z-10 pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <Send className="w-8 h-8 inline-block mr-2 text-primary" />
              {language === "es" ? "Enviar Herramienta" : "Submit Tool"}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {language === "es"
                ? "¿Conoces una herramienta de IA que no está en nuestro directorio? ¡Compártela con nosotros!"
                : "Know an AI tool that's not in our directory? Share it with us!"}
            </p>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-lg mx-auto"
          >
            <Card>
              <CardHeader>
                <CardTitle>{language === "es" ? "Información de la herramienta" : "Tool Information"}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="flex items-center gap-2 p-3 bg-destructive/10 text-destructive rounded-lg">
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-sm">{error}</span>
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      {language === "es" ? "Nombre de la herramienta *" : "Tool Name *"}
                    </Label>
                    <Input
                      id="name"
                      placeholder={language === "es" ? "Ej: ChatGPT" : "E.g.: ChatGPT"}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="url">
                      {language === "es" ? "URL del sitio web *" : "Website URL *"}
                    </Label>
                    <Input
                      id="url"
                      type="url"
                      placeholder="https://example.com"
                      value={formData.url}
                      onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">
                      {language === "es" ? "Descripción *" : "Description *"}
                    </Label>
                    <Textarea
                      id="description"
                      placeholder={language === "es" ? "Describe brevemente qué hace la herramienta..." : "Briefly describe what the tool does..."}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">
                      {language === "es" ? "Categoría *" : "Category *"}
                    </Label>
                    <select
                      id="category"
                      className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      <option value="">{language === "es" ? "Seleccionar categoría" : "Select category"}</option>
                      {categories.slice(1).map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.icon} {cat.id}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pricing">
                      {language === "es" ? "Modelo de precios" : "Pricing Model"}
                    </Label>
                    <select
                      id="pricing"
                      className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={formData.pricing}
                      onChange={(e) => setFormData({ ...formData, pricing: e.target.value })}
                    >
                      <option value="free">{language === "es" ? "Gratis" : "Free"}</option>
                      <option value="freemium">Freemium</option>
                      <option value="paid">{language === "es" ? "De pago" : "Paid"}</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">
                      {language === "es" ? "Tu email (opcional)" : "Your email (optional)"}
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    <Send className="w-4 h-4 mr-2" />
                    {language === "es" ? "Enviar herramienta" : "Submit tool"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
      <CookieBanner />
    </div>
  );
}
