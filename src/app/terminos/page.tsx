"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";

export default function TerminosPage() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="mb-4">
              {language === "es" ? "Términos de Servicio" : "Terms of Service"}
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-8">
              {language === "es" ? "Términos de Servicio" : "Terms of Service"}
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                  {language === "es" ? "1. Aceptación de los Términos" : "1. Acceptance of Terms"}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {language === "es"
                    ? "Al acceder y utilizar este sitio web, usted acepta estar sujeto a estos términos de servicio y a todas las leyes y regulaciones aplicables. Si no está de acuerdo con alguno de estos términos, se le prohíbe el uso o acceso a este sitio."
                    : "By accessing and using this website, you agree to be bound by these terms of service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site."}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                  {language === "es" ? "2. Descargo de Responsabilidad de Afiliados" : "2. Affiliate Disclosure"}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {language === "es"
                    ? "Este sitio web participa en programas de afiliados, incluyendo pero no limitado a Amazon Associates, Coursera, y otros programas de afiliados. Como asociado de Amazon, ganamos comisiones por compras calificadas."
                    : "This website participates in affiliate programs, including but not limited to Amazon Associates, Coursera, and other affiliate programs. As an Amazon Associate, we earn commissions from qualifying purchases."}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {language === "es"
                    ? "Al hacer clic en enlaces de afiliados y realizar compras, podemos recibir una comisión sin costo adicional para usted. Esto ayuda a mantener este sitio web y continuar proporcionando contenido gratuito."
                    : "By clicking on affiliate links and making purchases, we may receive a commission at no additional cost to you. This helps maintain this website and continue providing free content."}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                  {language === "es" ? "3. Propiedad Intelectual" : "3. Intellectual Property"}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {language === "es"
                    ? "Todo el contenido de este sitio web, incluyendo texto, gráficos, logotipos, imágenes y software, es propiedad de Ezequiel Gonzalez.IA o sus proveedores de contenido y está protegido por leyes de derechos de autor internacionales."
                    : "All content on this website, including text, graphics, logos, images, and software, is the property of Ezequiel Gonzalez.IA or its content suppliers and is protected by international copyright laws."}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                  {language === "es" ? "4. Enlaces a Terceros" : "4. Third-Party Links"}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {language === "es"
                    ? "Este sitio puede contener enlaces a sitios web de terceros que no son propiedad ni están controlados por Ezequiel Gonzalez.IA. No tenemos control sobre, y no asumimos responsabilidad por, el contenido, las políticas de privacidad o las prácticas de los sitios web de terceros."
                    : "This site may contain links to third-party websites that are not owned or controlled by Ezequiel Gonzalez.IA. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites."}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                  {language === "es" ? "5. Limitación de Responsabilidad" : "5. Limitation of Liability"}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {language === "es"
                    ? "En ningún caso Ezequiel Gonzalez.IA será responsable de daños directos, indirectos, incidentales, especiales, consecuentes o punitivos que resulten de su uso o incapacidad de usar este sitio web."
                    : "In no event shall Ezequiel Gonzalez.IA be liable for any direct, indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use this website."}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                  {language === "es" ? "6. Contacto" : "6. Contact"}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {language === "es"
                    ? "Si tiene alguna pregunta sobre estos Términos de Servicio, puede contactarnos a través de nuestras redes sociales o Ko-fi."
                    : "If you have any questions about these Terms of Service, you can contact us through our social media or Ko-fi."}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center text-muted-foreground text-sm mt-8"
          >
            {language === "es"
              ? "Última actualización: Enero 2025"
              : "Last updated: January 2025"}
          </motion.p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
