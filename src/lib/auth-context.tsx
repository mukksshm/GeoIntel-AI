'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'officer';
  clearance: string;
  subsidiary: string;
  isAdmin: boolean;
}

export const ADMIN_CREDENTIALS = {
  id: 'admin@coalindia.in',
  alias: 'admin',
  password: 'admin123',
};

export const OFFICER_CREDENTIALS = {
  id: 'officer@coalindia.in',
  alias: 'officer',
  password: 'officer123',
};

const DEFAULT_OFFICER: AuthUser = {
  id: 'EMP-7842',
  name: 'Dr. Rajiv Kumar',
  email: 'officer@coalindia.in',
  role: 'officer',
  clearance: 'Level 2 (Read & Validate)',
  subsidiary: 'CMPDI Ranchi',
  isAdmin: false,
};

const ADMIN_USER: AuthUser = {
  id: 'ADMIN-001',
  name: 'Chief System Administrator',
  email: 'admin@coalindia.in',
  role: 'admin',
  clearance: 'Level 4 (Full Governance & Purge)',
  subsidiary: 'Ministry of Coal / CIL HQ',
  isAdmin: true,
};

interface AuthContextType {
  user: AuthUser;
  isAdmin: boolean;
  login: (id: string, pass: string) => { success: boolean; message?: string; role?: string };
  logout: () => void;
  elevateToAdmin: (id: string, pass: string) => { success: boolean; message?: string };
  switchToOfficer: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'geointel_auth_role_v1';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser>(DEFAULT_OFFICER);

  // Hydrate user role from localStorage
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const storedRole = localStorage.getItem(AUTH_STORAGE_KEY);
        if (storedRole === 'admin') {
          setUser(ADMIN_USER);
        } else {
          setUser(DEFAULT_OFFICER);
        }
      }
    } catch (e) {
      console.warn('Could not read auth from storage:', e);
    }
  }, []);

  const login = useCallback((id: string, pass: string) => {
    const cleanId = id.trim().toLowerCase();
    const cleanPass = pass.trim();

    const isAdminMatch =
      (cleanId === ADMIN_CREDENTIALS.id.toLowerCase() || cleanId === ADMIN_CREDENTIALS.alias) &&
      cleanPass === ADMIN_CREDENTIALS.password;

    if (isAdminMatch) {
      setUser(ADMIN_USER);
      try {
        localStorage.setItem(AUTH_STORAGE_KEY, 'admin');
      } catch {}
      return { success: true, role: 'admin' };
    }

    // Standard officer check (accepts officer credentials, demo, or general valid login)
    const isOfficerMatch =
      cleanId === OFFICER_CREDENTIALS.id.toLowerCase() ||
      cleanId === OFFICER_CREDENTIALS.alias ||
      cleanId.includes('coalindia') ||
      cleanId.includes('cmpdi') ||
      cleanId.length > 0;

    if (isOfficerMatch) {
      setUser(DEFAULT_OFFICER);
      try {
        localStorage.setItem(AUTH_STORAGE_KEY, 'officer');
      } catch {}
      return { success: true, role: 'officer' };
    }

    return { success: false, message: 'Invalid credentials. Use admin@coalindia.in / admin123 or officer@coalindia.in / officer123' };
  }, []);

  const elevateToAdmin = useCallback((id: string, pass: string) => {
    const cleanId = id.trim().toLowerCase();
    const cleanPass = pass.trim();

    if (
      (cleanId === ADMIN_CREDENTIALS.id.toLowerCase() || cleanId === ADMIN_CREDENTIALS.alias) &&
      cleanPass === ADMIN_CREDENTIALS.password
    ) {
      setUser(ADMIN_USER);
      try {
        localStorage.setItem(AUTH_STORAGE_KEY, 'admin');
      } catch {}
      return { success: true };
    }
    return { success: false, message: 'Incorrect Admin ID or Password. Default is admin@coalindia.in / admin123' };
  }, []);

  const switchToOfficer = useCallback(() => {
    setUser(DEFAULT_OFFICER);
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, 'officer');
    } catch {}
  }, []);

  const logout = useCallback(() => {
    setUser(DEFAULT_OFFICER);
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch {}
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin: user.isAdmin,
        login,
        logout,
        elevateToAdmin,
        switchToOfficer,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    return {
      user: DEFAULT_OFFICER,
      isAdmin: false,
      login: () => ({ success: true, role: 'officer' }),
      logout: () => {},
      elevateToAdmin: () => ({ success: false, message: 'No AuthProvider mounted' }),
      switchToOfficer: () => {},
    };
  }
  return ctx;
}
