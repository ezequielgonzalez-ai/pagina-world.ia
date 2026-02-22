"use client";

import { motion } from "framer-motion";
import { ExternalLink, ShoppingBag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

// Amazon Associates ID
const AMAZON_ASSOCIATES_ID = "ezequielgonza-20";

// Helper function to create Amazon affiliate links
const getAmazonAffiliateUrl = (productId: string) => 
  `https://www.amazon.com/dp/${productId}?tag=${AMAZON_ASSOCIATES_ID}`;

interface AdBannerProps {
  type?: "sidebar" | "featured" | "inline";
}

interface Product {
  title: string;
  titleEs: string;
  productId: string;
  price: string;
  originalPrice?: string;
  description: string;
  descriptionEs: string;
  rating: number;
  reviews: number;
}

// Real Amazon products with affiliate links
const amazonProducts: Product[] = [
  {
    title: "Python for Data Analysis",
    titleEs: "Python para Análisis de Datos",
    productId: "1491957662",
    price: "$29.99",
    originalPrice: "$49.99",
    description: "Essential guide for AI and data science with Python",
    descriptionEs: "Guía esencial para IA y ciencia de datos con Python",
    rating: 4.8,
    reviews: 2341,
  },
  {
    title: "Hands-On Machine Learning with Scikit-Learn",
    titleEs: "Aprendizaje Automático Práctico con Scikit-Learn",
    productId: "1098125975",
    price: "$44.99",
    originalPrice: "$69.99",
    description: "The best-selling guide to machine learning with Python",
    descriptionEs: "La guía más vendida de aprendizaje automático con Python",
    rating: 4.9,
    reviews: 5678,
  },
  {
    title: "Deep Learning (Adaptive Computation)",
    titleEs: "Aprendizaje Profundo (Computación Adaptativa)",
    productId: "0262035618",
    price: "$59.99",
    originalPrice: "$85.00",
    description: "Comprehensive introduction to deep learning",
    descriptionEs: "Introducción completa al aprendizaje profundo",
    rating: 4.7,
    reviews: 3456,
  },
];

export function AdBanner({ type = "inline" }: AdBannerProps) {
  const { language, t } = useLanguage();
  const product = amazonProducts[0];

  if (type === "sidebar") {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border-border/50 overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <Badge
                variant="outline"
                className="text-xs bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
              >
                {t.ads.sponsored}
              </Badge>
              <span className="text-xs text-muted-foreground">Amazon</span>
            </div>
            <div className="text-sm font-medium mb-2 line-clamp-2">
              {language === "es" ? product.titleEs : product.title}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-primary">
                {product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-muted-foreground line-through">
                  {product.originalPrice}
                </span>
              )}
            </div>
            <Button
              asChild
              size="sm"
              className="w-full mt-3 bg-amber-500 hover:bg-amber-600 text-white"
            >
              <a
                href={getAmazonAffiliateUrl(product.productId)}
                target="_blank"
                rel="noopener noreferrer sponsored"
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                {language === "es" ? "Ver en Amazon" : "View on Amazon"}
              </a>
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  if (type === "featured") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-gradient-to-r from-amber-500/10 via-card/50 to-card/50 backdrop-blur-sm border-amber-500/20 overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center gap-6">
              <div className="flex-1">
                <Badge className="mb-3 bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30">
                  {t.ads.featuredProduct}
                </Badge>
                <h3 className="text-xl font-bold mb-2">
                  {language === "es" ? product.titleEs : product.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {language === "es" ? product.descriptionEs : product.description}
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-primary">
                      {product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        {product.originalPrice}
                      </span>
                    )}
                  </div>
                  <Button
                    asChild
                    className="bg-amber-500 hover:bg-amber-600 text-white"
                  >
                    <a
                      href={getAmazonAffiliateUrl(product.productId)}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                    >
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      {language === "es" ? "Ver en Amazon" : "View on Amazon"}
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  // Inline ad
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="col-span-full"
    >
      <Card className="bg-gradient-to-r from-card/80 via-card/60 to-card/80 backdrop-blur-sm border-border/50 overflow-hidden">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Badge
                variant="outline"
                className="text-xs bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
              >
                {t.ads.sponsored}
              </Badge>
              <span className="text-sm font-medium">
                {t.ads.amazonRecommendation}
              </span>
            </div>
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="text-amber-600 dark:text-amber-400 hover:text-amber-500"
            >
              <a
                href={getAmazonAffiliateUrl(product.productId)}
                target="_blank"
                rel="noopener noreferrer sponsored"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function AdGrid() {
  const { language } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-4"
    >
      {amazonProducts.map((product, index) => (
        <motion.div
          key={product.productId}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.4 }}
        >
          <Card className="bg-card/50 dark:bg-card/30 backdrop-blur-sm border-border/50 hover:border-amber-500/30 transition-all duration-300 overflow-hidden h-full">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-0 text-xs">
                  {language === "es" ? "Patrocinado" : "Sponsored"}
                </Badge>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <span>★</span>
                  <span>{product.rating}</span>
                </div>
              </div>
              <h4 className="font-medium text-sm mb-2 line-clamp-2">
                {language === "es" ? product.titleEs : product.title}
              </h4>
              <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                {language === "es" ? product.descriptionEs : product.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-primary">{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-xs text-muted-foreground line-through">
                      {product.originalPrice}
                    </span>
                  )}
                </div>
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="border-amber-500/30 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10"
                >
                  <a
                    href={getAmazonAffiliateUrl(product.productId)}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                  >
                    {language === "es" ? "Ver" : "View"}
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
