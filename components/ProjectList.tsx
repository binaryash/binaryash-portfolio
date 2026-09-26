"use client";

import { useState } from "react";
import AnimatedTabs from "@/components/smoothui/animated-tabs";
import ProjectRow from "@/components/ProjectRow";
import { BlurFade } from "@/components/ui/blur-fade";
import { projectCategories, projects } from "@/lib/projects";

const tabs = projectCategories.map((id) => ({ id, label: id }));

export default function ProjectList() {
  const [filter, setFilter] = useState<string>("all");
  const visible = projects.filter((p) => filter === "all" || p.category === filter);

  return (
    <>
      <BlurFade delay={0.1}>
        <AnimatedTabs
          tabs={tabs}
          activeTab={filter}
          onChange={setFilter}
          variant="pill"
          className="frosted bg-transparent font-mono [&_[role=tab]]:px-3 [&_[role=tab]]:py-1 [&_[role=tab]]:text-xs [&_[role=tab]]:font-normal"
        />
      </BlurFade>

      <ul className="mt-10 divide-y divide-hairline border-y border-hairline">
        {visible.map((project, index) => (
          <li key={project.name}>
            <BlurFade key={filter} delay={0.05 + index * 0.05}>
              <ProjectRow project={project} />
            </BlurFade>
          </li>
        ))}
      </ul>
    </>
  );
}
