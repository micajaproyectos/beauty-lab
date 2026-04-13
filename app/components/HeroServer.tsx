import { supabase } from "@/lib/supabaseClient";
import Hero, { HERO_DEFAULTS } from "./Hero";
import type { ContentMap } from "./ui/InlineEdit";

export default async function HeroServer() {
  const { data } = await supabase
    .from("contenido_sitio")
    .select("clave, valor")
    .eq("seccion", "hero");

  const content: ContentMap = { ...HERO_DEFAULTS };
  if (data) {
    for (const item of data) content[item.clave] = item.valor;
  }

  return <Hero initialContent={content} />;
}
