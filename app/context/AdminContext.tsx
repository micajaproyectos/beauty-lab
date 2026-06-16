"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { supabase } from "@/lib/supabaseClient";

type AdminContextValue = {
  loading: boolean;
  isAdmin: boolean;
  userId: string | null;
  userEmail: string | null;
  refresh: () => Promise<void>;
};

const AdminContext = createContext<AdminContextValue | null>(null);

/** Solo consulta `admins` por userId; no usa getSession. */
async function computeIsAdmin(userId: string | null, email?: string | null): Promise<{ isAdmin: boolean; userId: string | null; userEmail: string | null }> {
  if (!userId) return { isAdmin: false, userId: null, userEmail: null };

  const { data } = await supabase
    .from("admins")
    .select("user_id")
    .eq("user_id", userId)
    .maybeSingle();

  return { isAdmin: !!data, userId, userEmail: email ?? null };
}

export function AdminProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const refresh = async () => {
    setLoading(true);
    try {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      const uid = sessionError || !sessionData.session ? null : sessionData.session.user.id;
      const email = sessionData.session?.user?.email ?? null;
      const result = await Promise.race([
        computeIsAdmin(uid, email),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error("timeout")), 8_000)
        ),
      ]);
      setIsAdmin(result.isAdmin);
      setUserId(result.userId);
      setUserEmail(result.userEmail);
    } catch {
      // Error o timeout: liberar loading, isAdmin queda como false
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;

    // Si getSession() o computeIsAdmin() cuelgan (Supabase degradado),
    // liberar loading después de 10s para evitar pantalla infinita.
    const safetyTimer = setTimeout(() => { if (mounted) setLoading(false); }, 10_000);

    (async () => {
      try {
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        const uid = sessionError || !sessionData.session ? null : sessionData.session.user.id;
        const email = sessionData.session?.user?.email ?? null;
        const result = await computeIsAdmin(uid, email);
        if (!mounted) return;
        setIsAdmin(result.isAdmin);
        setUserId(result.userId);
        setUserEmail(result.userEmail);
      } catch {
        // Error de red: tratar como no admin
      } finally {
        clearTimeout(safetyTimer);
        if (mounted) setLoading(false);
      }
    })();

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const uid = session?.user?.id ?? null;
      const email = session?.user?.email ?? null;
      const result = await computeIsAdmin(uid, email);
      if (!mounted) return;
      setIsAdmin(result.isAdmin);
      setUserId(result.userId);
      setUserEmail(result.userEmail);
      setLoading(false);
    });

    // Cuando el tab vuelve al foco, forzar refresco del token.
    // Supabase recomienda este patrón para evitar que el auto-refresh
    // timer quede throttleado por el browser en tabs en background.
    function handleVisibilityChange() {
      if (document.visibilityState === "visible") {
        supabase.auth.startAutoRefresh();
      } else {
        supabase.auth.stopAutoRefresh();
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      mounted = false;
      clearTimeout(safetyTimer);
      listener.subscription.unsubscribe();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const value = useMemo<AdminContextValue>(
    () => ({ loading, isAdmin, userId, userEmail, refresh }),
    [loading, isAdmin, userId, userEmail]
  );

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within <AdminProvider />");
  return ctx;
}
