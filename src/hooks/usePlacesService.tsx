import { useMemo } from "react";

type usePlacesServiceProps = {
  map: google.maps.Map;
};

export const usePlacesService = ({ map }: usePlacesServiceProps) =>
  useMemo(() => new google.maps.places.PlacesService(map), [map]);
