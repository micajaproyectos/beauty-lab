"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import type { User } from "@supabase/supabase-js";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError("Credenciales incorrectas. Verifica tu email y contraseña.");
    } else {
      router.push("/admin");
    }

    setLoading(false);
  }

  async function handleSignOut() {
    await supabase.auth.signOut({ scope: "global" });
  }

  if (user === undefined) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4"
        style={{ backgroundColor: "var(--cream)" }}>
        <p className="text-sm tracking-widest uppercase" style={{ color: "var(--warm-muted)", fontFamily: "var(--font-inter)" }}>
          Cargando...
        </p>
      </main>
    );
  }

  if (user) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4"
        style={{ backgroundColor: "var(--cream)" }}>
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <p className="text-sm tracking-widest uppercase mb-2"
              style={{ color: "var(--warm-muted)", fontFamily: "var(--font-inter)" }}>
              Beauty Lab
            </p>
            <h1 className="text-4xl font-light"
              style={{ fontFamily: "var(--font-cormorant)", color: "var(--deep-mauve)" }}>
              Sesión iniciada
            </h1>
          </div>

          <div className="rounded-2xl p-8 shadow-sm border flex flex-col gap-5"
            style={{ backgroundColor: "#fff", borderColor: "var(--blush)" }}>

            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full flex-shrink-0" style={{ backgroundColor: "#34d399" }} />
              <p className="text-sm" style={{ color: "var(--warm-muted)", fontFamily: "var(--font-inter)" }}>
                Conectada como{" "}
                <span style={{ color: "var(--warm-dark)", fontWeight: 500 }}>{user.email}</span>
              </p>
            </div>

            <Link
              href="/admin"
              className="w-full py-3 rounded-full text-sm tracking-widest uppercase font-medium text-center transition-opacity hover:opacity-80"
              style={{ backgroundColor: "var(--deep-mauve)", color: "#fff", fontFamily: "var(--font-inter)" }}
            >
              Ir al panel
            </Link>

            <button
              onClick={handleSignOut}
              className="w-full py-3 rounded-full text-sm tracking-widest uppercase font-medium border transition-opacity hover:opacity-70"
              style={{ borderColor: "var(--rose-soft)", color: "var(--warm-muted)", backgroundColor: "transparent", fontFamily: "var(--font-inter)" }}
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "var(--cream)" }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <p className="text-sm tracking-widest uppercase mb-2"
            style={{ color: "var(--warm-muted)", fontFamily: "var(--font-inter)" }}>
            Beauty Lab
          </p>
          <h1 className="text-4xl font-light"
            style={{ fontFamily: "var(--font-cormorant)", color: "var(--deep-mauve)" }}>
            Acceso Administrador
          </h1>
        </div>

        <form onSubmit={handleSubmit}
          className="rounded-2xl p-8 shadow-sm border flex flex-col gap-5"
          style={{ backgroundColor: "#fff", borderColor: "var(--blush)" }}>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email"
              className="text-xs tracking-widest uppercase"
              style={{ color: "var(--warm-muted)", fontFamily: "var(--font-inter)" }}>
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg px-4 py-2.5 text-sm outline-none transition border"
              style={{
                borderColor: "var(--rose-soft)",
                color: "var(--warm-dark)",
                backgroundColor: "var(--cream)",
                fontFamily: "var(--font-inter)",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "var(--mauve)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "var(--rose-soft)")}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password"
              className="text-xs tracking-widest uppercase"
              style={{ color: "var(--warm-muted)", fontFamily: "var(--font-inter)" }}>
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg px-4 py-2.5 text-sm outline-none transition border"
              style={{
                borderColor: "var(--rose-soft)",
                color: "var(--warm-dark)",
                backgroundColor: "var(--cream)",
                fontFamily: "var(--font-inter)",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "var(--mauve)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "var(--rose-soft)")}
            />
          </div>

          {error && (
            <p className="text-sm text-center rounded-lg px-4 py-2.5"
              style={{ backgroundColor: "#fde8e8", color: "#9b1c1c", fontFamily: "var(--font-inter)" }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-1 w-full py-3 rounded-full text-sm tracking-widest uppercase font-medium transition-opacity"
            style={{
              backgroundColor: "var(--deep-mauve)",
              color: "#fff",
              opacity: loading ? 0.6 : 1,
              cursor: loading ? "not-allowed" : "pointer",
              fontFamily: "var(--font-inter)",
            }}>
            {loading ? "Ingresando..." : "Iniciar sesión"}
          </button>
        </form>
      </div>
    </main>
  );
}
