import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect } from "react";

type Props = {
  value: string;
  onChange: (html: string, json: unknown) => void;
  placeholder?: string;
};

export function RichTextEditor({ value, onChange, placeholder }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false, HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" } }),
      Image,
      Placeholder.configure({ placeholder: placeholder ?? "Write your post…" }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class: "prose prose-slate max-w-none min-h-[400px] rounded-lg border border-input bg-white px-4 py-3 focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML(), editor.getJSON()),
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) editor.commands.setContent(value || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  if (!editor) return null;

  const btn = "rounded-md px-2 py-1 text-sm hover:bg-slate-100";
  const active = "bg-slate-200";

  return (
    <div>
      <div className="mb-2 flex flex-wrap gap-1 rounded-lg border border-input bg-slate-50 p-1">
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()}
          className={`${btn} ${editor.isActive("bold") ? active : ""}`}>B</button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`${btn} italic ${editor.isActive("italic") ? active : ""}`}>I</button>
        <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`${btn} line-through ${editor.isActive("strike") ? active : ""}`}>S</button>
        <span className="mx-1 h-6 w-px bg-slate-300" />
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`${btn} font-bold ${editor.isActive("heading", { level: 2 }) ? active : ""}`}>H2</button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`${btn} font-bold ${editor.isActive("heading", { level: 3 }) ? active : ""}`}>H3</button>
        <button type="button" onClick={() => editor.chain().focus().setParagraph().run()}
          className={`${btn} ${editor.isActive("paragraph") ? active : ""}`}>P</button>
        <span className="mx-1 h-6 w-px bg-slate-300" />
        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`${btn} ${editor.isActive("bulletList") ? active : ""}`}>• List</button>
        <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`${btn} ${editor.isActive("orderedList") ? active : ""}`}>1. List</button>
        <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`${btn} ${editor.isActive("blockquote") ? active : ""}`}>❝</button>
        <button type="button" onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`${btn} ${editor.isActive("codeBlock") ? active : ""}`}>{"</>"}</button>
        <span className="mx-1 h-6 w-px bg-slate-300" />
        <button type="button" onClick={() => {
          const url = window.prompt("Link URL");
          if (url) editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
          else editor.chain().focus().extendMarkRange("link").unsetLink().run();
        }} className={`${btn} ${editor.isActive("link") ? active : ""}`}>Link</button>
        <button type="button" onClick={() => {
          const url = window.prompt("Image URL");
          if (url) editor.chain().focus().setImage({ src: url }).run();
        }} className={btn}>Image</button>
        <span className="mx-1 h-6 w-px bg-slate-300" />
        <button type="button" onClick={() => editor.chain().focus().undo().run()} className={btn}>↶</button>
        <button type="button" onClick={() => editor.chain().focus().redo().run()} className={btn}>↷</button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
