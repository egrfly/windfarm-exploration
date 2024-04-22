using System.Text;
using System.Text.Json;
using WindfarmExploration.Models.Api;

namespace WindfarmExploration.Services;

public class WeatherService
{
    private readonly HttpClient _httpClient = new();

    public async Task<FullWeather> GetCurrentWindSpeedAndAirPressureForLocation(
        double latitude,
        double longitude
    )
    {
        var weatherData = await _httpClient.GetFromJsonAsync<FullWeather>(
            $"https://api.openweathermap.org/data/2.5/weather?lat={latitude}&lon={longitude}&appid={Environment.GetEnvironmentVariable("API_KEY")}"
        );
        if (weatherData == null)
        {
            throw new InvalidDataException("No weather data received");
        }
        return weatherData!;
    }

    public async Task<double> GetHistoricalAverageWindSpeedForLocation(
        double latitude,
        double longitude
    )
    {
        var weatherData = await _httpClient.GetStringAsync(
            $"http://windatlas.xyz/api/wind/?lat={latitude}&lon={longitude}&height=50&date_from=2000-01-01&date_to=2019-12-31&mean=year"
        );
        if (weatherData == null)
        {
            throw new InvalidDataException("No weather data received");
        }
        var windMetadata = await JsonSerializer.DeserializeAsync<WindMetadata>(
            new MemoryStream(
                Encoding.UTF8.GetBytes(
                    weatherData
                        .Split(
                            '\n',
                            StringSplitOptions.TrimEntries | StringSplitOptions.RemoveEmptyEntries
                        )
                        .First()["metadata: ".Length..]
                        .Replace('\'', '"')
                )
            )
        );
        if (
            windMetadata == null
            || !double.TryParse(
                windMetadata.MeanWindSpeed.Split(' ').First(),
                out var averageWindSpeed
            )
        )
        {
            throw new InvalidDataException("No average wind speed found in response");
        }
        return averageWindSpeed;
    }
}
