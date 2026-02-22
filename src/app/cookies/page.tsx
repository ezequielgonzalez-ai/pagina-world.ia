"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";

export default function CookiesPage() {
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
              {language === "es" ? "Política de Cookies" : "Cookies Policy"}
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-8">
              {language === "es" ? "Política de Cookies" : "Cookies Policy"}
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
                  {language === "es" ? "¿Qué son las Cookies?" : "What are Cookies?"}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {language === "es"
                    ? "Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita un sitio web. Se utilizan para recordar sus preferencias y mejorar su experiencia de navegación."
                    : "Cookies are small text files that are stored on your device when you visit a website. They are used to remember your preferences and improve your browsing experience."}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                  {language === "es" ? "Cookies que Utilizamos" : "Cookies We Use"}
                </h2>
                <div className="space-y-4">
                  <div className="border-b border-border/30 pb-4">
                    <h3 className="font-medium mb-2">{language === "es" ? "Cookies Esenciales" : "Essential Cookies"}</h3>
                    <p className="text-muted-foreground text-sm">
                      {language === "es"
                        ? "Necesarias para el funcionamiento básico del sitio. Incluyen preferencias de tema, idioma y consentimiento de cookies."
                        : "Necessary for basic site functionality. Include theme preferences, language, and cookie consent."}
                    </p>
                  </div>
                  <div className="border-b border-border/30 pb-4">
                    <h3 className="font-medium mb-2">{language === "es" ? "Cookies de Análisis" : "Analytics Cookies"}</h3>
                    <p className="text-muted-foreground text-sm">
                      {language === "es"
                        ? "Nos ayudan a entender cómo los visitantes interactúan con el sitio, permitiéndonos mejorar la experiencia del usuario."
                        : "Help us understand how visitors interact with the site, allowing us to improve the user experience."}
                    </p>
                  </div>
                  <div className="border-b border-border/30 pb-4">
                    <h3 className="font-medium mb-2">{language === "es" ? "Cookies de Publicidad" : "Advertising Cookies"}</h3>
                    <p className="text-muted-foreground text-sm">
                      {language === "es"
                        ? "Utilizadas por Google AdSense para mostrar anuncios relevantes. Estas cookies rastrean su comportamiento de navegación para personalizar anuncios."
                        : "Used by Google AdSense to display relevant ads. These cookies track your browsing behavior to personalize ads."}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">{language === "es" ? "Cookies de Afiliados" : "Affiliate Cookies"}</h3>
                    <p className="text-muted-foreground text-sm">
                      {language === "es"
                        ? "Utilizadas por Amazon Associates y otros programas de afiliados para rastrear referencias y calcular comisiones."
                        : "Used by Amazon Associates and other affiliate programs to track referrals and calculate commissions."}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                  {language === "es" ? "Cómo Gestionar las Cookies" : "How to Manage Cookies"}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {language === "es"
                    ? "Puede gestionar sus preferencias de cookies de las siguientes maneras:"
                    : "You can manage your cookie preferences in the following ways:"}
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>{language === "es" ? "A través de nuestro banner de cookies en el sitio" : "Through our cookie banner on the site"}</li>
                  <li>{language === "es" ? "Configurando su navegador para rechazar cookies" : "Setting your browser to reject cookies"}</li>
                  <li>{language === "es" ? "Eliminando cookies existentes de su dispositivo" : "Deleting existing cookies from your device"}</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                  {language === "es" ? "Cookies de Terceros" : "Third-Party Cookies"}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {language === "es"
                    ? "Este sitio utiliza servicios de terceros que pueden establecer sus propias cookies, incluyendo Google AdSense, Amazon Associates, y Vercel Analytics. Le recomendamos revisar las políticas de privacidad de estos servicios para obtener más información."
                    : "This site uses third-party services that may set their own cookies, including Google AdSense, Amazon Associates, and Vercel Analytics. We recommend reviewing the privacy policies of these services for more information."}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                  {language === "es" ? "Contacto" : "Contact"}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {language === "es"
                    ? "Si tiene preguntas sobre nuestra Política de Cookies, puede contactarnos a través de nuestras redes sociales."
                    : "If you have questions about our Cookies Policy, you can contact us through our social media."}
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
