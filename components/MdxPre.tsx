import { isValidElement, type ComponentProps, type ReactElement } from "react";
import type { BundledLanguage } from "shiki";
import {
  CodeBlock,
  CodeBlockCopyButton,
  CodeBlockFilename,
  CodeBlockHeader,
  CodeBlockItem,
} from "@/components/kibo-ui/code-block";
import { CodeBlockContent } from "@/components/kibo-ui/code-block/server";

type CodeElement = ReactElement<{
  className?: string;
  children?: string;
  "data-meta"?: string;
}>;

const themes = { light: "github-light", dark: "vesper" } as const;

export default function MdxPre({ children }: ComponentProps<"pre">) {
  if (!isValidElement(children)) return <pre>{children}</pre>;

  const { className = "", children: raw = "", "data-meta": meta = "" } =
    (children as CodeElement).props;
  const language = className.replace(/^language-/, "") || "text";
  const filename = /title="([^"]+)"/.exec(meta)?.[1] ?? language;
  const code = raw.replace(/\n$/, "");

  return (
    <CodeBlock
      data-code-block
      data={[{ language, filename, code }]}
      defaultValue={language}
      className="rounded-lg border-hairline bg-transparent"
    >
      <CodeBlockHeader className="justify-between border-hairline bg-muted/60 p-0 pr-1">
        <CodeBlockFilename value={language}>{filename}</CodeBlockFilename>
        <CodeBlockCopyButton aria-label="Copy code" className="size-7" />
      </CodeBlockHeader>
      <CodeBlockItem value={language} lineNumbers={false} className="bg-transparent">
        <CodeBlockContent language={language as BundledLanguage} themes={themes}>
          {code}
        </CodeBlockContent>
      </CodeBlockItem>
    </CodeBlock>
  );
}
