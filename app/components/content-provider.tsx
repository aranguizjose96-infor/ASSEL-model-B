'use client';

import { createContext, useContext } from 'react';
import { defaultContent, type SiteContent } from '../lib/content';

const ContentContext = createContext<SiteContent>(defaultContent);

export function ContentProvider({ children }: { children: React.ReactNode }) {
  return <ContentContext.Provider value={defaultContent}>{children}</ContentContext.Provider>;
}

export function useSiteContent() {
  return { content: useContext(ContentContext) };
}
