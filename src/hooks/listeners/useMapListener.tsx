import { useWhyDidYouUpdate } from "@chakra-ui/hooks";
import { Dispatch, useEffect } from "react";
import { Action } from "..";

type useMapListenerProps = {
  googleMap: typeof google;
  map: google.maps.Map;
  dispatch: Dispatch<Action>;
};

export const useMapListener = ({
  googleMap,
  map,
  dispatch,
}: useMapListenerProps) => {
  useWhyDidYouUpdate("useMapListener", { map, dispatch });
  useEffect(() => {
    const listener = map.addListener(
      "click",
      (event: google.maps.MapMouseEvent | google.maps.IconMouseEvent) => {
        if (!isIconMouseEvent(event)) return;
        event.stop();
        if (!event.placeId) return;
        dispatch({ type: "focus", payload: { placeId: event.placeId } });
      }
    );
    return () => {
      listener.remove();
    };
  }, []);

  // useEffect(() => {
  //   const listener = map.addListener("center_changed", () => {
  //     const center = map.getCenter();
  //     if (!center) return;
  //     map.panTo(center);
  //     // const timeoutId = setTimeout(() => {
  //     //   const center = map.getCenter();

  //     // }, 3000);
  //     // return () => {
  //     //   clearTimeout(timeoutId);
  //     // };
  //   });
  //   return () => {
  //     listener.remove();
  //   };
  // }, []);
};

function isIconMouseEvent(
  e: google.maps.MapMouseEvent | google.maps.IconMouseEvent
): e is google.maps.IconMouseEvent {
  return "placeId" in e;
}
