import Image from "next/image";
import { Product } from "@/lib/types";

/**
 * Renders the real product photo when one has been uploaded (via /admin or
 * Supabase). Until then, falls back to a colored placeholder built from the
 * product's own accent_color instead of an unrelated stock photo — closer
 * to the real airbrushed caps than generic photography would be.
 */
export function ProductImage({
  product,
  className = "",
  sizes,
  priority,
}: {
  product: Product;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const hasRealPhoto = product.image_url?.startsWith("http") && !product.image_url.includes("picsum.photos");

  if (hasRealPhoto) {
    return (
      <Image
        src={product.image_url}
        alt={product.name}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover ${className}`}
      />
    );
  }

  return (
    <div
      className={`absolute inset-0 flex flex-col items-center justify-center gap-3 ${className}`}
      style={{
        background: `linear-gradient(150deg, ${product.accent_color ?? "#D8CFC4"} 0%, #FFFDF9 130%)`,
      }}
    >
      <CapSilhouette color="#14110F" opacity={0.14} />
      <span className="font-display text-3xl italic text-ink/70">VK</span>
    </div>
  );
}

function CapSilhouette({ color = "#000", opacity = 1 }: { color?: string; opacity?: number }) {
  return (
    <svg width="120" height="70" viewBox="0 0 120 70" fill="none" style={{ opacity }}>
      <path
        d="M10 60 Q10 15 60 15 Q110 15 110 60"
        stroke={color}
        strokeWidth="4"
        fill="none"
      />
      <path d="M60 15 L110 30 Q118 33 110 38 L60 30 Z" fill={color} />
      <line x1="10" y1="60" x2="110" y2="60" stroke={color} strokeWidth="4" />
    </svg>
  );
}
