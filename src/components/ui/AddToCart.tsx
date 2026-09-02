"use client";

import { useState } from "react";
import { Product } from "@/lib/types";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/Button";

export function AddToCart({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const outOfStock = product.stock <= 0;

  return (
    <div>
      <Button
        disabled={outOfStock}
        onClick={() => {
          addItem(product);
          setAdded(true);
          setTimeout(() => setAdded(false), 2000);
        }}
        className="w-full md:w-auto"
      >
        {outOfStock ? "Épuisé" : added ? "Ajouté ✓" : "👑 Réclamer cette Couronne"}
      </Button>
      {!outOfStock && product.stock <= 10 && (
        <p className="mt-3 text-xs text-ink/50">Plus que {product.stock} disponible{product.stock > 1 ? "s" : ""} dans cette édition.</p>
      )}
    </div>
  );
}
