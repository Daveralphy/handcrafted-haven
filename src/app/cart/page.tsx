// Designed by Porter Luke Frazier - Client cart order summary interface
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type CartItem = {
  id: string;
  title: string;
  price: number;
  quantity: number;
  imageUrl?: string | null;
};

const cartStorageKey = "handcrafted-haven-cart";

function loadCartItems(): CartItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const savedCart = window.localStorage.getItem(cartStorageKey);
    const parsedCart = savedCart ? JSON.parse(savedCart) : [];
    return Array.isArray(parsedCart)
      ? parsedCart
          .filter((item) => item?.id && item?.title)
          .map((item) => ({
            id: String(item.id),
            title: String(item.title),
            price: Number(item.price) || 0,
            quantity: Math.max(1, Number(item.quantity) || 1),
            imageUrl: item.imageUrl || null,
          }))
      : [];
  } catch {
    return [];
  }
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>(loadCartItems);
  const [checkingUser, setCheckingUser] = useState(false);
  const [message, setMessage] = useState("");

  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
    [cartItems]
  );
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const saveCart = (nextCartItems: CartItem[]) => {
    setCartItems(nextCartItems);
    window.localStorage.setItem(cartStorageKey, JSON.stringify(nextCartItems));
    window.dispatchEvent(new Event("handcrafted-haven-cart-updated"));
  };

  const updateQuantity = (id: string, quantity: number) => {
    const nextCartItems = cartItems
      .map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
      .filter((item) => item.quantity > 0);

    saveCart(nextCartItems);
  };

  const removeItem = (id: string) => {
    saveCart(cartItems.filter((item) => item.id !== id));
  };

  const handleCheckout = async () => {
    setMessage("");
    setCheckingUser(true);

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setCheckingUser(false);

    if (!user) {
      router.push("/login?redirect=/cart");
      return;
    }

    saveCart([]);
    setMessage("Thank you for your purchase. Your cart has been cleared.");
  };

  const renderCartRows = () =>
    cartItems.map((item) => {
      const itemTotal = item.price * item.quantity;

      return (
        <article
          key={item.id}
          className="max-[700.98px]:!grid-cols-1 max-[700.98px]:!gap-4"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) auto auto",
            gap: "1.25rem",
            alignItems: "center",
            padding: "1.25rem",
            backgroundColor: "#ffffff",
            border: "1px solid rgba(75, 0, 130, 0.12)",
            borderRadius: "8px",
            boxShadow: "0 6px 18px rgba(75, 0, 130, 0.07)",
          }}
        >
          <div style={{ minWidth: 0 }}>
            <h2
              style={{
                margin: 0,
                color: "var(--color-primary)",
                fontFamily: "var(--font-heading)",
                fontSize: "1.35rem",
                lineHeight: 1.2,
              }}
            >
              {item.title}
            </h2>
            <p style={{ margin: "0.4rem 0 0", color: "#334155" }}>
              {formatCurrency(item.price)} each
            </p>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <button
              type="button"
              aria-label={`Decrease quantity for ${item.title}`}
              onClick={() =>
                item.quantity === 1
                  ? removeItem(item.id)
                  : updateQuantity(item.id, item.quantity - 1)
              }
              style={{
                width: "2.25rem",
                height: "2.25rem",
                borderRadius: "8px",
                border: "1px solid rgba(75, 0, 130, 0.22)",
                backgroundColor: "var(--color-background)",
                color: "var(--color-primary)",
                cursor: "pointer",
                fontWeight: 800,
              }}
            >
              -
            </button>
            <span
              style={{
                minWidth: "2rem",
                textAlign: "center",
                color: "#0f172a",
                fontWeight: 700,
              }}
            >
              {item.quantity}
            </span>
            <button
              type="button"
              aria-label={`Increase quantity for ${item.title}`}
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              style={{
                width: "2.25rem",
                height: "2.25rem",
                borderRadius: "8px",
                border: "1px solid rgba(75, 0, 130, 0.22)",
                backgroundColor: "var(--color-accent)",
                color: "var(--color-primary)",
                cursor: "pointer",
                fontWeight: 800,
              }}
            >
              +
            </button>
          </div>

          <strong
            style={{
              color: "var(--color-primary)",
              fontSize: "1.1rem",
              textAlign: "right",
            }}
          >
            {formatCurrency(itemTotal)}
          </strong>
        </article>
      );
    });

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--color-background)",
        padding: "clamp(1.5rem, 5vw, 4rem) 1.25rem",
        fontFamily: "var(--font-body)",
      }}
    >
      <section
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) minmax(280px, 340px)",
          gap: "1.5rem",
          alignItems: "start",
        }}
        className="max-[860.98px]:!grid-cols-1"
      >
        <div style={{ minWidth: 0 }}>
          <h1
            style={{
              margin: "0 0 1.5rem",
              color: "var(--color-primary)",
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(2.25rem, 6vw, 3.5rem)",
              lineHeight: 1,
            }}
          >
            Shopping Cart
          </h1>

          {message && (
            <div
              role="status"
              style={{
                marginBottom: "1rem",
                padding: "1rem",
                backgroundColor: "#ecfdf5",
                border: "1px solid #86efac",
                borderRadius: "8px",
                color: "#166534",
                fontWeight: 700,
              }}
            >
              {message}
            </div>
          )}

          {cartItems.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {renderCartRows()}
            </div>
          ) : (
            <div
              style={{
                padding: "3rem 2rem",
                backgroundColor: "#ffffff",
                border: "1px solid rgba(75, 0, 130, 0.12)",
                borderRadius: "8px",
                textAlign: "center",
                boxShadow: "0 6px 18px rgba(75, 0, 130, 0.07)",
              }}
            >
              <h2
                style={{
                  margin: "0 0 0.75rem",
                  color: "var(--color-primary)",
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.75rem",
                }}
              >
                Your cart is empty
              </h2>
              <p style={{ margin: "0 0 1.25rem", color: "#334155" }}>
                Add a handmade piece from the products page to begin an order.
              </p>
              <Link
                href="/products"
                style={{
                  display: "inline-flex",
                  padding: "0.75rem 1rem",
                  color: "var(--color-primary)",
                  backgroundColor: "var(--color-accent)",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontWeight: 700,
                }}
              >
                Browse products
              </Link>
            </div>
          )}
        </div>

        <aside
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid rgba(75, 0, 130, 0.12)",
            borderRadius: "8px",
            padding: "1.5rem",
            boxShadow: "0 8px 24px rgba(75, 0, 130, 0.08)",
            position: "sticky",
            top: "1rem",
          }}
          className="max-[860.98px]:!static"
        >
          <h2
            style={{
              margin: "0 0 1rem",
              color: "var(--color-primary)",
              fontFamily: "var(--font-heading)",
              fontSize: "1.6rem",
            }}
          >
            Order Summary
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", color: "#334155" }}>
              <span>Items</span>
              <strong>{itemCount}</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", color: "#334155" }}>
              <span>Subtotal</span>
              <strong>{formatCurrency(subtotal)}</strong>
            </div>
            <div
              style={{
                height: "1px",
                backgroundColor: "rgba(75, 0, 130, 0.12)",
                margin: "0.25rem 0",
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "var(--color-primary)",
                fontSize: "1.2rem",
              }}
            >
              <span>Total</span>
              <strong>{formatCurrency(subtotal)}</strong>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCheckout}
            disabled={cartItems.length === 0 || checkingUser}
            style={{
              width: "100%",
              marginTop: "1.25rem",
              padding: "0.9rem 1rem",
              color: "var(--color-primary)",
              backgroundColor: "var(--color-accent)",
              border: "none",
              borderRadius: "8px",
              fontWeight: 800,
              fontFamily: "var(--font-body)",
              cursor: cartItems.length === 0 || checkingUser ? "not-allowed" : "pointer",
              opacity: cartItems.length === 0 || checkingUser ? 0.62 : 1,
            }}
          >
            {checkingUser ? "Checking account..." : "Checkout"}
          </button>
        </aside>
      </section>
    </main>
  );
}
