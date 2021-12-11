import * as React from "react";
import "quill/dist/quill.snow.css";
import { Container } from "@material-ui/core";
import Delta from "quill-delta";
import { useQuill } from "react-quilljs";
import { useTitleContext } from "../components/contexts/TitleContext";
import { useAuth } from "../auth";
import firebase from "firebase/app";
import "firebase/firestore";
import Quill from "quill";

const CustomUndo = () => (
  <svg viewBox="0 0 18 18">
    <polygon className="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10" />
    <path
      className="ql-stroke"
      d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"
    />
  </svg>
);

// Redo button icon component for Quill editor
const CustomRedo = () => (
  <svg viewBox="0 0 18 18">
    <polygon className="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10" />
    <path
      className="ql-stroke"
      d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"
    />
  </svg>
);

const CustomSave = () => (
  <svg viewBox="0 0 407.096 407.096" width="15px" height="15px">
    <g xmlns="http://www.w3.org/2000/svg">
      <path
        className="ql-fill ql-stroke"
        d="M402.115,84.008L323.088,4.981C319.899,1.792,315.574,0,311.063,0H17.005C7.613,0,0,7.614,0,17.005v373.086    c0,9.392,7.613,17.005,17.005,17.005h373.086c9.392,0,17.005-7.613,17.005-17.005V96.032    C407.096,91.523,405.305,87.197,402.115,84.008z M300.664,163.567H67.129V38.862h233.535V163.567z"
      />
      <path
        className="ql-fill ql-stroke"
        d="M214.051,148.16h43.08c3.131,0,5.668-2.538,5.668-5.669V59.584c0-3.13-2.537-5.668-5.668-5.668h-43.08    c-3.131,0-5.668,2.538-5.668,5.668v82.907C208.383,145.622,210.92,148.16,214.051,148.16z"
      />
    </g>
  </svg>
);

const CustomSubmit = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1024 1024"
    width="18px"
    height="18px"
  >
    <g xmlns="http://www.w3.org/2000/svg">
      <path
        className="ql-fill ql-stroke"
        d="M688 312v-48c0-4.4-3.6-8-8-8H296c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h384c4.4 0 8-3.6 8-8zm-392 88c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H296zm376 116c-119.3 0-216 96.7-216 216s96.7 216 216 216 216-96.7 216-216-96.7-216-216-216zm107.5 323.5C750.8 868.2 712.6 884 672 884s-78.8-15.8-107.5-44.5C535.8 810.8 520 772.6 520 732s15.8-78.8 44.5-107.5C593.2 595.8 631.4 580 672 580s78.8 15.8 107.5 44.5C808.2 653.2 824 691.4 824 732s-15.8 78.8-44.5 107.5zM761 656h-44.3c-2.6 0-5 1.2-6.5 3.3l-63.5 87.8-23.1-31.9a7.92 7.92 0 0 0-6.5-3.3H573c-6.5 0-10.3 7.4-6.5 12.7l73.8 102.1c3.2 4.4 9.7 4.4 12.9 0l114.2-158c3.9-5.3.1-12.7-6.4-12.7zM440 852H208V148h560v344c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V108c0-17.7-14.3-32-32-32H168c-17.7 0-32 14.3-32 32v784c0 17.7 14.3 32 32 32h272c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8z"
      />
    </g>
  </svg>
);

export const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "align",
  "strike",
  "script",
  "blockquote",
  "list",
  "bullet",
  "indent",
];

const theme = "snow";

const save = async (referenceObj: React.MutableRefObject<ReferenceObj>) => {
  const { user, title, quill } = referenceObj.current;
  console.log(user, title, quill);
  try {
    console.log("saving...");
    const request = await firebase
      .firestore()
      .collection("stories")
      .doc(user?.uid || undefined)
      //to read, onSnapshot(doc => doc.data)
      .set({
        delta: quill?.getContents().ops,
        title,
        id: 234,
      });
    console.log("successfully sent to cfs");
    alert("data was successfully sent to cloud firestore");
  } catch (error) {
    console.log(error);
    alert(error);
  }
};

type ReferenceObj = {
  user: firebase.User | null;
  title: string;
  quill: Quill | undefined;
};

