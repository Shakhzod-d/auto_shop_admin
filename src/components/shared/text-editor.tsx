import { useEffect, useState } from "react";
import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import Image from "@tiptap/extension-image";
import toast from "react-hot-toast";
import { CustomYoutube } from "@/lib/CustomYoutube";
import { getLocaleStorage } from "@/utils/locale-storage";
import { Camera, Loader2, TvMinimalPlay, } from "lucide-react";
import { YoutubeInput } from "../ui/youtube-input";

const API = import.meta.env.VITE_API_URL;
const IMG_URL = import.meta.env.VITE_IMG_URL;

interface Props {
  value: string;
  onChange: (data: string) => void;
}

export function RichTextEditorComponent({ onChange, value }: Props) {
  const token = getLocaleStorage("token");
  const [youtubeLinkOpen, setYoutubeLinkOpen] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const [imagesCount, setImagesCount] = useState(0);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Image.extend({
        addNodeView() {
          return ({ node, getPos, editor }) => {
            const dom = document.createElement("div");
            dom.style.position = "relative";

            const img = document.createElement("img");
            img.src = node.attrs.src;
            img.style.width = "300px";
            img.style.height = "200px";
            img.style.marginBottom = "10px";

            const delBtn = document.createElement("button");
            delBtn.innerText = "❌";
            delBtn.style.position = "absolute";
            delBtn.style.top = "5px";
            delBtn.style.right = "5px";
            delBtn.style.background = "rgba(0,0,0,0.5)";
            delBtn.style.color = "#fff";
            delBtn.style.border = "none";
            delBtn.style.borderRadius = "3px";
            delBtn.style.cursor = "pointer";
            delBtn.onclick = () => {
              editor
                .chain()
                .focus()
                .deleteRange({ from: getPos(), to: getPos() + node.nodeSize })
                .run();
              setImagesCount((prev) => prev - 1);
            };

            dom.appendChild(img);
            dom.appendChild(delBtn);
            return {
              dom,
            };
          };
        },
      }),
      CustomYoutube.extend({
        addNodeView() {
          return ({ node, getPos, editor }) => {
            const dom = document.createElement("div");
            dom.style.position = "relative";

            const iframe = document.createElement("iframe");
            iframe.src = node.attrs.src;
            iframe.width = "720";
            iframe.height = "350";
            iframe.frameBorder = "0";
            iframe.allowFullscreen = true;

            const delBtn = document.createElement("button");
            delBtn.innerText = "❌";
            delBtn.style.position = "absolute";
            delBtn.style.top = "5px";
            delBtn.style.right = "5px";
            delBtn.style.background = "rgba(0,0,0,0.5)";
            delBtn.style.color = "#fff";
            delBtn.style.border = "none";
            delBtn.style.borderRadius = "3px";
            delBtn.style.cursor = "pointer";
            delBtn.onclick = () => {
              editor
                .chain()
                .focus()
                .deleteRange({ from: getPos(), to: getPos() + node.nodeSize })
                .run();
            };

            dom.appendChild(iframe);
            dom.appendChild(delBtn);
            return {
              dom,
            };
          };
        },
      }),
    ],
    content: value || "",
    editable: true,

    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && value && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value]);

  const handleFileChange = async (file: File) => {
    if (imagesCount >= 5) {
      toast.error("Faqat 5 ta rasm yuklashingiz mumkin!");
      return;
    }

    setImgLoading(true);
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Fayl hajmi 10MB dan oshmasligi kerak!");
      setImgLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(API + "/file", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();
      const imageUrl = IMG_URL + result?.data?.path;

      if (editor) {
        editor
          .chain()
          .focus()
          .insertContent([
            {
              type: "image",
              attrs: { src: imageUrl },
            },
            {
              type: "paragraph",
            },
          ])
          .run();
        setImagesCount((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setImgLoading(false);
    }
  };

  const handleAddYoutube = (url: string) => {
    setYoutubeLinkOpen(false);
    if (!url || !editor) return;

    const videoIdMatch = url.match(/(?:\?v=|\/embed\/|\.be\/)([^\s&]+)/);
    if (!videoIdMatch) {
      toast.error("Noto‘g‘ri YouTube link");
      return;
    }

    const videoId = videoIdMatch[1];
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;

    editor
      .chain()
      .focus()
      .insertContent([
        {
          type: "youtube",
          attrs: {
            src: embedUrl,
            width: 300,
            height: 200,
            marginBottom: 10,
          },
        },
        {
          type: "paragraph",
        },
      ])
      .run();
  };

  return (
    <div className="relative">
      {youtubeLinkOpen && <YoutubeInput setUrl={handleAddYoutube} />}

      <RichTextEditor
        editor={editor}
        className="bg-secondary px-4 w-full rounded-[10px]"
      >
        <RichTextEditor.Toolbar
          className="mb-5 p-2 flex text-[var(--form-text)] gap-2"
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

          <label className="text-sm cursor-pointer mr-2  text-[var(--form-text)]">
            <Camera size={20} />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) =>
                e.target.files && handleFileChange(e.target.files[0])
              }
            />
          </label>

          <TvMinimalPlay
            onClick={() => setYoutubeLinkOpen(true)}
            className="text-[var(--form-text)] cursor-pointer"
            size={20}
          />
        </RichTextEditor.Toolbar>

        {!imgLoading ? (
          <RichTextEditor.Content className="max-w-full min-h-36 text-[var(--form-text)] whitespace-pre-wrap leading-relaxed [&_img]:max-w-full [&_img]:h-auto" />
        ) : (
          <div className="w-full justify-center flex">
            <Loader2 size={50} className="animate-spin" />
          </div>
        )}
      </RichTextEditor>
    </div>
  );
}
