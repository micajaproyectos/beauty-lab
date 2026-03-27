"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { supabase } from "@/lib/supabaseClient";

type AdminContextValue = {
  loading: boolean;
  isAdmin: boolean;
  userId: string | null;
  refresh: () => Promise<void>;
};

const AdminContext = createContext<AdminContextValue | null>(null);

async function computeIsAdmin(): Promise<{ isAdmin: boolean; userId: string | null }> {
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  if (sessionError || !sessionData.session) return { isAdmin: false, userId: null };

  const uid = sessionData.session.user.id;
  const { data } = await supabase
    .from("admins")
    .select("user_id")
    .eq("user_id", uid)
    .maybeSingle();

  return { isAdmin: !!data, userId: uid };
}

export function AdminProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const refresh = async () => {
    setLoading(true);
    try {
      const result = await computeIsAdmin();
      setIsAdmin(result.isAdmin);
      setUserId(result.userId);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;

    (async () => {
      const result = await computeIsAdmin();
      if (!mounted) return;
      setIsAdmin(result.isAdmin);
      setUserId(result.userId);
      setLoading(false);
    })();

    const { data: listener } = supabase.auth.onAuthStateChange(async () => {
      const result = await computeIsAdmin();
      if (!mounted) return;
      setIsAdmin(result.isAdmin);
      setUserId(result.userId);
      setLoading(false);
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const value = useMemo<AdminContextValue>(
    () => ({ loading, isAdmin, userId, refresh }),
    [loading, isAdmin, userId]
  );

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within <AdminProvider />");
  return ctx;
}

