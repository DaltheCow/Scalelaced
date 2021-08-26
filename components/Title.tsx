import { Grid, useMediaQuery } from "@material-ui/core";
import React from "react";
import { useTheme } from "@material-ui/core/styles";
import ContentEditable from "./WrappedContentEditable";

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
  const [title, setTitle] = React.useState("Untitled");

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("xs"));
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
    }
    setIsFocused(false);
    event.target.scrollTop = 0;
  };

  const handleChange = (e) => {
    setTitle(e?.currentTarget?.innerHTML || "");
  };

  return (
    <Grid container justifyContent={"center"}>
      <ContentEditable
        id="title"
        html={title}
        onFocus={handleFocus}
        onBlur={handleUnfocus}
        onChange={handleChange}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
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
        }}
      />
    </Grid>
  );
};

export default Title;
