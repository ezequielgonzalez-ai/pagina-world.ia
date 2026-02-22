"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Star, ExternalLink, TrendingUp, Sparkles } from "lucide-react";
import { products, productCategories, getAmazonUrl, type Product, type ProductCategory } from "@/lib/products-data";
import { useLanguage } from "@/contexts/LanguageContext";

export default function TiendaPage() {
  const { language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<ProductCategory | "all">("all");

  const filteredProducts = activeCategory === "all" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <Badge className="mb-4 bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30">
              <ShoppingBag className="w-4 h-4 mr-2" />
              {language === "es" ? "Tienda Oficial" : "Official Store"}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {language === "es" ? "Tienda WORLD.IA" : "WORLD.IA Store"}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {language === "es"
                ? "Los mejores productos para tu setup de IA y tecnología. Laptops, monitores, libros y más con ofertas exclusivas."
                : "The best products for your AI setup and technology. Laptops, monitors, books and more with exclusive deals."}
            </p>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            <Button
              onClick={() => setActiveCategory("all")}
              variant={activeCategory === "all" ? "default" : "outline"}
              className={activeCategory === "all" 
                ? "bg-gradient-to-r from-primary to-blue-500 text-white" 
                : ""}
            >
              {language === "es" ? "Todos" : "All"}
            </Button>
            {productCategories.map((cat) => (
              <Button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                variant={activeCategory === cat.id ? "default" : "outline"}
                className={activeCategory === cat.id 
                  ? "bg-gradient-to-r from-primary to-blue-500 text-white" 
                  : ""}
              >
                <span className="mr-2">{cat.icon}</span>
                {language === "es" ? cat.nameEs : cat.name}
              </Button>
            ))}
          </motion.div>

          {/* Featured Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <Card className="bg-gradient-to-r from-amber-500/10 via-card to-orange-500/10 border-amber-500/20 overflow-hidden">
              <CardContent className="p-8 text-center">
                <TrendingUp className="w-10 h-10 text-amber-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">
                  {language === "es" ? "Ofertas Especiales" : "Special Deals"}
                </h2>
                <p className="text-muted-foreground">
                  {language === "es"
                    ? "Hasta 36% de descuento en productos seleccionados"
                    : "Up to 36% off on selected products"}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Products Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} language={language} />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { value: "20+", label: language === "es" ? "Productos" : "Products" },
              { value: "Amazon", label: language === "es" ? "Prime" : "Prime" },
              { value: "24h", label: language === "es" ? "Envío" : "Shipping" },
              { value: "4.8★", label: language === "es" ? "Rating" : "Rating" },
            ].map((stat, index) => (
              <Card key={index} className="bg-card/50 backdrop-blur-sm border-border/50 text-center p-4">
                <div className="text-2xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </Card>
            ))}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function ProductCard({ product, index, language }: { product: Product; index: number; language: string }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4 }}
    >
      <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 overflow-hidden group h-full">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.bestseller && (
              <Badge className="bg-amber-500 text-white text-xs">
                <TrendingUp className="w-3 h-3 mr-1" />
                Bestseller
              </Badge>
            )}
            {product.discount && (
              <Badge className="bg-red-500 text-white text-xs">
                -{product.discount}%
              </Badge>
            )}
          </div>

          {/* Amazon Badge */}
          <Badge className="absolute top-2 right-2 bg-black/70 text-white text-xs">
            Amazon
          </Badge>
        </div>

        <CardContent className="p-4">
          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
              />
            ))}
            <span className="text-xs text-muted-foreground ml-1">
              ({product.reviews.toLocaleString()})
            </span>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-sm mb-1 line-clamp-2 group-hover:text-primary transition-colors">
            {language === "es" ? product.nameEs : product.name}
          </h3>

          {/* Description */}
          <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
            {language === "es" ? product.descriptionEs : product.description}
          </p>

          {/* Price */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg font-bold text-primary">{product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {product.originalPrice}
              </span>
            )}
          </div>

          {/* CTA */}
          <Button
            asChild
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
          >
            <a
              href={getAmazonUrl(product.amazonId)}
              target="_blank"
              rel="noopener noreferrer sponsored"
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              {language === "es" ? "Ver en Amazon" : "View on Amazon"}
              <ExternalLink className="w-3 h-3 ml-2" />
            </a>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
