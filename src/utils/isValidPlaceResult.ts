export const isValidPlaceResult = (
  placeResult: google.maps.places.PlaceResult
) =>
  !!(
    placeResult.geometry &&
    placeResult.geometry.location &&
    placeResult.place_id
  );
