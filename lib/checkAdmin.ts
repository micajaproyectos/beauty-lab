import { supabase } from "./supabaseClient";

/**
 * Comprueba si `userId` está en `admins`. No llama a getSession.
 */
export async function checkIsAdminForUser(userId: string | null): Promise<boolean> {
  if (!userId) return false;
  const { data } = await supabase
    .from("admins")
    .select("user_id")
    .eq("user_id", userId)
    .maybeSingle();

  return !!data;
}

/**
 * Verifica si el usuario actualmente autenticado está registrado
 * en la tabla `admins` de Supabase.
 * Retorna false si no hay sesión o si el usuario no es admin.
 */
export async function checkIsAdmin(): Promise<boolean> {
  const { data: sessionData } = await supabase.auth.getSession();
  if (!sessionData.session) return false;
  return checkIsAdminForUser(sessionData.session.user.id);
}
