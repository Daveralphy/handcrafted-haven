import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const productId = typeof body.productId === "string" ? body.productId : "";
    const comment =
      typeof body.comment === "string" && body.comment.trim().length > 0
        ? body.comment.trim()
        : null;
    const rating = Number(body.rating);

    if (!productId) {
      return NextResponse.json({ error: "Missing product." }, { status: 400 });
    }

    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5." },
        { status: 400 }
      );
    }

    const prisma = getPrisma();
    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: { id: true },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found." }, { status: 404 });
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "You must be signed in to add a review." },
        { status: 401 }
      );
    }

    const customer = await prisma.user.findFirst({
      where: {
        OR: [{ id: user.id }, { email: user.email || "" }],
      },
      select: { id: true },
    });

    if (!customer) {
      return NextResponse.json(
        { error: "Your account needs to finish setup before you can add reviews." },
        { status: 403 }
      );
    }

    await prisma.review.create({
      data: {
        productId,
        rating,
        comment,
        customerId: customer.id,
      },
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Create review error:", error);
    return NextResponse.json(
      { error: "Failed to add review." },
      { status: 500 }
    );
  }
}
