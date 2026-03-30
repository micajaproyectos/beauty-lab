"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

/**
 * Instrumentación temporal: cambios de sesión Supabase en toda la app (diagnóstico).
 */
export default function AuthSessionDebugListener() {
  useEffect(() => {
    if (process.env.NODE_ENV === "production") return;

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(
        `[Auth] state change | event=${event} | hasSession=${!!session} | userId=${session?.user?.id ?? "null"} | email=${session?.user?.email ?? "null"}`
      );
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return null;
}
