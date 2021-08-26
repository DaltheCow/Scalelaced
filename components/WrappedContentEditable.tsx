import React from "react";
import ReactContentEditable from "react-contenteditable";

export default function ContentEditable({
  onChange,
  onInput,
  onBlur,
  onKeyPress,
  onKeyDown,
  html,
  ...props
}: {
  onChange: any;
  onInput: any;
  onBlur: any;
  onKeyPress: any;
  onKeyDown: any;
  html: any;
}) {
  const onChangeRef = React.useRef(onChange);
  const onInputRef = React.useRef(onInput);
  const onBlurRef = React.useRef(onBlur);
  const onKeyPressRef = React.useRef(onKeyPress);
  const onKeyDownRef = React.useRef(onKeyDown);

  React.useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);
  React.useEffect(() => {
    onInputRef.current = onInput;
  }, [onInput]);
  React.useEffect(() => {
    onBlurRef.current = onBlur;
  }, [onBlur]);
  React.useEffect(() => {
    onKeyPressRef.current = onKeyPress;
  }, [onKeyPress]);
  React.useEffect(() => {
    onKeyDownRef.current = onKeyDown;
  }, [onKeyDown]);

  return (
    <ReactContentEditable
      {...props}
      html={html}
      onChange={
        onChange
          ? (...args) => {
              if (onChangeRef.current) {
                onChangeRef.current(...args);
              }
            }
          : () => {}
      }
      onInput={
        onInput
          ? (...args) => {
              if (onInputRef.current) {
                onInputRef.current(...args);
              }
            }
          : () => {}
      }
      onBlur={
        onBlur
          ? (...args) => {
              if (onBlurRef.current) {
                onBlurRef.current(...args);
              }
            }
          : () => {}
      }
      onKeyPress={
        onKeyPress
          ? (...args) => {
              if (onKeyPressRef.current) {
                onKeyPressRef.current(...args);
              }
            }
          : () => {}
      }
      onKeyDown={
        onKeyDown
          ? (...args) => {
              if (onKeyDownRef.current) {
                onKeyDownRef.current(...args);
              }
            }
          : () => {}
      }
    />
  );
}
