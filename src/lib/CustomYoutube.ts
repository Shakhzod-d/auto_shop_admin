import { Node, mergeAttributes } from "@tiptap/core";

export const CustomYoutube = Node.create({
  name: "youtube",
  group: "block",
  selectable: true,
  atom: true,

  addAttributes() {
    return {
      src: { default: null },
      width: { default: 640 },
      height: { default: 360 },
    };
  },

  parseHTML() {
    return [{ tag: "iframe[src]" }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["iframe", mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ({ node }) => {
      const iframe = document.createElement("iframe");
      iframe.src = node.attrs.src;
      iframe.width = node.attrs.width;
      iframe.height = node.attrs.height;
      iframe.allowFullscreen = true;
      iframe.frameBorder = "0";

      const container = document.createElement("div");
      container.appendChild(iframe);

      return { dom: container };
    };
  },
});
