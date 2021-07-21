export interface LayoutProps {}

const Layout: React.FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <div>
      navbar
      {children}
      footer
    </div>
  );
};

export default Layout;
