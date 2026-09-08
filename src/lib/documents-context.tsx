'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { documents as defaultDocs, Document } from './mock-data';

interface DocumentsContextType {
  documents: Document[];
  addDocument: (doc: Document) => void;
  recentUploadedId: string | null;
  setRecentUploadedId: (id: string | null) => void;
  clearUploadedDocument: (id: string) => void;
}

const DocumentsContext = createContext<DocumentsContextType | undefined>(undefined);

const STORAGE_KEY = 'geointel_uploaded_documents_v1';

export function DocumentsProvider({ children }: { children: React.ReactNode }) {
  const [docs, setDocs] = useState<Document[]>(defaultDocs);
  const [recentUploadedId, setRecentUploadedId] = useState<string | null>(null);

  // Hydrate from localStorage on client mount
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored) as Document[];
          if (Array.isArray(parsed) && parsed.length > 0) {
            // Prepend stored user uploads to default mock documents
            const defaultIds = new Set(defaultDocs.map(d => d.id));
            const uniqueCustom = parsed.filter(d => !defaultIds.has(d.id));
            if (uniqueCustom.length > 0) {
              setDocs([...uniqueCustom, ...defaultDocs]);
            }
          }
        }
      }
    } catch (err) {
      console.warn('Failed to load user documents from localStorage:', err);
    }
  }, []);

  const addDocument = useCallback((newDoc: Document) => {
    setDocs(prev => {
      // Ensure no duplicate IDs
      const filtered = prev.filter(d => d.id !== newDoc.id);
      const updated = [newDoc, ...filtered];

      try {
        if (typeof window !== 'undefined') {
          const defaultIds = new Set(defaultDocs.map(d => d.id));
          const userOnly = updated.filter(d => !defaultIds.has(d.id));
          localStorage.setItem(STORAGE_KEY, JSON.stringify(userOnly));
        }
      } catch (err) {
        console.warn('Failed to persist uploaded document:', err);
      }

      return updated;
    });

    setRecentUploadedId(newDoc.id);
  }, []);

  const clearUploadedDocument = useCallback((id: string) => {
    setDocs(prev => {
      const updated = prev.filter(d => d.id !== id);
      try {
        if (typeof window !== 'undefined') {
          const defaultIds = new Set(defaultDocs.map(d => d.id));
          const userOnly = updated.filter(d => !defaultIds.has(d.id));
          localStorage.setItem(STORAGE_KEY, JSON.stringify(userOnly));
        }
      } catch (err) {
        console.warn('Failed to persist document removal:', err);
      }
      return updated;
    });
  }, []);

  return (
    <DocumentsContext.Provider
      value={{
        documents: docs,
        addDocument,
        recentUploadedId,
        setRecentUploadedId,
        clearUploadedDocument,
      }}
    >
      {children}
    </DocumentsContext.Provider>
  );
}

export function useDocuments(): DocumentsContextType {
  const ctx = useContext(DocumentsContext);
  if (!ctx) {
    // Safe fallback if used outside provider
    return {
      documents: defaultDocs,
      addDocument: () => {},
      recentUploadedId: null,
      setRecentUploadedId: () => {},
      clearUploadedDocument: () => {},
    };
  }
  return ctx;
}
