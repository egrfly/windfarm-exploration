import { Button, Spinner } from "react-bootstrap"
import { Popup } from "react-leaflet"
import { LatLngLiteral } from "leaflet"
import { getLocationKey } from "../helpers/getLocationKey"
import Weather from "../models/Weather"

interface LeafletPopupProps {
  location: LatLngLiteral
  weatherData: Map<string, Weather | null>
  loadWeatherData: (location: LatLngLiteral) => void
}

type ErrorContentProps = Pick<LeafletPopupProps, "location" | "loadWeatherData">

interface LoadedContentProps {
  weather: Weather
}

const LoadingContent = () => {
  return (
    <div className="text-center my-3">
      <Spinner />
    </div>
  )
}

const ErrorContent = ({ location, loadWeatherData }: ErrorContentProps) => {
  return (
    <div className="text-center">
      <p className="fs-6 mt-0 mb-2">Failed to load.</p>
      <Button
        variant="secondary rounded-pill"
        onClick={(event) => {
          event.stopPropagation()
          loadWeatherData(location)
        }}
      >
        Try again
      </Button>
    </div>
  )
}

const LoadedContent = ({ weather }: LoadedContentProps) => {
  return (
    <>
      <h6>Current data</h6>
      <p className="fs-6 fw-light my-0">
        Wind speed: <strong>{weather.currentWindSpeed}</strong> m/s
      </p>
      <p className="fs-6 fw-light my-0">
        Air pressure: <strong>{weather.currentAirPressure}</strong> hPa
      </p>
      <h6 className="mt-3">Historical average</h6>
      <p className="fs-6 fw-light my-0">
        Wind speed: <strong>{weather.historicalAverageWindSpeed}</strong> m/s
      </p>
    </>
  )
}

const LeafletPopup = ({ location, weatherData, loadWeatherData }: LeafletPopupProps) => {
  return (
    <Popup>
      {weatherData.get(getLocationKey(location)) === undefined && <LoadingContent />}
      {weatherData.get(getLocationKey(location)) === null && (
        <ErrorContent location={location} loadWeatherData={loadWeatherData} />
      )}
      {weatherData.get(getLocationKey(location)) && (
        <LoadedContent weather={weatherData.get(getLocationKey(location))!} />
      )}
    </Popup>
  )
}

export default LeafletPopup
