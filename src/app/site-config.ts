export type NavItem = {
  label: string;
  href: string;
};

export const siteConfig = {
  title: "Handcrafted Haven",
  description:
    "A virtual marketplace for unique handmade products and artisan stories.",
  navItems: [
    { label: "Link 1", href: "/link-1" },
    { label: "Link 2", href: "/link-2" },
    { label: "Link 3", href: "/link-3" },
    { label: "Link 4", href: "/link-4" },
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
