import dynamic from "next/dynamic";
import { TinaEditProvider } from "tinacms/dist/edit-state";
import { TinaCloudCloudinaryMediaStore } from "next-tinacms-cloudinary";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import { GlobalStyles } from "@mui/material";
import theme from "../src/theme";
import createEmotionCache from "../src/createEmotionCache";
import { useEffect } from "react";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

// @ts-ignore FIXME: default export needs to be 'ComponentType<{}>
const TinaCMS = dynamic(() => import("tinacms"), { ssr: false });

const NEXT_PUBLIC_TINA_CLIENT_ID = process.env.NEXT_PUBLIC_TINA_CLIENT_ID;
const isLocalClient = process.env.NODE_ENV === "development";

const App = ({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}) => {
  useEffect(() => {
    window.onload = () => {
      const h1Elements = document.getElementsByTagName("h1");
      console.log(h1Elements);
      for (const i = 0; i < h1Elements.length; i++) {
        h1Elements[i].title = h1Elements[i].innerText;
      }
    };
  }, []);
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <TinaEditProvider
          editMode={
            <TinaCMS
              branch="main"
              clientId={NEXT_PUBLIC_TINA_CLIENT_ID}
              isLocalClient={isLocalClient}
              branch={process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF || "main"}
              mediaStore={TinaCloudCloudinaryMediaStore}
              {...pageProps}
            >
              {(livePageProps) => <Component {...livePageProps} />}
            </TinaCMS>
          }
        >
          <GlobalStyles
            styles={{
              "*": {
                margin: 0,
                fontFamily: "'Roboto', sans-serif",
              },
              p: {
                margin: "0.25rem 0",
              },
              img: {
                maxWidth: "100%",
              },
              a: {
                color: "#2296fe",
                textDecoration: "none",
              },
              main: {
                h1: {
                  margin: 0,
                  fontSize: "5rem",
                  fontFamily: "'Chakra Petch', sans-serif",
                },
                padding: "1rem",
                [theme.breakpoints.up("md")]: {
                  padding: "3rem 5rem",
                },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              },
              h2: {
                fontSize: "2rem",
              },
            }}
          />
          <CssBaseline />
          <Component {...pageProps} />
        </TinaEditProvider>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default App;
