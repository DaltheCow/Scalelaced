import { Grid, useMediaQuery } from "@material-ui/core";
import React from "react";
import { useTheme } from "@material-ui/core/styles";
import ContentEditable from "./WrappedContentEditable";
import { useTitleContext } from "./contexts/TitleContext";

function clearSelection() {
  if (window.getSelection) {
    window?.getSelection()?.removeAllRanges();
  } else if ((document as any)?.selection) {
    (document as any)?.selection?.empty();
  }
}

const Title = () => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);
  const { title, setTitle } = useTitleContext();
  // text is separate from title since it can have html entities
  const [text, setText] = React.useState("Untitled");
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("xs"));
  const contentEditable = React.useRef<any>();
  const characterLimit = 300;
  const warningLimit = 15;
  React.useEffect(() => {
    const pasteListener = document
      ?.getElementById("title")
      ?.addEventListener("paste", (event) => {
        let paste = (
          event.clipboardData || (window as any)?.clipboardData
        ).getData("text");
        paste = paste.replace(/\r?\n|\r/g, " ");

        const selection = window.getSelection();
        if (!selection?.rangeCount) return false;
        selection?.deleteFromDocument();
        selection?.getRangeAt(0).insertNode(document.createTextNode(paste));
        event.preventDefault();
      });
    const keydownListener = document
      ?.getElementById("title")
      ?.addEventListener("keydown", (evt) => {
        if (evt.keyCode === 13 || evt.code === "Enter" || evt.key === "Enter") {
          evt.preventDefault();
          document?.getElementById("title")?.blur();
          clearSelection();
          // save it here
        }
      });
    return () => {
      if (pasteListener) {
        document.removeEventListener("paste", pasteListener);
      }
      if (keydownListener) {
        document.removeEventListener("keydown", keydownListener);
      }
    };
  }, []);

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    const textNode = event.target.childNodes[0];
    if (textNode && textNode.textContent !== null) {
      const r = document.createRange();
      var startIndex = 0;
      var endIndex = textNode.textContent.length;
      r.setStart(textNode, startIndex);
      r.setEnd(textNode, endIndex);
      const s = window.getSelection();
      s?.removeAllRanges();
      s?.addRange(r);
      setIsFocused(true);
    }
  };

  const handleUnfocus = (event: React.FocusEvent<HTMLInputElement>) => {
    if (event.target.innerText.replace(/\s/g, "") === "") {
      setTitle("Untitled");
      setText("Untitled");
    }
    setIsFocused(false);
    event.target.scrollTop = 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(contentEditable?.current?.el?.current?.innerText);
    setText(e?.currentTarget?.innerHTML);
    // check github issue to maybe add max text length in future
    // or just add a red text next to content editable saying # characters left
  };

  const showLimit =
    (title.length > characterLimit - warningLimit && isFocused) ||
    title.length > characterLimit;

  const lengthLimitText = () =>
    showLimit ? (
      <span
        style={{
          position: "absolute",
          right: "2px",
          bottom: "1px",
          fontSize: "11px",
          color: title.length > characterLimit ? "red" : "black",
        }}
      >
        {characterLimit - title.length}
      </span>
    ) : null;

  return (
    <Grid container justifyContent={"center"}>
      <div style={{ position: "relative" }}>
        <ContentEditable
          id="title"
          ref={contentEditable}
          html={text}
          onFocus={handleFocus}
          onBlur={handleUnfocus}
          onChange={handleChange}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onInput={() => {}}
          onKeyPress={() => {}}
          onKeyDown={() => {}}
          style={{
            minWidth: "100px",
            padding: "2px 4px",
            maxWidth: matches ? "100px" : "",
            maxHeight: "38px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            boxShadow: isHovered && !isFocused ? "0 0 0 1px #e0e0e0 inset" : "",
            borderRadius: isHovered || isFocused ? "5px" : "",
            whiteSpace: matches && !isFocused ? "nowrap" : undefined,
            display: !isFocused ? "-webkit-box" : "",
            WebkitLineClamp: !isFocused ? 2 : "none",
            WebkitBoxOrient: !isFocused ? "vertical" : "",
            wordBreak: "break-all", // only do this if I actually track there is a super long word in the title? Like at least 30 characters??
            paddingRight: showLimit ? "20px" : "4px",
          }}
        />
        {lengthLimitText()}
      </div>
    </Grid>
  );
};

export default Title;
