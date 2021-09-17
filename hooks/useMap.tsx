import { RefObject, useEffect, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

const API_KEY = "AIzaSyDKrpVSwOPOReivNxthUGpkgMUQKVhv_F0";

const center: google.maps.LatLngLiteral = {
  lat: 35.48847,
  lng: 137.5263065,
};

export const useMap = (mapContainerRef: RefObject<HTMLDivElement>) => {
  const [map, setMap] = useState<google.maps.Map>();

  useEffect(() => {
    const loader = new Loader({
      apiKey: API_KEY,
      version: "weekly",
    });
    loader.load().then(() => {
      if (!mapContainerRef.current) {
        return;
      }
      const map = new google.maps.Map(mapContainerRef.current, {
        center,
        zoom: 8,
      });
      setMap(map);
    });
  }, [mapContainerRef]);
  return map;
};
