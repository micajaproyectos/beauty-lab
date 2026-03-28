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

/** Solo consulta `admins` por userId; no usa getSession. */
async function computeIsAdmin(userId: string | null): Promise<{ isAdmin: boolean; userId: string | null }> {
  if (!userId) return { isAdmin: false, userId: null };

  const { data } = await supabase
    .from("admins")
    .select("user_id")
    .eq("user_id", userId)
    .maybeSingle();

  return { isAdmin: !!data, userId };
}

export function AdminProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const refresh = async () => {
    setLoading(true);
    try {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      const uid = sessionError || !sessionData.session ? null : sessionData.session.user.id;
      const result = await computeIsAdmin(uid);
      setIsAdmin(result.isAdmin);
      setUserId(result.userId);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;

    (async () => {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      const uid = sessionError || !sessionData.session ? null : sessionData.session.user.id;
      const result = await computeIsAdmin(uid);
      if (!mounted) return;
      setIsAdmin(result.isAdmin);
      setUserId(result.userId);
      setLoading(false);
    })();

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const uid = session?.user?.id ?? null;
      const result = await computeIsAdmin(uid);
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
