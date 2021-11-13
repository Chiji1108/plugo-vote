import { Loader, LoaderOptions } from "@googlemaps/js-api-loader";

const options: google.maps.places.AutocompleteOptions = {
  bounds: TOKYO_BOUNDS,
  componentRestrictions: { country: "jp" },
  fields: FIELDS,
  strictBounds: true,
  types: ["establishment"],
};
export const autocomplete = (
  googleMap: typeof google,
  inputEl: HTMLInputElement
) => new googleMap.maps.places.Autocomplete(inputEl, options);
