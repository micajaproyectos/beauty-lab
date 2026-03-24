export interface DbProduct {
  id: string;           // uuid
  created_at?: string;
  nombre: string;
  descripción: string;  // nombre exacto de la columna en Supabase
  precio: number;
  categoria: string;
  stock: number;
  imagen_url: string;
  activo: boolean;
  badge?: string;       // ej: "Recomendado", "Más vendido" — vacío = sin badge
  tipo_piel?: string;   // ej: "Grasa", "Mixta", "Normal", "Seca", "Sensible", "Todo tipo"
}

export interface Tratamiento {
  id: string;           // uuid
  nombre: string;
  descripcion: string;
  categoria: string;
  activo: boolean;
  orden: number;
  created_at?: string;
  updated_at?: string;
}
