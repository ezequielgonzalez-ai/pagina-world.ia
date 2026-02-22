"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, Settings, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";

const COOKIE_CONSENT_KEY = "cookie-consent";

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export function CookieBanner() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const saveConsent = (prefs: CookiePreferences) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(prefs));
    setIsVisible(false);
  };

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    saveConsent(allAccepted);
  };

  const handleDeclineAll = () => {
    const allDeclined = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    saveConsent(allDeclined);
  };

  const handleSavePreferences = () => {
    saveConsent(preferences);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6"
      >
        <Card className="max-w-3xl mx-auto bg-card/95 dark:bg-card/90 backdrop-blur-lg border-border/50 shadow-2xl">
          {!showPreferences ? (
            <>
              <CardHeader className="pb-3">
                <div className="flex items-start gap-3">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="p-2 rounded-full bg-primary/10"
                  >
                    <Cookie className="w-5 h-5 text-primary" />
                  </motion.div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{t.cookies.title}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-3">
                <p className="text-sm text-muted-foreground">
                  {t.cookies.description}
                </p>
              </CardContent>
              <CardFooter className="flex flex-wrap gap-2 justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPreferences(true)}
                  className="order-3 sm:order-1 w-full sm:w-auto"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  {t.cookies.managePreferences}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDeclineAll}
                  className="order-2 w-full sm:w-auto"
                >
                  {t.cookies.declineAll}
                </Button>
                <Button
                  size="sm"
                  onClick={handleAcceptAll}
                  className="order-1 sm:order-3 w-full sm:w-auto bg-primary hover:bg-primary/90"
                >
                  <Check className="w-4 h-4 mr-2" />
                  {t.cookies.acceptAll}
                </Button>
              </CardFooter>
            </>
          ) : (
            <>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">
                    {t.cookies.managePreferences}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowPreferences(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 pb-3">
                {/* Necessary Cookies */}
                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <Checkbox
                    id="necessary"
                    checked={preferences.necessary}
                    disabled
                    className="mt-0.5"
                  />
                  <div className="space-y-1">
                    <Label
                      htmlFor="necessary"
                      className="text-sm font-medium cursor-pointer"
                    >
                      {t.cookies.necessary}
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      {t.cookies.necessaryDescription}
                    </p>
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/30 transition-colors">
                  <Checkbox
                    id="analytics"
                    checked={preferences.analytics}
                    onCheckedChange={(checked) =>
                      setPreferences({ ...preferences, analytics: !!checked })
                    }
                    className="mt-0.5"
                  />
                  <div className="space-y-1">
                    <Label
                      htmlFor="analytics"
                      className="text-sm font-medium cursor-pointer"
                    >
                      {t.cookies.analytics}
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      {t.cookies.analyticsDescription}
                    </p>
                  </div>
                </div>

                {/* Marketing Cookies */}
                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/30 transition-colors">
                  <Checkbox
                    id="marketing"
                    checked={preferences.marketing}
                    onCheckedChange={(checked) =>
                      setPreferences({ ...preferences, marketing: !!checked })
                    }
                    className="mt-0.5"
                  />
                  <div className="space-y-1">
                    <Label
                      htmlFor="marketing"
                      className="text-sm font-medium cursor-pointer"
                    >
                      {t.cookies.marketing}
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      {t.cookies.marketingDescription}
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPreferences(false)}
                >
                  {t.common.back}
                </Button>
                <Button
                  size="sm"
                  onClick={handleSavePreferences}
                  className="bg-primary hover:bg-primary/90"
                >
                  <Check className="w-4 h-4 mr-2" />
                  {t.cookies.savePreferences}
                </Button>
              </CardFooter>
            </>
          )}
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}

// Cookie Policy Link Component
export function CookiePolicyLink() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          {t.cookies.privacyPolicy}
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t.cookies.privacyPolicy}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 text-sm text-muted-foreground">
          <p>
            {t.cookies.description}
          </p>
          <h4 className="font-semibold text-foreground">
            {t.cookies.necessary}
          </h4>
          <p>{t.cookies.necessaryDescription}</p>
          <h4 className="font-semibold text-foreground">
            {t.cookies.analytics}
          </h4>
          <p>{t.cookies.analyticsDescription}</p>
          <h4 className="font-semibold text-foreground">
            {t.cookies.marketing}
          </h4>
          <p>{t.cookies.marketingDescription}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
