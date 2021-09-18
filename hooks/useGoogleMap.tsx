import { useWhyDidYouUpdate } from "@chakra-ui/react";
import { Loader, LoaderOptions } from "@googlemaps/js-api-loader";
import { useAsync } from "react-use";

if (!process.env.NEXT_PUBLIC_GOOGLE_API_KEY) throw new Error();
const loaderOptions: LoaderOptions = {
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  version: "weekly",
  language: "ja",
  region: "JP",
  libraries: ["places"],
};

export const useGoogleMap = () => {
  useWhyDidYouUpdate("useGoogleMap", {});

  const {
    loading,
    error,
    value: googleMap,
  } = useAsync(async () => {
    const loader = new Loader(loaderOptions);
    const google = await loader.load();
    return google;
  }, []);
  return { loading, error, googleMap };
};
