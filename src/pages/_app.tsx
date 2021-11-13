import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "../styles/googlemap.css";
import { useSignInAnonymously } from "../hooks";
import {
  getAnalytics,
  logEvent,
  setCurrentScreen,
  setUserId,
} from "firebase/analytics";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useStore } from "../store";
import { useEffectOnce, useUnmount } from "react-use";

import "@algolia/autocomplete-theme-classic";
import "tailwindcss/tailwind.css";

const theme = extendTheme({
  fonts: {
    heading: "Noto Sans JP",
    body: "Noto Sans JP",
  },
});

//TODO: aloglia search追加
//TODO: ogpのurlはnano ID、またはuse-id

function MyApp({ Component, pageProps }: AppProps) {
  // const app = useFirebaseApp();
  // const auth = useAuth({app});
  // const analytics = useAnalytics({app});
  const init = useStore.use.init();
  useEffectOnce(() => {
    init();
  });

  useUnmount(() => {
    useStore.destroy();
  });
  const routers = useRouter();

  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      const log = (url: string) => {
        const analytics = getAnalytics();
        setCurrentScreen(analytics, url);
        logEvent(analytics, "screen_view");
      };

      routers.events.on("routeChangeComplete", log);
      log(window.location.pathname);

      return () => {
        routers.events.off("routeChangeComplete", log);
      };
    }
  });
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
export default MyApp;

// const FirebaseAppContext = createContext<FirebaseApp>(ini);

// function FirebaseApp({app}: {app: FirebaseApp}) {
//   const auth
//   return
// }
