"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import CenterUnderline from "@/components/fancy/text/underline-center";
import CommandMenu from "@/components/CommandMenu";
import ThemeToggle from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

interface NavProps {
  posts: { slug: string; title: string }[];
}

export default function Nav({ posts }: NavProps) {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 flex items-center justify-between px-4 py-4 sm:px-8 sm:py-6">
      <nav aria-label="Primary" className="pointer-events-auto">
        <ul className="flex gap-4 font-mono text-xs sm:gap-5 sm:text-[13px]">
          {site.nav.map((item) => {
            const active = isActive(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "transition-colors",
                    active ? "text-brand" : "text-fg hover:text-brand",
                  )}
                >
                  <CenterUnderline underlineHeightRatio={0.08} underlinePaddingRatio={0.15}>
                    <span className="hidden text-dim sm:inline">~/</span>
                    {item.label}
                  </CenterUnderline>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="pointer-events-auto flex items-center gap-2">
        <CommandMenu posts={posts} />
        <ThemeToggle />
      </div>
    </header>
  );
}
