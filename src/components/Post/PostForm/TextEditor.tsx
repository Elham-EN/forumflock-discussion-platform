import dynamic from "next/dynamic";
// import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { ReactElement, useState } from "react";
import styles from "./style.module.css";

interface TextProp {
  text: string;
  setText: (value: string) => void;
}

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

function MyTextEditor({ text, setText }: TextProp): ReactElement {
  /**
   * an immutable record that represents the entire state of the editor. It
   * includes the content of the editor (the text and its style, the block
   * structure, etc.), the current selection state (which part of the content
   * is selected, if any), the undo/redo stack, and several other pieces of data
   */
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  /**
   * @description called whenever there are changes in the editor (like inserting
   * or deleting text, changing the selection, applying a style, etc.).
   * @param editorState EditorState object representing the new state of the editor
   */
  const onEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState);
    let contentState = editorState.getCurrentContent();
    let textValue = contentState.getPlainText();
    let rawContentState = convertToRaw(editorState.getCurrentContent());
    let html = draftToHtml(rawContentState);
    console.log(html);
  };

  return (
    <Editor
      placeholder="Text"
      editorState={editorState}
      onEditorStateChange={onEditorStateChange}
      toolbar={{
        options: ["inline", "link", "list", "blockType"],
        inline: { options: ["bold", "italic", "underline", "monospace"] },
        link: { showOpenOptionOnHover: true, defaultTargetOption: "_blank" },
        list: { options: ["unordered", "ordered"] },
        blockType: {
          inDropdown: false,
          options: ["Normal", "Blockquote", "Code"],
        },
      }}
      hashtag={{
        separator: " ",
        trigger: "#",
      }}
      mention={{
        separator: " ",
        trigger: "@",
        suggestions: [
          { text: "APPLE", value: "apple", url: "apple" },
          { text: "BANANA", value: "banana", url: "banana" },
          { text: "CHERRY", value: "cherry", url: "cherry" },
          { text: "DURIAN", value: "durian", url: "durian" },
          { text: "EGGFRUIT", value: "eggfruit", url: "eggfruit" },
          { text: "FIG", value: "fig", url: "fig" },
          { text: "GRAPEFRUIT", value: "grapefruit", url: "grapefruit" },
          { text: "HONEYDEW", value: "honeydew", url: "honeydew" },
        ],
      }}
      toolbarClassName={styles.toolbarClassName}
      wrapperClassName={styles.wrapperClassName}
      editorClassName={styles.editorClassName}
    />
  );
}

export default MyTextEditor;
