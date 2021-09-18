import { useWhyDidYouUpdate } from "@chakra-ui/react";
import { useMemo } from "react";

const center = { lat: 35.6762, lng: 139.6503 };
// Create a bounding box with sides ~10km away from the center point
const defaultBounds = {
  north: center.lat + 0.1,
  south: center.lat - 0.1,
  east: center.lng + 0.1,
  west: center.lng - 0.1,
};

const options: google.maps.places.AutocompleteOptions = {
  bounds: defaultBounds,
  componentRestrictions: { country: "jp" },
  //   fields: ["address_components", "geometry", "icon", "name"],
  strictBounds: false,
  types: ["establishment"],
};

type useAutocompleteProps = {
  googleMap: typeof google;
  inputEl: HTMLInputElement;
};

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
