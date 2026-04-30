using Microsoft.AspNetCore.Mvc;
using Flight.Application.Services;
using Flight.Application.DTOs;
using Flight.Application.Interfaces;

namespace Flight.API.Controllers;

[ApiController]
[Route("api/flights")]
public class FlightsController : ControllerBase
{
    private readonly IFlightService _service;

    public FlightsController(IFlightService service)
    {
        _service = service;
    }

    [HttpPost]
    public IActionResult AddFlight(AddFlightRequest request)
    {
        _service.AddFlight(request);
        return Ok();
    }

    [HttpGet]
    public IActionResult GetFlights()
    {
        return Ok(_service.GetFlights());
    }

    [HttpGet("{flightNumber}")]
    public IActionResult GetFlight(int flightNumber)
    {
        return Ok(_service.GetFlightSummary(flightNumber));
    }
}