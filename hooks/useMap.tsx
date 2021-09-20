import { useMemo } from "react";
import { useWhyDidYouUpdate } from "@chakra-ui/react";

const TOKYO_BOUNDS: google.maps.LatLngBoundsLiteral = {
  north: 35.8,
  south: 35.57,
  west: 139.6,
  east: 139.92,
};

const TOKYO: google.maps.LatLngLiteral = {
  lat: 35.68,
  lng: 139.77,
};

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
