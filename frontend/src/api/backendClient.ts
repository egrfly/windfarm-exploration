export const getWeatherData = async (latitude: number, longitude: number) => {
  return await fetch(`${import.meta.env.VITE_BACKEND_URL}/weather?latitude=${latitude}&longitude=${longitude}`)
}
