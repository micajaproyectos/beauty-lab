# Video del Hero

Coloca aquí tu video de fondo con el nombre **`hero-bg.mp4`** (H.264, recomendado 1920×1080 o similar, ligero para carga rápida).

**Si no subes archivo**, el Hero usa un clip de demostración (Pexels) como respaldo automático.

Alternativa: define en `.env.local` una URL pública (tiene prioridad sobre todo):

```env
NEXT_PUBLIC_HERO_VIDEO_URL=https://tu-cdn.com/ruta/video.mp4
```

**Nota:** el video va **silenciado** en el código (`muted`) para que el navegador permita autoplay.
