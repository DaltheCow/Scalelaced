// import { Quill } from "quill";
// import * as React from "react";
// import { useQuill } from "react-quilljs";

// export type QuillContextType = {
//   quill: Quill | undefined;
//   quillRef: React.RefObject<any>;
//   Quill: any;
// };

// const initialValue: QuillContextType = {
//   quill: undefined,
//   quillRef: React.createRef(),
//   Quill: undefined,
// };

// const QuillContext = React.createContext(initialValue);

// export const formats = [
//   "header",
//   "font",
//   "size",
//   "bold",
//   "italic",
//   "underline",
//   "align",
//   "strike",
//   "script",
//   "blockquote",
//   "list",
//   "bullet",
//   "indent",
// ];

// const theme = "snow";

// export const QuillProvider: React.FC = ({ children }) => {
//   const modules = {
//     toolbar: {
//       container: "#toolbar",
//       handlers: {
//         undo: function () {
//           this.quill?.history?.undo();
//         },
//         redo: function () {
//           this.quill?.history?.redo();
//         },
//       },
//     },
//     history: {
//       delay: 500,
//       maxStack: 100,
//       userOnly: true,
//     },
//   };
//   const { quill, quillRef, Quill } = useQuill({
//     theme,
//     modules,
//     formats,
//   });

//   return (
//     <QuillContext.Provider value={{ quill, quillRef, Quill }}>
//       {children}
//     </QuillContext.Provider>
//   );
// };

// export const useQuillContext = () => {
//   return React.useContext(QuillContext);
// };
