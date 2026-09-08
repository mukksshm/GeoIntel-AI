'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { documents as defaultDocs, Document } from './mock-data';

interface DocumentsContextType {
  documents: Document[];
  addDocument: (doc: Document) => void;
  recentUploadedId: string | null;
  setRecentUploadedId: (id: string | null) => void;
  clearUploadedDocument: (id: string) => void;
  deleteDocument: (id: string) => void;
  resetAllDocuments: () => void;
}

const DocumentsContext = createContext<DocumentsContextType | undefined>(undefined);

const STORAGE_KEY = 'geointel_uploaded_documents_v1';
const DELETED_STORAGE_KEY = 'geointel_deleted_doc_ids_v1';

export function DocumentsProvider({ children }: { children: React.ReactNode }) {
  const [docs, setDocs] = useState<Document[]>(defaultDocs);
  const [recentUploadedId, setRecentUploadedId] = useState<string | null>(null);

  // Hydrate from localStorage on client mount
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const deletedRaw = localStorage.getItem(DELETED_STORAGE_KEY);
        const deletedSet = new Set<string>(deletedRaw ? JSON.parse(deletedRaw) : []);

        const stored = localStorage.getItem(STORAGE_KEY);
        let customDocs: Document[] = [];
        if (stored) {
          const parsed = JSON.parse(stored) as Document[];
          if (Array.isArray(parsed)) {
            const defaultIds = new Set(defaultDocs.map(d => d.id));
            customDocs = parsed.filter(d => !defaultIds.has(d.id) && !deletedSet.has(d.id));
          }
        }

        const validDefaults = defaultDocs.filter(d => !deletedSet.has(d.id));
        setDocs([...customDocs, ...validDefaults]);
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

          // Also remove from deleted set if re-uploaded
          const deletedRaw = localStorage.getItem(DELETED_STORAGE_KEY);
          if (deletedRaw) {
            const deletedArr: string[] = JSON.parse(deletedRaw);
            const nextDeleted = deletedArr.filter(id => id !== newDoc.id);
            localStorage.setItem(DELETED_STORAGE_KEY, JSON.stringify(nextDeleted));
          }
        }
      } catch (err) {
        console.warn('Failed to persist uploaded document:', err);
      }

      return updated;
    });

    setRecentUploadedId(newDoc.id);
  }, []);

  const deleteDocument = useCallback((id: string) => {
    setDocs(prev => {
      const updated = prev.filter(d => d.id !== id);
      try {
        if (typeof window !== 'undefined') {
          // Update user uploads storage
          const defaultIds = new Set(defaultDocs.map(d => d.id));
          const userOnly = updated.filter(d => !defaultIds.has(d.id));
          localStorage.setItem(STORAGE_KEY, JSON.stringify(userOnly));

          // Add to deleted set so default mock docs also stay deleted
          const deletedRaw = localStorage.getItem(DELETED_STORAGE_KEY);
          const deletedArr: string[] = deletedRaw ? JSON.parse(deletedRaw) : [];
          if (!deletedArr.includes(id)) {
            deletedArr.push(id);
            localStorage.setItem(DELETED_STORAGE_KEY, JSON.stringify(deletedArr));
          }
        }
      } catch (err) {
        console.warn('Failed to persist document deletion:', err);
      }
      return updated;
    });
  }, []);

  const clearUploadedDocument = deleteDocument;

  const resetAllDocuments = useCallback(() => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(DELETED_STORAGE_KEY);
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {}
    setDocs(defaultDocs);
  }, []);

  return (
    <DocumentsContext.Provider
      value={{
        documents: docs,
        addDocument,
        recentUploadedId,
        setRecentUploadedId,
        clearUploadedDocument,
        deleteDocument,
        resetAllDocuments,
      }}
    >
      {children}
    </DocumentsContext.Provider>
  );
}

export function useDocuments(): DocumentsContextType {
  const ctx = useContext(DocumentsContext);
  if (!ctx) {
    return {
      documents: defaultDocs,
      addDocument: () => {},
      recentUploadedId: null,
      setRecentUploadedId: () => {},
      clearUploadedDocument: () => {},
      deleteDocument: () => {},
      resetAllDocuments: () => {},
    };
  }
  return ctx;
}
