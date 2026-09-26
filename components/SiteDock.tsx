"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Dock, DockIcon } from "@/components/ui/dock";
import { GithubIcon } from "@/components/ui/github";
import { LinkedinIcon } from "@/components/ui/linkedin";
import { FileTextIcon } from "@/components/ui/file-text";
import { AtSignIcon } from "@/components/ui/at-sign";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useMounted } from "@/hooks/useMounted";
import { site } from "@/lib/site";

interface IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

type AnimatedIcon = React.ForwardRefExoticComponent<
  { size?: number } & React.RefAttributes<IconHandle>
>;

const links: { label: string; href: string; Icon: AnimatedIcon }[] = [
  { label: "GitHub", href: site.socials.github, Icon: GithubIcon },
  { label: "LinkedIn", href: site.socials.linkedin, Icon: LinkedinIcon },
  { label: "Resume", href: site.socials.resume, Icon: FileTextIcon },
  { label: "Email", href: `mailto:${site.email}`, Icon: AtSignIcon },
];

const subscribeClock = (onTick: () => void) => {
  const id = window.setInterval(onTick, 1000);
  return () => window.clearInterval(id);
};

function visitorTimeZone() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return "UTC";
  }
}

function cityLabel(timeZone: string) {
  return (timeZone.split("/").pop() ?? timeZone).replace(/_/g, " ").toLowerCase();
}

function useVisitorCountry(fallback: string) {
  const [country, setCountry] = useState(fallback);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/geo")
      .then((res) => res.json())
      .then((data: { country?: string | null }) => {
        if (!cancelled && data.country) setCountry(data.country.toLowerCase());
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return country;
}

function Clock() {
  const mounted = useMounted();
  const timeZone = mounted ? visitorTimeZone() : "UTC";
  const country = useVisitorCountry(mounted ? cityLabel(timeZone) : "");

  const time = useSyncExternalStore(
    subscribeClock,
    () =>
      mounted
        ? new Intl.DateTimeFormat("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
            timeZone,
          }).format(new Date())
        : "--:--",
    () => "--:--",
  );

  return (
    <span className="hidden items-center gap-2 px-2 font-mono text-[11px] text-dim sm:flex">
      <span className="size-1.5 rounded-full bg-brand" aria-hidden />
      <span className="lowercase">{country}</span>
      <time className="tabular-nums text-fg" suppressHydrationWarning>
        {time}
      </time>
    </span>
  );
}

function DockLink({ label, href, Icon }: (typeof links)[number]) {
  const iconRef = useRef<IconHandle>(null);
  const external = href.startsWith("http");

  return (
    <a
      href={href}
      aria-label={label}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onMouseEnter={() => iconRef.current?.startAnimation()}
      onMouseLeave={() => iconRef.current?.stopAnimation()}
      onFocus={() => iconRef.current?.startAnimation()}
      onBlur={() => iconRef.current?.stopAnimation()}
      className="grid size-full place-items-center text-dim transition-colors hover:text-fg focus-visible:text-fg"
    >
      <Icon ref={iconRef} size={18} />
    </a>
  );
}

export default function SiteDock() {
  const isTouch = useMediaQuery("(hover: none), (pointer: coarse)");

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center sm:bottom-6">
      <Dock
        iconSize={36}
        iconMagnification={52}
        iconDistance={110}
        disableMagnification={isTouch}
        className="frosted pointer-events-auto mt-0 h-[50px] gap-1 rounded-full px-2"
      >
        {links.map((link) => (
          <DockIcon key={link.label} className="hover:bg-transparent">
            <DockLink {...link} />
          </DockIcon>
        ))}
        <div className="mx-1 hidden h-6 w-px bg-hairline sm:block" aria-hidden />
        <Clock />
      </Dock>
    </div>
  );
}
