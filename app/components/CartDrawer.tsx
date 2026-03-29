"use client";

import { useEffect } from "react";
import { useCart, type CartItem } from "../context/CartContext";

function formatPrice(price: number): string {
  return `$${price.toLocaleString("es-CL")}`;
}

function buildWhatsAppUrl(items: CartItem[], totalPrice: number): string {
  const phone = "56933987534";

  const services = items.filter((i) => i.type === "service");
  const products = items.filter((i) => i.type === "product");

  const onlyServices = services.length > 0 && products.length === 0;
  const onlyProducts = products.length === 0 && services.length === 0;
  const mixed = services.length > 0 && products.length > 0;

  const separator = "─────────────────────";

  const sections: string[] = [];

  // ── Intro ──
  if (onlyServices) {
    sections.push("Hola! Quiero cotizar los siguientes tratamientos de Beauty Lab.");
  } else if (onlyProducts) {
    sections.push("Hola! Quiero comprar los siguientes productos de Beauty Lab.");
  } else {
    sections.push("Hola! Les escribo desde Beauty Lab.\n\nMe gustaría cotizar y/o comprar lo siguiente:");
  }

  // ── Tratamientos ──
  if (services.length > 0) {
    const block: string[] = ["*Tratamientos a cotizar*"];
    services.forEach((i) => {
      const qty = i.quantity > 1 ? ` ×${i.quantity}` : "";
      block.push(`  › ${i.name}${qty}`);
    });
    sections.push(block.join("\n"));
  }

  // ── Productos ──
  if (products.length > 0) {
    const block: string[] = ["*Productos*"];
    products.forEach((i) => {
      const qty = i.quantity > 1 ? ` ×${i.quantity}` : "";
      block.push(`  › ${i.name}${qty} — ${formatPrice(i.price * i.quantity)}`);
    });
    sections.push(block.join("\n"));
  }

  // ── Resumen ──
  const summary: string[] = [separator];

  if (mixed) {
    if (totalPrice > 0) summary.push(`Total productos: *${formatPrice(totalPrice)}*`);
  } else if (totalPrice > 0) {
    summary.push(`*Total: ${formatPrice(totalPrice)}*`);
  }

  summary.push("\n¡Gracias!");
  sections.push(summary.join("\n"));

  const message = sections.join("\n\n");
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

function ItemRow({
  item,
  onRemove,
  onUpdateQty,
}: {
  item: CartItem;
  onRemove: () => void;
  onUpdateQty: (qty: number) => void;
}) {
  const isService = item.type === "service";

  return (
    <li className="flex gap-3 rounded-2xl bg-white p-4 shadow-[0_2px_12px_rgba(44,35,41,0.06)]">
      {/* Visual swatch */}
      <div
        className={`h-16 w-14 flex-shrink-0 rounded-xl bg-gradient-to-br ${
          isService
            ? "from-[#F2E4DF] to-[#D4A5A0]"
            : "from-[#E8C9C1] to-[#C9A96E]"
        } flex items-center justify-center`}
      >
        {isService ? (
          <svg
            className="h-5 w-5 text-[#8B5E6D]/60"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
            />
          </svg>
        ) : (
          <div className="flex flex-col items-center gap-0.5 opacity-30">
            <div className="h-1.5 w-4 rounded-t-full bg-white/80" />
            <div className="h-8 w-7 rounded-lg bg-white/80" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col justify-between min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate font-[family-name:var(--font-cormorant)] text-base font-medium leading-tight text-[#2C2329]">
              {item.name}
            </p>
            {isService && (
              <span className="inline-block mt-0.5 rounded-full bg-[#F2E4DF] px-2 py-0.5 font-[family-name:var(--font-inter)] text-[9px] font-medium tracking-wider text-[#8B5E6D] uppercase">
                Servicio
              </span>
            )}
          </div>
          <button
            onClick={onRemove}
            className="flex-shrink-0 text-[#B5A8AC] transition-colors hover:text-[#8B5E6D]"
            aria-label={`Eliminar ${item.name}`}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex items-center justify-between mt-2">
          {/* Quantity controls */}
          <div className="flex items-center gap-1.5 rounded-full border border-[#E8C9C1] px-1">
            <button
              onClick={() => onUpdateQty(item.quantity - 1)}
              className="flex h-6 w-6 items-center justify-center rounded-full text-[#7A6A6E] transition-colors hover:bg-[#F2E4DF] hover:text-[#5C3A48]"
              aria-label="Restar cantidad"
            >
              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
            <span className="w-5 text-center font-[family-name:var(--font-inter)] text-sm font-medium text-[#2C2329]">
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdateQty(item.quantity + 1)}
              className="flex h-6 w-6 items-center justify-center rounded-full text-[#7A6A6E] transition-colors hover:bg-[#F2E4DF] hover:text-[#5C3A48]"
              aria-label="Sumar cantidad"
            >
              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>

          {/* Price / Quote label */}
          {isService ? (
            <span className="font-[family-name:var(--font-inter)] text-xs font-light italic text-[#C9A96E]">
              A cotizar
            </span>
          ) : (
            <span className="font-[family-name:var(--font-cormorant)] text-lg font-medium text-[#5C3A48]">
              {formatPrice(item.price * item.quantity)}
            </span>
          )}
        </div>
      </div>
    </li>
  );
}

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice, clearCart } =
    useCart();

  const hasServices = items.some((i) => i.type === "service");
  const hasProducts = items.some((i) => i.type === "product");

  const totalCount = items.reduce((s, i) => s + i.quantity, 0);
  const drawerTitle = hasServices && !hasProducts ? "Tu cotización" : "Tu pedido";
  const buttonLabel =
    hasServices && !hasProducts ? "Solicitar cotización" : "Enviar por WhatsApp";

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [closeCart]);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleSend = () => {
    if (items.length === 0) return;
    const url = buildWhatsAppUrl(items, totalPrice);
    window.open(url, "_blank");
    clearCart();
    closeCart();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-[#2C2329]/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col bg-[#FAF8F5] shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Carrito / Cotización"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E8C9C1]/60 px-6 py-5">
          <div>
            <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-light text-[#2C2329]">
              {drawerTitle}
            </h2>
            {items.length > 0 && (
              <p className="font-[family-name:var(--font-inter)] text-xs font-light text-[#7A6A6E]">
                {totalCount} ítem{totalCount !== 1 ? "s" : ""}
                {hasServices && hasProducts && " · servicios y productos"}
                {hasServices && !hasProducts && " · a cotizar"}
              </p>
            )}
          </div>
          <button
            onClick={closeCart}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E8C9C1] text-[#7A6A6E] transition-colors hover:bg-[#F2E4DF] hover:text-[#5C3A48]"
            aria-label="Cerrar"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F2E4DF]">
                <svg
                  className="h-7 w-7 text-[#D4A5A0]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.2}
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-[family-name:var(--font-cormorant)] text-xl font-light text-[#2C2329]">
                  Todo vacío por aquí
                </p>
                <p className="mt-1 font-[family-name:var(--font-inter)] text-sm font-light text-[#7A6A6E]">
                  Agrega tratamientos o productos para comenzar
                </p>
              </div>
              <button
                onClick={closeCart}
                className="mt-2 rounded-full border border-[#8B5E6D]/40 px-6 py-2.5 font-[family-name:var(--font-inter)] text-xs font-medium tracking-widest text-[#8B5E6D] uppercase transition-all hover:bg-[#8B5E6D] hover:text-white"
              >
                Explorar
              </button>
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map((item) => (
                <ItemRow
                  key={item.id}
                  item={item}
                  onRemove={() => removeItem(item.id)}
                  onUpdateQty={(qty) => updateQuantity(item.id, qty)}
                />
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-[#E8C9C1]/60 px-6 py-5">
            {/* Summary rows */}
            <div className="mb-4 space-y-2">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span className="font-[family-name:var(--font-inter)] text-xs font-light text-[#7A6A6E]">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="font-[family-name:var(--font-inter)] text-xs font-light text-[#7A6A6E]">
                    {item.type === "service" ? "A cotizar" : formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Total (products only) */}
            <div className="flex items-center justify-between border-t border-[#E8C9C1]/60 pt-4">
              <div>
                <span className="font-[family-name:var(--font-inter)] text-sm font-medium tracking-wider text-[#2C2329] uppercase">
                  Total
                </span>
                {hasServices && (
                  <p className="font-[family-name:var(--font-inter)] text-[10px] font-light text-[#B5A8AC]">
                    Servicios: a cotizar
                  </p>
                )}
              </div>
              <span className="font-[family-name:var(--font-cormorant)] text-2xl font-medium text-[#5C3A48]">
                {totalPrice > 0 ? formatPrice(totalPrice) : "A cotizar"}
              </span>
            </div>

            <p className="mt-3 text-center font-[family-name:var(--font-inter)] text-xs font-light text-[#7A6A6E]">
              Sobre $35.000 envío gratis.
            </p>

            {/* Send button */}
            <button
              onClick={handleSend}
              className="mt-5 flex w-full items-center justify-center gap-3 rounded-full bg-[#25D366] py-4 font-[family-name:var(--font-inter)] text-sm font-medium tracking-widest text-white uppercase shadow-lg transition-all hover:bg-[#1ebe5d] hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {buttonLabel}
            </button>

            <p className="mt-3 text-center font-[family-name:var(--font-inter)] text-[10px] font-light tracking-wider text-[#B5A8AC]">
              Se abrirá WhatsApp con tu pedido listo para enviar
            </p>
          </div>
        )}
      </aside>
    </>
  );
}
