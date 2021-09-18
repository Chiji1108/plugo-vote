import { useMemo } from "react";
import { useWhyDidYouUpdate } from "@chakra-ui/react";

const center: google.maps.LatLngLiteral = {
  lat: 35.6762,
  lng: 139.6503,
};

const mapOptions: google.maps.MapOptions = {
  center,
  zoom: 10,
  disableDefaultUI: true,
};

type useMapProps = {
  googleMap: typeof google;
  mapContainerEl: HTMLDivElement;
};

export const useMap = ({ googleMap, mapContainerEl }: useMapProps) => {
  useWhyDidYouUpdate("useMap", { googleMap, mapContainerEl });

  return useMemo(() => new googleMap.maps.Map(mapContainerEl, mapOptions), []);
};
