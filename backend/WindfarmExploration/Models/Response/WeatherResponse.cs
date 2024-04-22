namespace WindfarmExploration.Models.Response;

public class WeatherResponse
{
    public required double CurrentAirPressure { get; set; }
    public required double CurrentWindSpeed { get; set; }
    public required double HistoricalAverageWindSpeed { get; set; }
}
