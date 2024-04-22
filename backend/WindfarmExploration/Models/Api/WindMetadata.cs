using System.Text.Json.Serialization;

namespace WindfarmExploration.Models.Api;

public class WindMetadata
{
    [JsonPropertyName("mean_wind_speed")]
    public required string MeanWindSpeed { get; set; }
}
