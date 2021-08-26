import * as React from "react";
import "react-quill/dist/quill.snow.css";
// import * as QuillNamespace from "quill";
import { Container } from "@material-ui/core";
// let Quill: any = QuillNamespace;
// var Delta = Quill.import("delta");
import { useQuill } from "react-quilljs";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ font: [] as string[] }],
    [{ color: [] }, { background: [] }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],
    [{ direction: "rtl" }],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "indent",
  "list",
  "align",
  "direction",
  "script",
  "size",
  "color",
  "background",
];

const theme = "snow";

const CreateForm = () => {
  //   const [value, setValue] = React.useState(new Delta());
  const { quill, quillRef } = useQuill({ theme, modules, formats });

  React.useEffect(() => {
    if (quill) {
      quill.on("text-change", (delta, oldDelta, source) => {
        console.log(quill.getContents());
      });
    }
  }, [quill]);

  //   const handleChange = (val: any) => {
  //     console.log(quillRef?.current?.editor?.root?.innerHTML);
  //     setValue(quillRef?.current?.editor?.getContents());
  //   };

  return (
    <form style={{ height: "80%", marginTop: "10px" }}>
      <Container maxWidth="md" disableGutters={true}>
        <div
          style={{
            height: "816px",
          }}
          ref={quillRef}
        />
      </Container>
    </form>
  );
};

export default CreateForm;
