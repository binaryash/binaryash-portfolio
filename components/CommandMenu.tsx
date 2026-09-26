"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight, FileText, CornerDownRight, SunMoon } from "lucide-react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { useToggleTheme } from "@/components/ThemeToggle";
import { useModKey } from "@/hooks/useModKey";
import { useShortcuts } from "@/hooks/useShortcuts";
import { site } from "@/lib/site";

interface CommandMenuProps {
  posts: { slug: string; title: string }[];
}

const socials = [
  { label: "github", href: site.socials.github },
  { label: "linkedin", href: site.socials.linkedin },
  { label: "resume", href: site.socials.resume },
  { label: "email", href: `mailto:${site.email}` },
];

export default function CommandMenu({ posts }: CommandMenuProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const toggleTheme = useToggleTheme();
  const mod = useModKey();

  const togglePalette = useCallback(() => setOpen((v) => !v), []);
  useShortcuts({ onPalette: togglePalette, onToggleTheme: toggleTheme });

  const run = (action: () => void) => {
    setOpen(false);
    action();
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open command menu"
        className="frosted rounded-full px-3 py-1 font-mono text-xs text-dim transition-colors hover:text-fg"
      >
        {mod}K
      </button>

      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Command menu"
        description="Jump to a page, post or action"
        className="frosted font-mono sm:max-w-lg"
      >
        <Command className="bg-transparent">
          <CommandInput placeholder="type a command or search…" />
          <CommandList data-lenis-prevent>
            <CommandEmpty>zsh: no matches found</CommandEmpty>
            <CommandGroup heading="navigate">
              {site.nav.map((item) => (
                <CommandItem
                  key={item.href}
                  value={`go ${item.label}`}
                  onSelect={() => run(() => router.push(item.href))}
                >
                  <CornerDownRight />
                  <span>
                    <span className="text-dim">~/</span>
                    {item.label}
                  </span>
                  <CommandShortcut>g {item.key}</CommandShortcut>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="actions">
              <CommandItem value="toggle theme" onSelect={() => run(toggleTheme)}>
                <SunMoon />
                <span>toggle theme</span>
                <CommandShortcut>t</CommandShortcut>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="writing">
              {posts.map((post) => (
                <CommandItem
                  key={post.slug}
                  value={`post ${post.title}`}
                  onSelect={() => run(() => router.push(`/blog/${post.slug}`))}
                >
                  <FileText />
                  <span className="truncate font-serif text-sm">{post.title}</span>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="elsewhere">
              {socials.map((social) => (
                <CommandItem
                  key={social.label}
                  value={`social ${social.label}`}
                  onSelect={() =>
                    run(() => window.open(social.href, "_blank", "noopener,noreferrer"))
                  }
                >
                  <ArrowUpRight />
                  <span>{social.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}
