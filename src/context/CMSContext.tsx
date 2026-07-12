"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_CONTENT } from '@/data/initialContent';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CMSData = any;

interface CMSContextValue {
  content: CMSData;
  updateContent: (newContent: CMSData) => void;
  forceSyncFromLocal: () => Promise<boolean>;
}

const CMSContext = createContext<CMSContextValue | null>(null);

export function CMSProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState(INITIAL_CONTENT);

  const mergeMissingSubsections = (data: any) => {
    if (!data || !Array.isArray(data.services)) return data;
    const mergedServices = data.services.map((service: any) => {
      const initialService = INITIAL_CONTENT.services.find((s: any) => s.slug === service.slug);
      if (initialService && (!service.subsections || service.subsections.length === 0)) {
        return {
          ...service,
          subsections: initialService.subsections
        };
      }
      return service;
    });
    return {
      ...data,
      services: mergedServices
    };
  };

  useEffect(() => {
    const initCMS = async () => {
      try {
        const response = await fetch('/api/cms?t=' + Date.now());
        const result = await response.json();
        
        if (result.exists && result.data) {
          // Central DB has data — use it as the single source of truth
          setContent(mergeMissingSubsections(result.data));
        }
        // If central DB is empty, we just keep INITIAL_CONTENT.
        // The admin can use forceSyncFromLocal() to push their local data.
      } catch (error) {
        console.error('Failed to fetch CMS data:', error);
        // Fallback: try localStorage so the site isn't blank
        const savedContent = localStorage.getItem('enklan_cms_content');
        if (savedContent) {
          try {
            setContent(mergeMissingSubsections(JSON.parse(savedContent)));
          } catch (e) {
            console.error('Failed to parse local content:', e);
          }
        }
      }
    };
    
    initCMS();
  }, []);

  const updateContent = async (newContent: CMSData) => {
    // Optimistic update for snappy UI
    setContent(newContent);
    localStorage.setItem('enklan_cms_content', JSON.stringify(newContent));
    
    // Save to central DB
    try {
      const response = await fetch('/api/cms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newContent)
      });
      if (!response.ok) {
        const result = await response.json().catch(() => ({}));
        throw new Error(result.error || 'Failed to save to central database');
      }
    } catch (error: unknown) {
      console.error('Failed to save CMS data to central storage:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      alert('Error saving data to Vercel Blob: ' + errorMessage + '\n\nYour changes are only saved locally on this device. Please ensure Vercel Blob is configured correctly in your Vercel Dashboard.');
    }
  };

  /**
   * Force-push the current device's localStorage data to the central DB.
   * Use this from the admin dashboard on the iPhone to recover local-only edits.
   * Returns true if local data was found and synced, false otherwise.
   */
  const forceSyncFromLocal = async (): Promise<boolean> => {
    const savedContent = localStorage.getItem('enklan_cms_content');
    if (!savedContent) {
      return false;
    }
    
    try {
      const localData = JSON.parse(savedContent);
      
      // Push local data to central DB
      const response = await fetch('/api/cms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(localData)
      });
      
      if (!response.ok) {
        throw new Error('Failed to sync');
      }
      
      // Update local state to match
      setContent(localData);
      return true;
    } catch (error) {
      console.error('Force sync failed:', error);
      return false;
    }
  };

  return (
    <CMSContext.Provider value={{ content, updateContent, forceSyncFromLocal }}>
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
