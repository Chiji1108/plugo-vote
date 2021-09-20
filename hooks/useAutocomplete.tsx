import { useWhyDidYouUpdate } from "@chakra-ui/react";
import { useMemo } from "react";
import { TOKYO_BOUNDS } from "../constants";
// Create a bounding box with sides ~10km away from the center point

const options: google.maps.places.AutocompleteOptions = {
  bounds: TOKYO_BOUNDS,
  componentRestrictions: { country: "jp" },
  fields: ["name", "photos", "formatted_address", "geometry"],
  strictBounds: true,
  types: ["establishment"],
};

type useAutocompleteProps = {
  googleMap: typeof google;
  inputEl: HTMLInputElement;
};

//TODO: unbind

export const useAutocomplete = ({
  googleMap,
  inputEl,
}: useAutocompleteProps) => {
  useWhyDidYouUpdate("useAutocomplete", {
    googleMap,
    inputEl,
  });
  return useMemo(
    () => new googleMap.maps.places.Autocomplete(inputEl, options),
    []
  );
};
