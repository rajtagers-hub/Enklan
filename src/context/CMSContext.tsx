"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_CONTENT } from '@/data/initialContent';

const CMSContext = createContext<any>(null);

export function CMSProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState(INITIAL_CONTENT);

  useEffect(() => {
    const initCMS = async () => {
      try {
        const response = await fetch('/api/cms?t=' + Date.now()); // Prevent browser caching
        const result = await response.json();
        
        if (result.exists && result.data) {
          // Central DB has data, use it
          setContent(result.data);
          localStorage.setItem('enklan_cms_content', JSON.stringify(result.data));
          localStorage.setItem('enklan_cms_version', '1.2'); // Mark as migrated
        } else {
          // Central DB is empty, this is the migration step!
          const version = localStorage.getItem('enklan_cms_version');
          const savedContent = localStorage.getItem('enklan_cms_content');
          
          let contentToSave = INITIAL_CONTENT;
          
          if (version === '1.1' && savedContent) {
            // We found valid local data (e.g. from the iPhone) that hasn't been migrated
            try {
              contentToSave = JSON.parse(savedContent);
            } catch (e) {
              console.error('Failed to parse local storage data');
            }
          }
          
          setContent(contentToSave);
          
          // Save this to the central DB so all devices get it
          await fetch('/api/cms', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(contentToSave)
          });
          
          localStorage.setItem('enklan_cms_version', '1.2');
        }
      } catch (error) {
        console.error('Failed to sync CMS data:', error);
        // Fallback to local storage if API fails (offline mode)
        const savedContent = localStorage.getItem('enklan_cms_content');
        if (savedContent) {
          setContent(JSON.parse(savedContent));
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
