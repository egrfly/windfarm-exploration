import { MapContainer, Marker, TileLayer } from "react-leaflet"
import { LatLngLiteral } from "leaflet"
import LeafletPopup from "./LeafletPopup"
import { locations } from "../data/locations"
import { getLocationKey } from "../helpers/getLocationKey"
import Weather from "../models/Weather"

interface LeafletMapProps {
  weatherData: Map<string, Weather | null>
  loadWeatherData: (location: LatLngLiteral) => void
}

const LeafletMap = ({ weatherData, loadWeatherData }: LeafletMapProps) => {
  return (
    <MapContainer
      center={{ lat: 54.4, lng: -4.4 }}
      zoom={5}
      minZoom={5}
      maxZoom={5}
      zoomControl={false}
      className="mw-100 mx-auto"
      style={{ width: "40rem", height: "40rem" }}
    >
      <TileLayer
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors &copy; <a href='https://carto.com/attributions'>CARTO</a>"
        url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
      />
      {locations.map((location) => (
        <Marker key={getLocationKey(location)} position={location}>
          <LeafletPopup location={location} weatherData={weatherData} loadWeatherData={loadWeatherData} />
        </Marker>
      ))}
    </MapContainer>
  )
}

export default LeafletMap
