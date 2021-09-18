import { useWhyDidYouUpdate } from "@chakra-ui/react";
import { useCallback, useEffect, useMemo, useState } from "react";

type useMarkerProps = { map: google.maps.Map };

export const useMarker = ({ map }: useMarkerProps) => {
  useWhyDidYouUpdate("useMarker", { map });
  // const [marker, setMarker] = useState<google.maps.Marker>();

  // useEffect(() => {
  //   if (!props.map) return;
  //   setMarker(new google.maps.Marker(props));
  // }, [props]);

  return useMemo(() => new google.maps.Marker({ map }), []);

  // return { marker, setMarker };
};
