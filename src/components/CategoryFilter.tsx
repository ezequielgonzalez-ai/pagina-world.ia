"use client";

import { motion } from "framer-motion";
import { categories, CategoryId } from "@/lib/tools-data";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  activeCategory: CategoryId;
  onCategoryChange: (category: CategoryId) => void;
}

export function CategoryFilter({
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  const { t } = useLanguage();

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      {categories.map((category, index) => (
        <motion.button
          key={category.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05, duration: 0.3 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onCategoryChange(category.id)}
          className={cn(
            "relative px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
            "flex items-center gap-2",
            activeCategory === category.id
              ? "text-primary-foreground shadow-lg"
              : "bg-card/50 dark:bg-card/30 text-foreground hover:bg-card/80 border border-border/50"
          )}
        >
          {activeCategory === category.id && (
            <motion.div
              layoutId="activeCategory"
              className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 rounded-full"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative z-10 text-base">{category.icon}</span>
          <span className="relative z-10">
            {t.categories[category.id as keyof typeof t.categories]}
          </span>
        </motion.button>
      ))}
    </div>
  );
}
