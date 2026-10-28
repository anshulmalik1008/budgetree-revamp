
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, products } from "@/data/suiteProducts";
import ProductPage from "@/components/ProductPage";

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) return {};

  return {
    title: `${product.name} | BudgeTree`,
    description: product.description,
    openGraph: {
      title: `${product.name} | BudgeTree`,
      description: product.tagline,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    notFound();
  }

  return <ProductPage product={product} />;
}
