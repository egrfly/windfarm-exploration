import { useCallback, useEffect, useState } from "react"
import { LatLngLiteral } from "leaflet"
import { getWeatherData } from "./api/backendClient"
import LeafletMap from "./components/LeafletMap"
import { locations } from "./data/locations"
import { getLocationKey } from "./helpers/getLocationKey"
import Weather from "./models/Weather"

const App = () => {
  const [weatherData, setWeatherData] = useState<Map<string, Weather | null>>(new Map<string, Weather | null>())

  const loadWeatherData = useCallback((location: LatLngLiteral) => {
    setWeatherData((weatherData) => {
      weatherData.delete(getLocationKey(location))
      return new Map<string, Weather | null>(weatherData)
    })
    getWeatherData(location.lat, location.lng)
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error("Failed to load.")
        }
      })
      .then((data) =>
        setWeatherData((weatherData) => {
          weatherData.set(getLocationKey(location), data)
          return new Map<string, Weather | null>(weatherData)
        }),
      )
      .catch(() =>
        setWeatherData((weatherData) => {
          weatherData.set(getLocationKey(location), null)
          return new Map<string, Weather | null>(weatherData)
        }),
      )
  }, [])

  useEffect(() => {
    locations.forEach((location) => {
      loadWeatherData(location)
    })
  }, [loadWeatherData])

  return (
    <main className="px-sm-5 py-5">
      <h1 className="text-center text-muted">Windfarm Exploration</h1>
      <LeafletMap weatherData={weatherData} loadWeatherData={loadWeatherData} />
    </main>
  )
}

export default App
