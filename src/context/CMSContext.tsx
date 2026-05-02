"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_CONTENT } from '@/data/initialContent';

const CMSContext = createContext<any>(null);

export function CMSProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState(INITIAL_CONTENT);

  useEffect(() => {
    const version = localStorage.getItem('enklan_cms_version');
    if (version !== '1.1') {
      localStorage.setItem('enklan_cms_version', '1.1');
      localStorage.removeItem('enklan_cms_content');
      setContent(INITIAL_CONTENT);
      return;
    }
    const savedContent = localStorage.getItem('enklan_cms_content');
    if (savedContent) {
      setContent(JSON.parse(savedContent));
    }
  }, []);

  const updateContent = (newContent: any) => {
    setContent(newContent);
    localStorage.setItem('enklan_cms_content', JSON.stringify(newContent));
  };

  return (
    <CMSContext.Provider value={{ content, updateContent }}>
      {children}
    </CMSContext.Provider>
  );
}

export function useCMS() {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
}
