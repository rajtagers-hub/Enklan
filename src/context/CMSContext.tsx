"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_CONTENT } from '@/data/initialContent';

interface CMSContextValue {
  content: any;
  updateContent: (newContent: any) => void;
  forceSyncFromLocal: () => Promise<boolean>;
}

const CMSContext = createContext<CMSContextValue | null>(null);

export function CMSProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState(INITIAL_CONTENT);

  useEffect(() => {
    const initCMS = async () => {
      try {
        const response = await fetch('/api/cms?t=' + Date.now());
        const result = await response.json();
        
        if (result.exists && result.data) {
          // Central DB has data — use it as the single source of truth
          setContent(result.data);
        }
        // If central DB is empty, we just keep INITIAL_CONTENT.
        // The admin can use forceSyncFromLocal() to push their local data.
      } catch (error) {
        console.error('Failed to fetch CMS data:', error);
        // Fallback: try localStorage so the site isn't blank
        const savedContent = localStorage.getItem('enklan_cms_content');
        if (savedContent) {
          try {
            setContent(JSON.parse(savedContent));
          } catch (e) {
            console.error('Failed to parse local content:', e);
          }
        }
      }
    };
    
    initCMS();
  }, []);

  const updateContent = async (newContent: any) => {
    // Optimistic update for snappy UI
    setContent(newContent);
    localStorage.setItem('enklan_cms_content', JSON.stringify(newContent));
    
    // Save to central DB
    try {
      await fetch('/api/cms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newContent)
      });
    } catch (error) {
      console.error('Failed to save CMS data to central storage:', error);
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
