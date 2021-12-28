import dynamic from "next/dynamic";
import { TinaEditProvider } from "tinacms/dist/edit-state";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import { GlobalStyles } from "@mui/material";
import theme from "../src/theme";
import createEmotionCache from "../src/createEmotionCache";

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
  return (
    <CacheProvider value={emotionCache}>
      <TinaEditProvider
        editMode={
          <TinaCMS
            branch="main"
            clientId={NEXT_PUBLIC_TINA_CLIENT_ID}
            isLocalClient={isLocalClient}
            branch={process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF || "main"}
            {...pageProps}
          >
            {(livePageProps) => <Component {...livePageProps} />}
          </TinaCMS>
        }
      >
        <ThemeProvider theme={theme}>
          <GlobalStyles
            styles={{
              body: {
                padding: "1rem",
                [theme.breakpoints.up("md")]: {
                  padding: "3rem",
                },
              },
              main: {
                h1: {
                  backgroundImage: `linear-gradient(
                    -90deg,
                    #adfbda 0,
                    #35c3ff 30%,
                    #fda399 50%,
                    #76d880 70%,
                    #ebf38b 90%,
                    #adfbda 100%
                  )`,
                  backgroundSize: "100%",
                  backgroundRepeat: "repeat",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  MozTextFillColor: "transparent",
                  filter: "drop-shadow(0 0 2rem #000)",
                  textShadow: "none !important",
                },
              },
            }}
          />
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </TinaEditProvider>
    </CacheProvider>
  );
};

export default App;
