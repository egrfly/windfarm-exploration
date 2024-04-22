using System.Net;
using Microsoft.AspNetCore.Mvc;
using WindfarmExploration.Models.Response;
using WindfarmExploration.Services;

namespace WindfarmExploration.Controllers;

[ApiController]
[Route("/weather")]
public class WeatherController(WeatherService weatherService) : Controller
{
    private readonly WeatherService _weatherService = weatherService;

    [HttpGet("")]
    public async Task<IActionResult> GetForLocation(
        [FromQuery] double latitude,
        [FromQuery] double longitude
    )
    {
        try
        {
            var historicalAverageWindSpeedTask =
                _weatherService.GetHistoricalAverageWindSpeedForLocation(latitude, longitude);
            var currentWindSpeedAndAirPressureTask =
                _weatherService.GetCurrentWindSpeedAndAirPressureForLocation(latitude, longitude);
            var weatherResponse = new WeatherResponse
            {
                CurrentAirPressure = (await currentWindSpeedAndAirPressureTask)
                    .PressureSection
                    .Pressure,
                CurrentWindSpeed = (await currentWindSpeedAndAirPressureTask).WindSection.Speed,
                HistoricalAverageWindSpeed = await historicalAverageWindSpeedTask,
            };
            return Ok(weatherResponse);
        }
        catch (HttpRequestException exception)
        {
            return new StatusCodeResult(
                ((int?)exception.StatusCode) ?? (int)HttpStatusCode.BadGateway
            );
        }
        catch (InvalidDataException)
        {
            return new StatusCodeResult((int)HttpStatusCode.BadGateway);
        }
    }
}
