import { useWhyDidYouUpdate } from "@chakra-ui/hooks";
import { useMemo } from "react";

type usePlacesServiceProps = {
  map: google.maps.Map;
};

export const usePlacesService = ({ map }: usePlacesServiceProps) => {
  useWhyDidYouUpdate("usePlacesService", { map });
  return useMemo(() => new google.maps.places.PlacesService(map), []);
};
