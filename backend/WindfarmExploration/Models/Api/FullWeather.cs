using System.Text.Json.Serialization;

namespace WindfarmExploration.Models.Api;

public class FullWeather
{
    [JsonPropertyName("main")]
    public required PressureSection PressureSection { get; set; }

    [JsonPropertyName("wind")]
    public required WindSection WindSection { get; set; }
}
