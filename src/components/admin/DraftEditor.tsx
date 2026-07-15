import { useEffect, useRef, useState } from "react";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { useServerFn } from "@tanstack/react-start";
import { uploadMedia } from "@/lib/data/media.functions";

// Load the editor + its CSS only on the client to avoid SSR "window is not defined"
import type { EditorProps } from "react-draft-wysiwyg";
import { ClientOnly } from "@tanstack/react-router";

type Props = {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
};

function htmlToEditorState(html: string): EditorState {
  if (!html) return EditorState.createEmpty();
  const blocks = htmlToDraft(html);
  if (!blocks) return EditorState.createEmpty();
  const content = ContentState.createFromBlockArray(blocks.contentBlocks, blocks.entityMap);
  return EditorState.createWithContent(content);
}

async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const s = String(reader.result ?? "");
      const comma = s.indexOf(",");
      resolve(comma >= 0 ? s.slice(comma + 1) : s);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function InnerEditor({ value, onChange, placeholder }: Props) {
  // Lazy import the actual editor and its stylesheet on the client only.
  const [Editor, setEditor] = useState<React.ComponentType<EditorProps> | null>(null);
  const [state, setState] = useState<EditorState>(() => htmlToEditorState(value));
  const upload = useServerFn(uploadMedia);
  const lastHtml = useRef(value);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      await import("react-draft-wysiwyg/dist/react-draft-wysiwyg.css");
      const mod = await import("react-draft-wysiwyg");
      if (!cancelled) setEditor(() => mod.Editor);
    })();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (value !== lastHtml.current) {
      setState(htmlToEditorState(value));
      lastHtml.current = value;
    }
  }, [value]);

  const uploadImage = async (file: File) => {
    const base64 = await fileToBase64(file);
    const res = await upload({
      data: { filename: file.name, contentType: file.type, base64, folder: "blog" },
    });
    return { data: { link: res.url } };
  };

  if (!Editor) {
    return (
      <div className="min-h-[400px] rounded-lg border border-input bg-white px-4 py-3 text-sm text-muted-foreground">
        Loading editor…
      </div>
    );
  }

  return (
    <Editor
      editorState={state}
      onEditorStateChange={(s) => {
        setState(s);
        const html = draftToHtml(convertToRaw(s.getCurrentContent()));
        lastHtml.current = html;
        onChange(html);
      }}
      placeholder={placeholder}
      wrapperClassName="rdw-wrapper"
      editorClassName="rdw-editor prose prose-slate max-w-none min-h-[400px] rounded-b-lg border border-t-0 border-input bg-white px-4 py-3"
      toolbarClassName="rdw-toolbar rounded-t-lg border border-input bg-slate-50"
      toolbar={{
        options: ["inline", "blockType", "list", "textAlign", "link", "image", "history"],
        inline: { options: ["bold", "italic", "underline", "strikethrough"] },
        image: {
          uploadCallback: uploadImage,
          previewImage: true,
          alt: { present: true, mandatory: false },
          defaultSize: { height: "auto", width: "100%" },
        },
      }}
    />
  );
}

export function DraftEditor(props: Props) {
  return (
    <ClientOnly fallback={
      <div className="min-h-[400px] rounded-lg border border-input bg-white px-4 py-3 text-sm text-muted-foreground">
        Loading editor…
      </div>
    }>
      <InnerEditor {...props} />
    </ClientOnly>
  );
}
