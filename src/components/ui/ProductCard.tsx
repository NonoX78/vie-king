"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/products";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/product/${product.slug}`} className="group block">
        <div className="relative aspect-[4/5] overflow-hidden bg-sand/30">
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-[1200ms] ease-luxury group-hover:scale-[1.06]"
          />
        </div>

        {/* Museum placard */}
        <div className="mt-4 flex items-start justify-between gap-4 hairline-top pt-4">
          <div>
            <p className="placard text-ink/50">{product.edition}</p>
            <h3 className="mt-1 font-display text-xl italic">{product.name}</h3>
            <p className="placard mt-1 text-ink/50">{product.colorway}</p>
          </div>
          <p className="font-body text-sm text-ink/80">{formatPrice(product.price_cents)}</p>
        </div>
      </Link>
    </motion.div>
  );
}
