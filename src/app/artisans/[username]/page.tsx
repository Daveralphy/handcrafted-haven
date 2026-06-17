/* Designed by Porter Luke Frazier */
import { notFound } from "next/navigation";
import { getPrisma } from "@/lib/prisma";
import PublicArtisanProfile from "../../ui/PublicArtisanProfile";

export const dynamic = "force-dynamic";

interface ArtisanProfilePageProps {
  params: Promise<{
    username: string;
  }>;
}

function createUsernameSlug(artisan: { id: string; name: string | null; email: string }) {
  const source = artisan.name || artisan.email.split("@")[0] || artisan.id;
  const slug = source
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || artisan.id;
}

export default async function ArtisanProfilePage({ params }: ArtisanProfilePageProps) {
  const { username } = await params;
  const prisma = getPrisma();

  const directMatch = await prisma.user.findFirst({
    where: {
      role: "artisan",
      OR: [
        { id: username },
        { email: { startsWith: `${username}@`, mode: "insensitive" } },
      ],
    },
    include: {
      products: {
        orderBy: { createdAt: "desc" },
          select: {
            id: true,
            title: true,
            price: true,
            category: true,
            availability: true,
            imageUrl: true,
          },
      },
    },
  });

  const artisan = directMatch ?? (await prisma.user.findMany({
    where: { role: "artisan" },
    include: {
      products: {
        orderBy: { createdAt: "desc" },
          select: {
            id: true,
            title: true,
            price: true,
            category: true,
            availability: true,
            imageUrl: true,
          },
      },
    },
  })).find((candidate) => createUsernameSlug(candidate) === username);

  if (!artisan) {
    notFound();
  }

  const products = artisan.products.map((product) => ({
    id: product.id,
    title: product.title,
    price: product.price,
    category: product.category || "Handmade",
    availability: product.availability,
    imageUrl: product.imageUrl,
  }));

  return (
    <main style={{ backgroundColor: "var(--color-background)", minHeight: "100vh", padding: "3rem 2rem" }}>
      <section style={{ maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
        <PublicArtisanProfile
          artisan={{
            name: artisan.name,
            email: artisan.email,
            bio: artisan.bio,
          }}
          products={products}
        />
      </section>
    </main>
  );
}
