"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, type Variants } from "motion/react";
import LetterSwapForward from "@/components/fancy/text/letter-swap-forward-anim";
import ScrambleIn, { type ScrambleInHandle } from "@/components/fancy/text/scramble-in";

const list: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04, delayChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 8, filter: "blur(4px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

export default function TechGroup({ category, items }: { category: string; items: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const scrambleRef = useRef<ScrambleInHandle>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  useEffect(() => {
    if (inView) scrambleRef.current?.start();
  }, [inView]);

  return (
    <div ref={ref}>
      <h2 className="h-4 font-mono text-xs text-dim">
        <ScrambleIn
          ref={scrambleRef}
          text={category}
          autoStart={false}
          scrambleSpeed={35}
          scrambledLetterCount={3}
          scrambledClassName="text-brand"
        />
      </h2>
      <motion.ul
        variants={list}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="mt-4 grid grid-cols-2 gap-x-8 gap-y-2.5 sm:grid-cols-4"
      >
        {items.map((name) => (
          <motion.li key={name} variants={item}>
            <LetterSwapForward
              label={name}
              staggerDuration={0.02}
              className="justify-start! text-body transition-colors hover:text-fg"
            />
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}
