import { LoaderOptions } from "@googlemaps/js-api-loader";

export const TOKYO_BOUNDS: google.maps.LatLngBoundsLiteral = {
  north: 35.8,
  south: 35.57,
  west: 139.6,
  east: 139.92,
};

export const TOKYO: google.maps.LatLngLiteral = {
  lat: 35.68,
  lng: 139.77,
};

export const FIELDS = [
  "name",
  "photos",
  "formatted_address",
  "geometry",
  "place_id",
];

if (!process.env.NEXT_PUBLIC_GOOGLE_API_KEY) throw new Error();
export const LOADER_OPTIONS: LoaderOptions = {
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  version: "weekly",
  language: "ja",
  region: "JP",
  libraries: ["places"],
};

export const MAP_OPTIONS: google.maps.MapOptions = {
  mapId: "2d6c527c2d62505c",
  center: TOKYO,
  zoom: 11,
  disableDefaultUI: true,
  // disableDoubleClickZoom: true,
  restriction: {
    latLngBounds: TOKYO_BOUNDS,
    strictBounds: true,
  },
  // gestureHandling: "greedy",
  fullscreenControl: true,
};
