import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const ALLOWED_SECCION = ["services", "servicios_header"] as const;
type SeccionAllowed = (typeof ALLOWED_SECCION)[number];

function isSeccion(s: string | null): s is SeccionAllowed {
  return s != null && ALLOWED_SECCION.includes(s as SeccionAllowed);
}

export async function GET(request: Request) {
  const seccion = new URL(request.url).searchParams.get("seccion");
  if (!isSeccion(seccion)) {
    return NextResponse.json(
      { error: "Parámetro seccion inválido o ausente" },
      { status: 400 }
    );
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    }
  );

  const { data, error } = await supabase
    .from("contenido_sitio")
    .select("clave, valor")
    .eq("seccion", seccion);

  if (error) {
    console.error("[API /servicios-contenido] error", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}
