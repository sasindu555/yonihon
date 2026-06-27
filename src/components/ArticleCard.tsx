import Image from "next/image";
import Link from "next/link";
import { Guide } from "@/lib/types";

interface ArticleCardProps {
  article: Guide;
  variant?: "default" | "featured" | "horizontal";
}

export default function ArticleCard({ article, variant = "default" }: ArticleCardProps) {
  if (variant === "horizontal") {
    return (
      <Link href={`/travel-guide/${article.slug}`} className="group flex gap-4 items-start">
        <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0">
          <Image
            src={article.image}
            alt={article.title}
            width={200}
            height={200}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-xs text-primary font-medium">{article.category}</span>
          <h4 className="text-sm font-semibold text-zinc-900 group-hover:text-primary transition-colors mt-0.5 line-clamp-2">
            {article.title}
          </h4>
          <p className="text-xs text-zinc-500 mt-1">
            {article.readTime} &middot; {article.date}
          </p>
        </div>
      </Link>
    );
  }

  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-sm border border-zinc-100 transition-shadow hover:shadow-md">
      <Link href={`/travel-guide/${article.slug}`} className="block">
        <div className="relative aspect-[3/2] overflow-hidden">
          <Image
            src={article.image}
            alt={article.title}
            width={900}
            height={600}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      </Link>
      <div className="p-4">
        <Link
          href={`/travel-guide/category/${article.categorySlug}`}
          className="text-xs text-primary font-medium hover:underline"
        >
          {article.category}
        </Link>
        <Link href={`/travel-guide/${article.slug}`}>
          <h3 className="font-semibold text-base leading-snug text-zinc-900 hover:text-primary transition-colors mt-1">
            {article.title}
          </h3>
        </Link>
        {variant === "featured" && (
          <p className="text-sm text-zinc-600 mt-1.5 line-clamp-2">{article.excerpt}</p>
        )}
        <p className="text-xs text-zinc-500 mt-2">
          {article.readTime} &middot; {article.date}
        </p>
      </div>
    </div>
  );
}
