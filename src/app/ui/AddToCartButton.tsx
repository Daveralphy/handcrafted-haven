"use client";

import { useState } from "react";

/* Designed by Porter Luke Frazier */

type AddToCartButtonProps = {
  product: {
    id: string;
    title: string;
    price: number;
    imageUrl?: string | null;
  };
};

type CartItem = AddToCartButtonProps["product"] & {
  quantity: number;
};

const cartStorageKey = "handcrafted-haven-cart";

function readCart(): CartItem[] {
  try {
    const savedCart = window.localStorage.getItem(cartStorageKey);
    return savedCart ? JSON.parse(savedCart) : [];
  } catch {
    return [];
  }
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    const cartItems = readCart();
    const existingItem = cartItems.find((item) => item.id === product.id);
    const nextCart = existingItem
      ? cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      : [...cartItems, { ...product, quantity: 1 }];

    window.localStorage.setItem(cartStorageKey, JSON.stringify(nextCart));
    window.dispatchEvent(new Event("handcrafted-haven-cart-updated"));
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      style={{
        alignSelf: "flex-start",
        padding: "0.75rem 1rem",
        color: "#ffffff",
        backgroundColor: "var(--color-primary)",
        border: "none",
        borderRadius: "8px",
        textDecoration: "none",
        fontWeight: 700,
        fontFamily: "var(--font-body)",
        cursor: "pointer",
        boxShadow: "0 4px 12px rgba(75, 0, 130, 0.16)",
      }}
    >
      {added ? "Added to cart" : "Add to cart"}
    </button>
  );
}
