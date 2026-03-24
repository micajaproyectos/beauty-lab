import { supabase } from "./supabaseClient";

/**
 * Verifica si el usuario actualmente autenticado está registrado
 * en la tabla `admins` de Supabase.
 * Retorna false si no hay sesión o si el usuario no es admin.
 */
export async function checkIsAdmin(): Promise<boolean> {
  const { data: sessionData } = await supabase.auth.getSession();
  if (!sessionData.session) return false;

  const { data } = await supabase
    .from("admins")
    .select("user_id")
    .eq("user_id", sessionData.session.user.id)
    .maybeSingle();

  return !!data;
}
