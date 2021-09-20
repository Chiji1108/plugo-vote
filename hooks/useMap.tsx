import { useMemo } from "react";
import { useWhyDidYouUpdate } from "@chakra-ui/react";
import { TOKYO, TOKYO_BOUNDS } from "../constants";

const mapOptions: google.maps.MapOptions = {
  center: TOKYO,
  zoom: 11,
  disableDefaultUI: true,
  restriction: {
    latLngBounds: TOKYO_BOUNDS,
    strictBounds: true,
  },
};

type useMapProps = {
  googleMap: typeof google;
  mapContainerEl: HTMLDivElement;
};

export const useMap = ({ googleMap, mapContainerEl }: useMapProps) => {
  useWhyDidYouUpdate("useMap", { googleMap, mapContainerEl });

  return useMemo(() => new googleMap.maps.Map(mapContainerEl, mapOptions), []);
};
