'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { defaultContent, type CaseStudy, type Service, type SiteContent } from '../lib/content';

type ContentContextType = {
  content: SiteContent;
  updateHero: (values: Pick<SiteContent, 'heroTitle' | 'heroAccent' | 'heroIntro'>) => void;
  saveService: (service: Service) => void;
  removeService: (id: string) => void;
  saveCase: (item: CaseStudy) => void;
  removeCase: (id: string) => void;
  resetContent: () => void;
};

const ContentContext = createContext<ContentContextType | null>(null);
const STORAGE_KEY = 'assel-demo-content-v1';
const SERVICE_CATALOG_VERSION_KEY = 'assel-service-catalog-version';
const SERVICE_CATALOG_VERSION = '2';

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState(defaultContent);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved) as SiteContent;
          const hasCurrentServiceCatalog = window.localStorage.getItem(SERVICE_CATALOG_VERSION_KEY) === SERVICE_CATALOG_VERSION;
          setContent({
            ...defaultContent,
            ...parsed,
            services: hasCurrentServiceCatalog ? parsed.services : defaultContent.services,
          });
          window.localStorage.setItem(SERVICE_CATALOG_VERSION_KEY, SERVICE_CATALOG_VERSION);
        } catch { window.localStorage.removeItem(STORAGE_KEY); }
      }
      setHydrated(true);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  }, [content, hydrated]);

  const value = useMemo<ContentContextType>(() => ({
    content,
    updateHero: (values) => setContent((current) => ({ ...current, ...values })),
    saveService: (service) => setContent((current) => ({ ...current, services: current.services.some((item) => item.id === service.id) ? current.services.map((item) => item.id === service.id ? service : item) : [...current.services, service] })),
    removeService: (id) => setContent((current) => ({ ...current, services: current.services.filter((item) => item.id !== id) })),
    saveCase: (item) => setContent((current) => ({ ...current, cases: current.cases.some((entry) => entry.id === item.id) ? current.cases.map((entry) => entry.id === item.id ? item : entry) : [...current.cases, item] })),
    removeCase: (id) => setContent((current) => ({ ...current, cases: current.cases.filter((item) => item.id !== id) })),
    resetContent: () => {
      window.localStorage.setItem(SERVICE_CATALOG_VERSION_KEY, SERVICE_CATALOG_VERSION);
      setContent(defaultContent);
    },
  }), [content]);

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useSiteContent() {
  const context = useContext(ContentContext);
  if (!context) throw new Error('useSiteContent must be used inside ContentProvider');
  return context;
}
