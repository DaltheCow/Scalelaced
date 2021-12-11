import * as React from "react";

export type TitleContextType = {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
};

const TitleContext = React.createContext<TitleContextType>(undefined!);

export const TitleProvider: React.FC = ({ children }) => {
  const [title, setTitle] = React.useState("Untitled");
  return (
    <TitleContext.Provider value={{ title, setTitle }}>
      {children}
    </TitleContext.Provider>
  );
};

export const useTitleContext = () => {
  return React.useContext(TitleContext);
};
