import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { PRODUCTS } from "@/lib/products-data";

export async function POST(req: NextRequest) {
  const { productId } = await req.json();
  const product = PRODUCTS.find((p) => p.id === productId);

  if (!product || !product.price) {
    return NextResponse.json({ error: "Product not found or not purchasable" }, { status: 400 });
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "gbp",
          product_data: {
            name: product.name,
            description: product.tagline,
          },
          unit_amount: product.price,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/products?success=1`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/products`,
  });

  return NextResponse.json({ url: session.url });
}
