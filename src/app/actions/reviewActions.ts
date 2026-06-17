/* Designed by Porter Luke Frazier */

"use server";

import { revalidatePath } from "next/cache";
import { getPrisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";

type ReviewActionResult = {
  error?: string;
  success?: boolean;
};

function stripScriptInput(value: string) {
  return value
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/\son\w+=(?:"[^"]*"|'[^']*'|[^\s>]*)/gi, "")
    .replace(/javascript:/gi, "")
    .trim();
}

export async function addReview({
  productId,
  rating,
  comment,
}: {
  productId: string;
  rating: number;
  comment: string;
}): Promise<ReviewActionResult> {
  const cleanProductId = stripScriptInput(productId);
  const cleanComment = stripScriptInput(comment);
  const parsedRating = Number(rating);

  if (!cleanProductId) {
    return { error: "Missing product." };
  }

  if (!Number.isInteger(parsedRating) || parsedRating < 1 || parsedRating > 5) {
    return { error: "Rating must be between 1 and 5." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be signed in to add a review." };
  }

  const prisma = getPrisma();
  const [product, customer] = await Promise.all([
    prisma.product.findUnique({
      where: { id: cleanProductId },
      select: { id: true },
    }),
    prisma.user.findFirst({
      where: {
        OR: [{ id: user.id }, { email: user.email || "" }],
      },
      select: { id: true },
    }),
  ]);

  if (!product) {
    return { error: "Product not found." };
  }

  if (!customer) {
    return { error: "Your account needs to finish setup before you can add reviews." };
  }

  await prisma.review.create({
    data: {
      productId: product.id,
      rating: parsedRating,
      comment: cleanComment || null,
      customerId: customer.id,
    },
  });

  revalidatePath(`/products/${product.id}`);

  return { success: true };
}
