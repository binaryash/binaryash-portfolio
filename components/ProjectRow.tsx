"use client";

import { useRef } from "react";
import LetterSwapForward from "@/components/fancy/text/letter-swap-forward-anim";
import { ArrowUpRightIcon, type ArrowUpRightIconHandle } from "@/components/ui/arrow-up-right";
import type { Project } from "@/lib/projects";

export default function ProjectRow({ project }: { project: Project }) {
  const arrowRef = useRef<ArrowUpRightIconHandle>(null);

  const trackCursor = (e: React.PointerEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <a
      href={project.href}
      onPointerMove={trackCursor}
      onMouseEnter={() => arrowRef.current?.startAnimation()}
      onMouseLeave={() => arrowRef.current?.stopAnimation()}
      className="glow-row group -mx-4 flex items-start gap-4 rounded-md px-4 py-5"
    >
      <div className="min-w-0 flex-1">
        <LetterSwapForward
          label={project.name}
          staggerDuration={0.02}
          className="justify-start! text-2xl tracking-[-0.02em] text-fg transition-colors group-hover:text-brand"
        />
        <p className="mt-1 text-body">{project.description}</p>
        <p className="mt-2 font-mono text-xs text-dim">
          {[project.year, ...project.tags].join(" · ")}
        </p>
      </div>
      <ArrowUpRightIcon
        ref={arrowRef}
        size={18}
        aria-hidden
        className="mt-2 text-dim transition-[color,transform] duration-300 group-hover:translate-x-1 group-hover:text-brand"
      />
    </a>
  );
}
