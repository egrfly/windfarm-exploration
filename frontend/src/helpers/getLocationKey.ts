import { LatLngLiteral } from "leaflet"

export const getLocationKey = (location: LatLngLiteral) => {
  return `${location.lat},${location.lng}`
}
