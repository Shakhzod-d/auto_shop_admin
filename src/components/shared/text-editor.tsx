import { useEffect } from "react";
import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";

interface Props {
  value: string;
  onChange: (data: string) => void;
}

export function RichTextEditorComponent({ onChange, value }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: value || "", // Bo'sh bo'lsa, default qilib qo'yamiz
    editable: true,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // API'dan kelgan ma'lumotni yuklash
  useEffect(() => {
    if (editor && value) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  return (
    <RichTextEditor
      editor={editor}
      className="bg-secondary px-4 shadow-md w-full rounded-[10px]"
    >
      <RichTextEditor.Toolbar
        className="mb-5 p-2 flex text-white gap-2"
        sticky
        stickyOffset={40}
      >
        <RichTextEditor.ControlsGroup className="flex gap-3">
          <RichTextEditor.Bold />
          <RichTextEditor.Italic />
          <RichTextEditor.Underline />
          <RichTextEditor.Strikethrough />
          <RichTextEditor.ClearFormatting />
          <RichTextEditor.Highlight />
          <RichTextEditor.Code />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup className="flex gap-4">
          <RichTextEditor.H1 />
          <RichTextEditor.H2 />
          <RichTextEditor.H3 />
          <RichTextEditor.H4 />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup className="flex gap-4">
          <RichTextEditor.Blockquote />
          <RichTextEditor.Hr />
          <RichTextEditor.BulletList />
          <RichTextEditor.OrderedList />
          <RichTextEditor.Subscript />
          <RichTextEditor.Superscript />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup className="flex gap-4">
          <RichTextEditor.Link />
          <RichTextEditor.Unlink />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup className="flex gap-4">
          <RichTextEditor.AlignLeft />
          <RichTextEditor.AlignCenter />
          <RichTextEditor.AlignJustify />
          <RichTextEditor.AlignRight />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup className="flex gap-4">
          <RichTextEditor.Undo />
          <RichTextEditor.Redo />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content className="max-w-full min-h-36" />
    </RichTextEditor>
  );
}
