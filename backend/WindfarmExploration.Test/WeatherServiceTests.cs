using WindfarmExploration.Services;

namespace WindfarmExploration.Test;

public class Tests
{
    [Test]
    public async Task GetCurrentWindSpeedAndAirPressureForLocation_Called_ThrowsNoErrors()
    {
        var weatherService = new WeatherService();

        await weatherService.GetCurrentWindSpeedAndAirPressureForLocation(latitude: 58.785489, longitude: -5.103728);
    }

    [Test]
    public async Task GetHistoricalAverageWindSpeedForLocation_Called_ThrowsNoErrors()
    {
        var weatherService = new WeatherService();

        await weatherService.GetHistoricalAverageWindSpeedForLocation(latitude: 58.785489, longitude: -5.103728);
    }
}
