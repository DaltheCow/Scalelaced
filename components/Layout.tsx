import { Header } from "./Header";

export interface LayoutProps {}

const Layout: React.FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      footer
    </div>
  );
};

export default Layout;
