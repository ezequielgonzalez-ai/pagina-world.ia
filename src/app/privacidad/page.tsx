"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";

export default function PrivacidadPage() {
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
              {language === "es" ? "Política de Privacidad" : "Privacy Policy"}
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-8">
              {language === "es" ? "Política de Privacidad" : "Privacy Policy"}
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
                  {language === "es" ? "1. Información que Recopilamos" : "1. Information We Collect"}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {language === "es"
                    ? "Recopilamos información de manera automática cuando visita nuestro sitio web, incluyendo:"
                    : "We collect information automatically when you visit our website, including:"}
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>{language === "es" ? "Dirección IP" : "IP address"}</li>
                  <li>{language === "es" ? "Tipo de navegador y dispositivo" : "Browser and device type"}</li>
                  <li>{language === "es" ? "Páginas visitadas y tiempo de permanencia" : "Pages visited and time spent"}</li>
                  <li>{language === "es" ? "Preferencias de idioma y tema" : "Language and theme preferences"}</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                  {language === "es" ? "2. Uso de Cookies" : "2. Use of Cookies"}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {language === "es"
                    ? "Utilizamos cookies y tecnologías similares para mejorar su experiencia, analizar el uso del sitio y personalizar contenido. Puede gestionar sus preferencias de cookies a través de nuestro banner de cookies o la configuración de su navegador."
                    : "We use cookies and similar technologies to improve your experience, analyze site usage, and personalize content. You can manage your cookie preferences through our cookie banner or your browser settings."}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                  {language === "es" ? "3. Servicios de Terceros" : "3. Third-Party Services"}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {language === "es"
                    ? "Utilizamos los siguientes servicios de terceros que pueden recopilar datos:"
                    : "We use the following third-party services that may collect data:"}
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li><strong>Google AdSense:</strong> {language === "es" ? "Para mostrar anuncios personalizados" : "To display personalized ads"}</li>
                  <li><strong>Amazon Associates:</strong> {language === "es" ? "Para enlaces de afiliados" : "For affiliate links"}</li>
                  <li><strong>Vercel Analytics:</strong> {language === "es" ? "Para análisis del sitio" : "For site analytics"}</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                  {language === "es" ? "4. Divulgación de Afiliados" : "4. Affiliate Disclosure"}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {language === "es"
                    ? "Este sitio participa en el Programa de Asociados de Amazon Services LLC, un programa de publicidad de afiliados diseñado para proporcionar un medio para que los sitios ganen tarifas de publicidad mediante la publicidad y los enlaces a Amazon.com. También participamos en otros programas de afiliados."
                    : "This site participates in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com. We also participate in other affiliate programs."}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                  {language === "es" ? "5. Sus Derechos" : "5. Your Rights"}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {language === "es"
                    ? "Bajo el RGPD y otras leyes de privacidad, usted tiene los siguientes derechos:"
                    : "Under GDPR and other privacy laws, you have the following rights:"}
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>{language === "es" ? "Derecho de acceso a sus datos personales" : "Right to access your personal data"}</li>
                  <li>{language === "es" ? "Derecho de rectificación de datos inexactos" : "Right to rectify inaccurate data"}</li>
                  <li>{language === "es" ? "Derecho de eliminación de sus datos" : "Right to erasure of your data"}</li>
                  <li>{language === "es" ? "Derecho a oponerse al procesamiento" : "Right to object to processing"}</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                  {language === "es" ? "6. Contacto" : "6. Contact"}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {language === "es"
                    ? "Si tiene preguntas sobre esta Política de Privacidad, puede contactarnos a través de Instagram (@m.ezequiel.gonzalez) o LinkedIn."
                    : "If you have questions about this Privacy Policy, you can contact us through Instagram (@m.ezequiel.gonzalez) or LinkedIn."}
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
