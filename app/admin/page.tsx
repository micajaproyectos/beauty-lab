"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import type { User } from "@supabase/supabase-js";

// ─── Admin Page ───────────────────────────────────────────────────────────────

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkSession() {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.replace("/login");
        return;
      }
      setUser(data.session.user);
      setLoading(false);
    }

    checkSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.replace("/login");
      } else {
        setUser(session.user);
      }
    });

    return () => listener.subscription.unsubscribe();
  }, [router]);

  async function handleSignOut() {
    // scope: 'global' invalida el token también en el servidor de Supabase,
    // no solo en el localStorage del navegador
    const { error } = await supabase.auth.signOut({ scope: "global" });
    if (error) {
      console.error("[Admin] Error al cerrar sesión:", error.message);
    }
    router.replace("/login");
  }

  if (loading) {
    return (
      <main
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--cream)" }}
      >
        <p
          className="text-sm tracking-widest uppercase"
          style={{ color: "var(--warm-muted)" }}
        >
          Cargando...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 py-12" style={{ backgroundColor: "var(--cream)" }}>
      <div className="max-w-2xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "var(--warm-muted)" }}>
              Beauty Lab
            </p>
            <h1 className="text-4xl font-light" style={{ fontFamily: "var(--font-cormorant)", color: "var(--deep-mauve)" }}>
              Panel Administrador
            </h1>
          </div>
          <button
            onClick={handleSignOut}
            className="px-5 py-2 rounded-full text-xs tracking-widest uppercase transition-opacity hover:opacity-70 border"
            style={{ borderColor: "var(--rose-soft)", color: "var(--warm-muted)", backgroundColor: "#fff" }}
          >
            Cerrar sesión
          </button>
        </div>

        {/* Session info */}
        <div className="rounded-2xl px-6 py-4 border shadow-sm flex items-center gap-3"
          style={{ backgroundColor: "#fff", borderColor: "var(--blush)" }}>
          <div className="h-2 w-2 rounded-full flex-shrink-0" style={{ backgroundColor: "#34d399" }} />
          <p className="text-sm" style={{ color: "var(--warm-muted)" }}>
            Sesión activa como{" "}
            <span style={{ color: "var(--warm-dark)", fontWeight: 500 }}>{user?.email}</span>
          </p>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            href="/productos"
            className="group flex flex-col gap-3 rounded-2xl border p-6 transition-all hover:shadow-md"
            style={{ backgroundColor: "#fff", borderColor: "var(--blush)" }}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl"
              style={{ backgroundColor: "var(--cream)" }}>
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                style={{ color: "var(--deep-mauve)" }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
              </svg>
            </div>
            <div>
              <p className="text-xs tracking-widest uppercase mb-0.5" style={{ color: "var(--warm-muted)" }}>
                Catálogo
              </p>
              <h2 className="text-xl font-light" style={{ fontFamily: "var(--font-cormorant)", color: "var(--deep-mauve)" }}>
                Ver productos
              </h2>
              <p className="mt-1 text-xs" style={{ color: "var(--warm-muted)" }}>
                Edita o agrega productos desde el catálogo
              </p>
            </div>
          </Link>

          <Link
            href="/admin/tratamientos"
            className="group flex flex-col gap-3 rounded-2xl border p-6 transition-all hover:shadow-md"
            style={{ backgroundColor: "#fff", borderColor: "var(--blush)" }}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl"
              style={{ backgroundColor: "var(--cream)" }}>
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                style={{ color: "var(--deep-mauve)" }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
            </div>
            <div>
              <p className="text-xs tracking-widest uppercase mb-0.5" style={{ color: "var(--warm-muted)" }}>
                Servicios
              </p>
              <h2 className="text-xl font-light" style={{ fontFamily: "var(--font-cormorant)", color: "var(--deep-mauve)" }}>
                Tratamientos
              </h2>
              <p className="mt-1 text-xs" style={{ color: "var(--warm-muted)" }}>
                Agrega, edita o desactiva tratamientos
              </p>
            </div>
          </Link>

          <Link
            href="/admin/contenido"
            className="group flex flex-col gap-3 rounded-2xl border p-6 transition-all hover:shadow-md"
            style={{ backgroundColor: "#fff", borderColor: "var(--blush)" }}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl"
              style={{ backgroundColor: "var(--cream)" }}>
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                style={{ color: "var(--deep-mauve)" }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
              </svg>
            </div>
            <div>
              <p className="text-xs tracking-widest uppercase mb-0.5" style={{ color: "var(--warm-muted)" }}>
                Sitio web
              </p>
              <h2 className="text-xl font-light" style={{ fontFamily: "var(--font-cormorant)", color: "var(--deep-mauve)" }}>
                Contenido
              </h2>
              <p className="mt-1 text-xs" style={{ color: "var(--warm-muted)" }}>
                Edita textos e imagen del hero
              </p>
            </div>
          </Link>

          <Link
            href="/admin/nosotras"
            className="group flex flex-col gap-3 rounded-2xl border p-6 transition-all hover:shadow-md"
            style={{ backgroundColor: "#fff", borderColor: "var(--blush)" }}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl"
              style={{ backgroundColor: "var(--cream)" }}>
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                style={{ color: "var(--deep-mauve)" }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
              </svg>
            </div>
            <div>
              <p className="text-xs tracking-widest uppercase mb-0.5" style={{ color: "var(--warm-muted)" }}>
                Nosotras
              </p>
              <h2 className="text-xl font-light" style={{ fontFamily: "var(--font-cormorant)", color: "var(--deep-mauve)" }}>
                Certificaciones
              </h2>
              <p className="mt-1 text-xs" style={{ color: "var(--warm-muted)" }}>
                Agrega, edita o elimina certificaciones
              </p>
            </div>
          </Link>

          <Link
            href="/"
            className="group flex flex-col gap-3 rounded-2xl border p-6 transition-all hover:shadow-md"
            style={{ backgroundColor: "#fff", borderColor: "var(--blush)" }}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl"
              style={{ backgroundColor: "var(--cream)" }}>
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                style={{ color: "var(--deep-mauve)" }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
            </div>
            <div>
              <p className="text-xs tracking-widest uppercase mb-0.5" style={{ color: "var(--warm-muted)" }}>
                Sitio
              </p>
              <h2 className="text-xl font-light" style={{ fontFamily: "var(--font-cormorant)", color: "var(--deep-mauve)" }}>
                Ver el sitio
              </h2>
              <p className="mt-1 text-xs" style={{ color: "var(--warm-muted)" }}>
                Revisa cómo lo ven los visitantes
              </p>
            </div>
          </Link>
        </div>

      </div>
    </main>
  );
}
