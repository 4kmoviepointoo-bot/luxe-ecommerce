"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";

export default function CookieConsent() {
  const [show, setShow] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem("cookie-consent", JSON.stringify({ necessary: true, analytics: true, marketing: true }));
    localStorage.setItem("cookie-consent-date", new Date().toISOString());
    setShow(false);
  };

  const acceptNecessary = () => {
    localStorage.setItem("cookie-consent", JSON.stringify({ necessary: true, analytics: false, marketing: false }));
    localStorage.setItem("cookie-consent-date", new Date().toISOString());
    setShow(false);
  };

  const savePreferences = () => {
    const prefs = {
      necessary: true,
      analytics: document.getElementById("cookie-analytics") instanceof HTMLInputElement && (document.getElementById("cookie-analytics") as HTMLInputElement).checked,
      marketing: document.getElementById("cookie-marketing") instanceof HTMLInputElement && (document.getElementById("cookie-marketing") as HTMLInputElement).checked,
    };
    localStorage.setItem("cookie-consent", JSON.stringify(prefs));
    localStorage.setItem("cookie-consent-date", new Date().toISOString());
    setShow(false);
  };

  const hasConsent = () => {
    if (typeof window === "undefined") return true;
    return !!localStorage.getItem("cookie-consent");
  };

  return (
    <AnimatePresence>
      {show && !hasConsent() && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-[90] p-4 md:p-6 lg:bottom-6 lg:left-6 lg:right-auto lg:max-w-lg"
        >
          <div className="rounded-2xl border border-emerald/20 bg-[#020908]/95 backdrop-blur-xl p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
            <div className="flex items-start gap-4">
              <div className="shrink-0 rounded-full bg-emerald/10 p-2.5">
                <Cookie className="h-5 w-5 text-emerald" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="mb-1 text-sm font-semibold text-[#F7F7F3]">We value your privacy</h3>
                <p className="mb-4 text-xs leading-relaxed text-[#AEB8B3]">
                  We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking &quot;Accept All&quot;, you consent to our use of cookies.
                </p>

                <AnimatePresence>
                  {expanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mb-4 space-y-3 overflow-hidden"
                    >
                      <label className="flex items-center justify-between">
                        <span className="text-xs text-[#F7F7F3]">Necessary</span>
                        <input type="checkbox" checked disabled className="h-4 w-4 accent-emerald" />
                      </label>
                      <label className="flex items-center justify-between">
                        <span className="text-xs text-[#F7F7F3]">Analytics</span>
                        <input type="checkbox" id="cookie-analytics" defaultChecked className="h-4 w-4 accent-emerald" />
                      </label>
                      <label className="flex items-center justify-between">
                        <span className="text-xs text-[#F7F7F3]">Marketing</span>
                        <input type="checkbox" id="cookie-marketing" defaultChecked className="h-4 w-4 accent-emerald" />
                      </label>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={acceptAll}
                    className="rounded-full bg-emerald px-5 py-2 text-xs font-semibold text-[#020908] transition-all hover:shadow-[0_4px_20px_rgba(139,232,167,0.3)]"
                  >
                    Accept All
                  </button>
                  <button
                    onClick={acceptNecessary}
                    className="rounded-full border border-emerald/30 px-5 py-2 text-xs font-medium text-[#F7F7F3]/70 transition-all hover:bg-emerald/5 hover:text-[#F7F7F3]"
                  >
                    Necessary Only
                  </button>
                  {!expanded ? (
                    <button
                      onClick={() => setExpanded(true)}
                      className="rounded-full px-5 py-2 text-xs text-[#AEB8B3]/60 hover:text-[#AEB8B3] transition-colors"
                    >
                      Customize
                    </button>
                  ) : (
                    <button
                      onClick={savePreferences}
                      className="rounded-full px-5 py-2 text-xs text-emerald hover:text-emerald/80 transition-colors"
                    >
                      Save Preferences
                    </button>
                  )}
                </div>
              </div>

              <button
                onClick={() => {
                  acceptNecessary();
                }}
                className="shrink-0 rounded-full p-1 text-[#AEB8B3]/40 hover:text-[#AEB8B3] transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
