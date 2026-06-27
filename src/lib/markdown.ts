import { marked, Renderer } from "marked";
import type { Tokens } from "marked";

class YonihonRenderer extends Renderer {
  heading({ tokens, depth }: Tokens.Heading) {
    const text = this.parser.parseInline(tokens);
    const anchor = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    if (depth === 2) {
      return `<h2 id="${anchor}" class="text-2xl font-bold text-zinc-900 mt-10 mb-4">${text}</h2>\n`;
    }
    if (depth === 3) {
      return `<h3 id="${anchor}" class="text-xl font-bold text-zinc-900 mt-8 mb-3">${text}</h3>\n`;
    }
    return `<h${depth} id="${anchor}" class="font-bold text-zinc-900 mt-6 mb-3">${text}</h${depth}>\n`;
  }

  paragraph({ tokens }: Tokens.Paragraph) {
    const text = this.parser.parseInline(tokens);
    if (!text.trim()) return "\n";
    return `<p class="text-zinc-700 leading-relaxed mb-5">${text}</p>\n`;
  }

  list(token: Tokens.List) {
    const tag = token.ordered ? "ol" : "ul";
    const start = token.ordered && token.start !== 1 ? ` start="${token.start}"` : "";
    let body = "";
    for (const item of token.items) {
      body += this.listitem(item);
    }
    const listClass = token.ordered ? "list-decimal" : "list-disc";
    return `<${tag}${start} class="${listClass} pl-6 space-y-1.5 mb-5 text-zinc-700">\n${body}</${tag}>\n`;
  }

  listitem(item: Tokens.ListItem) {
    const text = this.parser.parse(item.tokens);
    return `<li class="leading-relaxed">${text}</li>\n`;
  }

  blockquote({ tokens }: Tokens.Blockquote) {
    const text = this.parser.parse(tokens);
    return `<blockquote class="border-l-4 border-zinc-300 pl-5 italic text-zinc-600 my-6 py-1">${text}</blockquote>\n`;
  }

  codespan({ text }: Tokens.Codespan) {
    return `<code class="bg-zinc-100 text-zinc-800 px-1.5 py-0.5 rounded text-sm font-mono">${text}</code>`;
  }

  code({ text, lang }: Tokens.Code) {
    const langAttr = lang ? ` lang="${lang}"` : "";
    return `<pre class="bg-zinc-900 text-zinc-100 rounded-lg p-4 overflow-x-auto my-6 text-sm"${langAttr}><code>${text}</code></pre>\n`;
  }

  hr() {
    return `<hr class="border-t border-zinc-200 my-10" />\n`;
  }

  link({ href, title, tokens }: Tokens.Link) {
    const text = this.parser.parseInline(tokens);
    const titleAttr = title ? ` title="${title}"` : "";
    return `<a href="${href}"${titleAttr} class="text-primary underline hover:text-primary-dark transition-colors">${text}</a>`;
  }

  image({ href, title, text }: Tokens.Image) {
    const titleAttr = title ? ` title="${title}"` : "";
    return `<img src="${href}" alt="${text}"${titleAttr} class="rounded-lg my-6 w-full h-auto" />`;
  }

  del({ tokens }: Tokens.Del) {
    const text = this.parser.parseInline(tokens);
    return `<del class="text-zinc-400">${text}</del>`;
  }
}

const renderer = new YonihonRenderer();

export function formatContent(markdown: string): string {
  return marked.parse(markdown, {
    renderer,
    breaks: true,
    gfm: true,
  }) as string;
}

export function extractToc(md: string): { title: string; anchor: string }[] {
  const headingRegex = /^#{2,3}\s+(.+)$/gm;
  const entries: { title: string; anchor: string }[] = [];
  let match;
  while ((match = headingRegex.exec(md)) !== null) {
    const text = match[1].trim();
    const anchor = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    entries.push({ title: text, anchor });
  }
  return entries;
}
