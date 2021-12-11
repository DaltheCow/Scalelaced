import React from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { ThemeProvider } from "@material-ui/core";
import { AuthProvider } from "../auth";
import { theme } from "../components/theme";
import { TitleProvider } from "../components/contexts/TitleContext";

function MyApp({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles?.parentElement?.removeChild(jssStyles);
    }
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <TitleProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </TitleProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
export default MyApp;
