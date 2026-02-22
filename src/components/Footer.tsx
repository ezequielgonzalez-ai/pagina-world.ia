"use client";

import { motion } from "framer-motion";
import { Heart, ExternalLink, Twitter, Linkedin, Instagram, Youtube, ShoppingBag, Trophy, BookOpen, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/contexts/LanguageContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const socialLinks = [
  { icon: Twitter, href: "https://x.com/MGonzalez85598", label: "X (Twitter)" },
  { icon: Instagram, href: "https://www.instagram.com/m.ezequiel.gonzalez/", label: "Instagram" },
  { icon: Youtube, href: "https://www.youtube.com/@Mat%C3%ADasEzequielGonz%C3%A1lez-d4d6v", label: "YouTube" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/matiasezequielgonzalez/", label: "LinkedIn" },
];

const categoryLinks = [
  { href: "#audio", labelKey: "audio" as const },
  { href: "#images", labelKey: "images" as const },
  { href: "#video", labelKey: "video" as const },
  { href: "#chat", labelKey: "chat" as const },
  { href: "#coding", labelKey: "coding" as const },
  { href: "#productivity", labelKey: "productivity" as const },
];

export function Footer() {
  const { t, language } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-20 border-t border-border/50 bg-card/30 dark:bg-card/20 backdrop-blur-sm">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 py-12 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12 border-2 border-primary/20">
                <AvatarImage src="/avatar.png" alt="WORLD.IA" />
                <AvatarFallback>WI</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-bold text-lg bg-gradient-to-r from-primary via-purple-500 to-blue-500 bg-clip-text text-transparent">
                  WORLD.IA
                </h3>
                <p className="text-xs text-muted-foreground">Tu Mundo de IA</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t.footer.description}
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-full bg-muted/50 hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <h4 className="font-semibold text-foreground">{language === "es" ? "Navegación" : "Navigation"}</h4>
            <nav className="flex flex-col gap-2">
              <FooterLink href="/">{language === "es" ? "Inicio" : "Home"}</FooterLink>
              <FooterLink href="/#tools">{language === "es" ? "Directorio IA" : "AI Directory"}</FooterLink>
              <FooterLink href="/tienda">{language === "es" ? "Tienda" : "Store"}</FooterLink>
              <FooterLink href="/rankings">{language === "es" ? "Rankings" : "Rankings"}</FooterLink>
              <FooterLink href="/aprende">{language === "es" ? "Aprende" : "Learn"}</FooterLink>
            </nav>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h4 className="font-semibold text-foreground">{language === "es" ? "Categorías" : "Categories"}</h4>
            <nav className="flex flex-col gap-2">
              <FooterLink href="/tienda?category=laptops">{language === "es" ? "Laptops" : "Laptops"}</FooterLink>
              <FooterLink href="/tienda?category=books">{language === "es" ? "Libros IA" : "AI Books"}</FooterLink>
              <FooterLink href="/tienda?category=peripherals">{language === "es" ? "Periféricos" : "Peripherals"}</FooterLink>
              <FooterLink href="/rankings">{language === "es" ? "Top IAs" : "Top AIs"}</FooterLink>
            </nav>
          </motion.div>

          {/* Legal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h4 className="font-semibold text-foreground">{language === "es" ? "Legal" : "Legal"}</h4>
            <nav className="flex flex-col gap-2">
              <FooterLink href="/privacidad">{language === "es" ? "Privacidad" : "Privacy"}</FooterLink>
              <FooterLink href="/terminos">{language === "es" ? "Términos" : "Terms"}</FooterLink>
              <FooterLink href="/cookies">{language === "es" ? "Cookies" : "Cookies"}</FooterLink>
              <FooterLink href="https://ko-fi.com/ezequielia">{language === "es" ? "Donar" : "Donate"}</FooterLink>
            </nav>
          </motion.div>
        </div>

        <Separator className="mb-8 opacity-50" />

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground"
        >
          <div className="flex items-center gap-1">
            <span>© {currentYear} WORLD.IA.</span>
            <span>{language === "es" ? "Todos los derechos reservados." : "All rights reserved."}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>{t.footer.madeWith}</span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            </motion.span>
            <span>& AI</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="text-sm text-muted-foreground hover:text-primary transition-colors relative group w-fit"
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
    </a>
  );
}
