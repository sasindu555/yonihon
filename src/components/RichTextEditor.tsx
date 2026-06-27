"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import type { Editor } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import { Markdown } from "@tiptap/markdown";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect, useRef, useCallback } from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: number;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Write...",
  minHeight = 320,
}: Props) {
  const initialized = useRef(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      Markdown.configure({
        indentation: { style: "space", size: 2 },
        markedOptions: { breaks: true },
      }),
      Placeholder.configure({ placeholder }),
    ],
    content: value,
    contentType: "markdown",
    onUpdate: useCallback(
      ({ editor }: { editor: Editor }) => {
        onChange(editor.getMarkdown());
      },
      [onChange],
    ),
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor && value && !initialized.current) {
      initialized.current = true;
      editor.commands.setContent(value, { contentType: "markdown" });
    }
  }, [editor, value]);

  if (!editor) return null;

  return (
    <div className="rounded-lg border border-zinc-300 overflow-hidden bg-white">
      <Toolbar editor={editor} />
      <div
        className="prose prose-zinc max-w-none px-4 py-3"
        style={{ minHeight }}
      >
        <EditorContent editor={editor} />
      </div>
      <style>{`
        .ProseMirror { outline: none; min-height: ${minHeight - 24}px; }
        .ProseMirror p { margin: 0; }
        .ProseMirror > * + * { margin-top: 0.5em; }
        .ProseMirror h2 { font-size: 1.25rem; font-weight: 700; margin-top: 1em; margin-bottom: 0.5em; color: #18181b; }
        .ProseMirror h3 { font-size: 1.1rem; font-weight: 600; margin-top: 0.75em; margin-bottom: 0.5em; color: #18181b; }
        .ProseMirror ul, .ProseMirror ol { padding-left: 1.5em; }
        .ProseMirror li { margin: 0.25em 0; }
        .ProseMirror blockquote {
          border-left: 3px solid #d4d4d8;
          padding-left: 1em;
          margin-left: 0;
          color: #52525b;
          font-style: italic;
        }
        .ProseMirror code {
          background: #f4f4f5;
          border-radius: 3px;
          padding: 0.15em 0.3em;
          font-size: 0.875em;
        }
        .ProseMirror pre {
          background: #18181b;
          color: #e4e4e7;
          border-radius: 6px;
          padding: 0.75em 1em;
          overflow-x: auto;
        }
        .ProseMirror pre code {
          background: none;
          padding: 0;
          color: inherit;
        }
        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          height: 0;
          pointer-events: none;
          color: #a1a1aa;
        }
        .ProseMirror hr {
          border: none;
          border-top: 2px solid #e4e4e7;
          margin: 1em 0;
        }
      `}</style>
    </div>
  );
}

function Toolbar({ editor }: { editor: Editor }) {
  return (
    <div className="flex flex-wrap items-center gap-0.5 border-b border-zinc-300 px-2 py-1.5 bg-zinc-50">
      <ToolbarBtn
        onClick={() => editor.chain().focus().toggleBold().run()}
        active={editor.isActive("bold")}
        label="Bold"
      >
        <BoldIcon />
      </ToolbarBtn>
      <ToolbarBtn
        onClick={() => editor.chain().focus().toggleItalic().run()}
        active={editor.isActive("italic")}
        label="Italic"
      >
        <ItalicIcon />
      </ToolbarBtn>
      <ToolbarBtn
        onClick={() => editor.chain().focus().toggleStrike().run()}
        active={editor.isActive("strike")}
        label="Strikethrough"
      >
        <StrikeIcon />
      </ToolbarBtn>

      <div className="w-px h-5 bg-zinc-300 mx-1" />

      <ToolbarBtn
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        active={editor.isActive("heading", { level: 2 })}
        label="Heading 2"
      >
        H2
      </ToolbarBtn>
      <ToolbarBtn
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        active={editor.isActive("heading", { level: 3 })}
        label="Heading 3"
      >
        H3
      </ToolbarBtn>

      <div className="w-px h-5 bg-zinc-300 mx-1" />

      <ToolbarBtn
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        active={editor.isActive("bulletList")}
        label="Bullet List"
      >
        <BulletListIcon />
      </ToolbarBtn>
      <ToolbarBtn
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        active={editor.isActive("orderedList")}
        label="Ordered List"
      >
        <OrderedListIcon />
      </ToolbarBtn>
      <ToolbarBtn
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        active={editor.isActive("blockquote")}
        label="Blockquote"
      >
        <BlockquoteIcon />
      </ToolbarBtn>

      <div className="w-px h-5 bg-zinc-300 mx-1" />

      <ToolbarBtn
        onClick={() => editor.chain().focus().undo().run()}
        active={false}
        label="Undo"
        disabled={!editor.can().undo()}
      >
        <UndoIcon />
      </ToolbarBtn>
      <ToolbarBtn
        onClick={() => editor.chain().focus().redo().run()}
        active={false}
        label="Redo"
        disabled={!editor.can().redo()}
      >
        <RedoIcon />
      </ToolbarBtn>
    </div>
  );
}

function ToolbarBtn({
  onClick,
  active,
  disabled,
  label,
  children,
}: {
  onClick: () => void;
  active: boolean;
  disabled?: boolean;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={label}
      className={`px-2 py-1 rounded text-xs font-semibold transition-colors ${
        active
          ? "bg-zinc-800 text-white"
          : disabled
            ? "text-zinc-300 cursor-not-allowed"
            : "text-zinc-600 hover:bg-zinc-200/70"
      }`}
    >
      {children}
    </button>
  );
}

function BoldIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
      <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
    </svg>
  );
}

function ItalicIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="4" x2="10" y2="4" />
      <line x1="14" y1="20" x2="5" y2="20" />
      <line x1="15" y1="4" x2="9" y2="20" />
    </svg>
  );
}

function StrikeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4H9a3 3 0 0 0-2.83 4" />
      <path d="M14 12a4 4 0 0 1 0 8H6" />
      <line x1="4" y1="12" x2="20" y2="12" />
    </svg>
  );
}

function BulletListIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  );
}

function OrderedListIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="10" y1="6" x2="21" y2="6" />
      <line x1="10" y1="12" x2="21" y2="12" />
      <line x1="10" y1="18" x2="21" y2="18" />
      <path d="M4 6h1v4" />
      <path d="M4 10h2" />
      <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
    </svg>
  );
}

function BlockquoteIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
    </svg>
  );
}

function UndoIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7v6h6" />
      <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" />
    </svg>
  );
}

function RedoIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 7v6h-6" />
      <path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3L21 13" />
    </svg>
  );
}
