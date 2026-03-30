import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const MAX_FILE_NAME_LEN = 256;

function isSafeStorageFileName(name: string): boolean {
  if (!name || name.length > MAX_FILE_NAME_LEN) return false;
  if (name.includes("/") || name.includes("\\")) return false;
  if (name === "." || name === "..") return false;
  if (name.startsWith(".")) return false;
  return true;
}

export async function POST(request: Request) {
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Body inválido" }, { status: 400 });
  }

  const fileNameRaw = formData.get("fileName");
  const file = formData.get("file");

  if (typeof fileNameRaw !== "string" || !isSafeStorageFileName(fileNameRaw)) {
    return NextResponse.json({ error: "fileName inválido" }, { status: 400 });
  }

  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "Archivo inválido" }, { status: 400 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    }
  );

  const buffer = Buffer.from(await file.arrayBuffer());
  const contentType = file.type || "application/octet-stream";

  const { error } = await supabase.storage
    .from("productos")
    .upload(fileNameRaw, buffer, { contentType, upsert: false });

  if (error) {
    console.error("[API /upload-imagen] error", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data: urlData } = supabase.storage.from("productos").getPublicUrl(fileNameRaw);
  return NextResponse.json({ url: urlData.publicUrl });
}
