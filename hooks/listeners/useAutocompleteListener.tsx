import { useWhyDidYouUpdate } from "@chakra-ui/hooks";
import { Dispatch, useEffect } from "react";
import { Action } from "..";

type useAutocompleteListenerProps = {
  googleMap: typeof google;
  autocomplete: google.maps.places.Autocomplete;
  dispatch: Dispatch<Action>;
};

export const useAutocompleteListener = ({
  googleMap,
  autocomplete,
  dispatch,
}: useAutocompleteListenerProps) => {
  useWhyDidYouUpdate("useListener", { autocomplete, dispatch });

  useEffect(() => {
    const listener = autocomplete.addListener("place_changed", () => {
      dispatch({
        type: "focus",
        payload: { placeResult: autocomplete.getPlace() },
      });
    });
    return () => {
      googleMap.maps.event.removeListener(listener);
    };
  }, []);
};
