/* Designed by Porter Luke Frazier */

export type NavItem = {
  label: string;
  href: string;
};

export const siteConfig = {
  title: "Handcrafted Haven",
  description:
    "A virtual marketplace for unique handmade products and artisan stories.",
  navItems: [
    { label: "Shop", href: "/products" },
    { label: "About", href: "/about" },
    { label: "Artisans", href: "/artisans" },
    { label: "Contact", href: "/contact" },
  ] satisfies NavItem[],
  actions: {
    search: {
      href: "/search",
      label: "Search products",
    },
    cart: {
      href: "/cart",
      label: "Shopping cart",
    },
  },
};