const CreateForm = () => {
  const { title } = useTitleContext();
  const { user } = useAuth();
  let quill: Quill | undefined;
  let quillRef: React.RefObject<any>;
  let Quill: any;
  // maintains mutable reference to title and user so that save function closure doesn't lock on old value
  const referenceObj = React.useRef<ReferenceObj>({
    title,
    user,
    quill: undefined,
  } as ReferenceObj);
  // referenceObj.current = { title, user, quill: undefined } as ReferenceObj;
  React.useEffect(() => {
    // console.log(title, user, quill);
    referenceObj.current.title = title;
    referenceObj.current.user = user;
    referenceObj.current.quill = quill;
  }, [title, user, quill]);
  const modules = {
    toolbar: {
      container: "#toolbar",
      handlers: {
        undo: function () {
          this.quill?.history?.undo();
        },
        redo: function () {
          this.quill?.history?.redo();
        },
        save: function () {
          save(referenceObj);
          // console.log(this.quill?.getContents());
        },
        submit: function () {
          // console.log(this.quill?.getContents());
        },
      },
    },
    history: {
      delay: 500,
      maxStack: 100,
      userOnly: true,
    },
  };
  const placeholder = "Begin creating here.";
  ({ quill, quillRef, Quill } = useQuill({
    theme,
    modules,
    formats,
    placeholder,
  }));

  const [change, setChange] = React.useState(new Delta());

  React.useEffect(() => {
    if (quill) {
      quill.on("text-change", (delta, oldDelta, source) => {
        let blah = quill.getContents();
        // console.log(blah);
        // console.log(quill.root.innerHTML);
        // console.log(delta);
        // change.compose(delta);
      });
    }
  }, [quill]);

  // I want to save every so often as well. Maybe not every time there is a break in typing, but 5 seconds may be okay. I want it to be good. If it breaks the bank I'll slow auto save.
  // React.useEffect(() => {
  //   let int = setInterval(function () {
  //     console.log(change, change.length());
  //     if (change.length() > 0) {
  //       console.log("Saving changes", change);
  //       /*
  //       Send partial changes
  //       $.post('/your-endpoint', {
  //         partial: JSON.stringify(change)
  //       });

  //       Send entire document
  //       $.post('/your-endpoint', {
  //         doc: JSON.stringify(quill.getContents())
  //       });
  //       */
  //       // setChange(new Delta());
  //     }
  //   }, 5 * 1000);
  //   return () => {
  //     clearInterval(int);
  //   };
  // }, []);

  return (
    <form style={{ height: "80%", marginTop: "10px" }}>
      <Container maxWidth="md" disableGutters={true}>
        <div id="toolbar">
          <span className="ql-formats">
            <select className="ql-font" defaultValue="arial">
              <option value="arial">Arial</option>
              <option value="comic-sans">Comic Sans</option>
              <option value="courier-new">Courier New</option>
              <option value="georgia">Georgia</option>
              <option value="helvetica">Helvetica</option>
              <option value="lucida">Lucida</option>
            </select>
            <select className="ql-size" defaultValue="medium">
              <option value="extra-small">Size 1</option>
              <option value="small">Size 2</option>
              <option value="medium">Size 3</option>
              <option value="large">Size 4</option>
            </select>
            <select className="ql-header" defaultValue="3">
              <option value="1">Heading</option>
              <option value="2">Subheading</option>
              <option value="3">Normal</option>
            </select>
          </span>
          <span className="ql-formats">
            <button className="ql-bold" />
            <button className="ql-italic" />
            <button className="ql-underline" />
            <button className="ql-strike" />
          </span>
          <span className="ql-formats">
            <button className="ql-list" value="ordered" />
            <button className="ql-list" value="bullet" />
            <button className="ql-indent" value="-1" />
            <button className="ql-indent" value="+1" />
          </span>
          <span className="ql-formats">
            <button className="ql-script" value="super" />
            <button className="ql-script" value="sub" />
            <button className="ql-blockquote" />
            <button className="ql-direction" />
          </span>
          <span className="ql-formats">
            <select className="ql-align" />
          </span>
          <span className="ql-formats">
            <button className="ql-clean" />
          </span>
          <span className="ql-formats">
            <button className="ql-undo">
              <CustomUndo />
            </button>
            <button className="ql-redo">
              <CustomRedo />
            </button>
          </span>
          <span className="ql-formats">
            <button className="ql-save">
              <CustomSave />
            </button>
            <button className="ql-submit">
              <CustomSubmit />
            </button>
          </span>
        </div>
        <div
          ref={quillRef}
          style={{
            height: "816px",
          }}
        />
      </Container>
    </form>
  );
};

export default CreateForm;
