-- Ejecutar en Supabase SQL Editor si aún no existe la fila.
-- Prioridad en la app: hero_video_url (BD) → NEXT_PUBLIC_HERO_VIDEO_URL → public/videos/hero-bg.mp4 → demo Pexels

INSERT INTO contenido_sitio (clave, valor, descripcion, seccion)
VALUES (
  'hero_video_url',
  '',
  'URL del video de fondo del hero (MP4). Vacío: variable de entorno o archivo local.',
  'hero'
)
ON CONFLICT (clave) DO UPDATE SET
  descripcion = EXCLUDED.descripcion;
