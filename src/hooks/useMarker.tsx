import { useMemo } from "react";

type useMarkerProps = { map: google.maps.Map };

//TODO: MarkerManeger

export const useMarker = ({ map }: useMarkerProps) =>
  useMemo(() => new google.maps.Marker({ map }), [map]);
