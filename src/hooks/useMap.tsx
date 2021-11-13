import { useEffect, useMemo, useState } from "react";
// import { TOKYO, TOKYO_BOUNDS } from "../constants";

type useMapProps = {
  googleMap: typeof google;
  mapContainerEl: HTMLDivElement;
};

//TODO: unbind

// export const useMap = ({ googleMap, mapContainerEl }: useMapProps) => {
//   // const [map, setMap] = useState<google.maps.Map>();
//   // useEffect(() => {
//   //   const m = new googleMap.maps.Map(mapContainerEl, mapOptions);
//   //   setMap(m);
//   //   return () => m.unbindAll();
//   // }, []);

//   // useEffect(() => {
//   //   console.log("mapContainerEl changed", mapContainerEl);
//   // }, [mapContainerEl]);
//   return useMemo(, []);
// };
