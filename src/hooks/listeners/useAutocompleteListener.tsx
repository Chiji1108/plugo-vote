import { useWhyDidYouUpdate } from "@chakra-ui/hooks";
import { Dispatch, useEffect } from "react";
import { Action } from "..";
import { isValidPlaceResult } from "../../utils/isValidPlaceResult";

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
      const placeResult = autocomplete.getPlace();
      if (!isValidPlaceResult(placeResult)) return;
      dispatch({
        type: "focus",
        payload: { placeResult },
      });
    });
    return () => {
      listener.remove();
    };
  }, []);
};
