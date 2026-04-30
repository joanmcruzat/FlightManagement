using Microsoft.AspNetCore.Mvc;
using Flight.Application.Services;
using Flight.Application.DTOs;
using Flight.Application.Interfaces;

namespace Flight.API.Controllers;

[ApiController]
[Route("api/flights/{flightNumber}/passengers")]
public class PassengersController : ControllerBase
{
    private readonly IFlightService _service;

    public PassengersController(IFlightService service)
    {
        _service = service;
    }

    [HttpPost]
    public IActionResult AddPassenger(int flightNumber, AddPassengerRequest request)
    {
        return Ok(_service.AddPassenger(flightNumber, request));
    }

    [HttpGet]
    public IActionResult GetPassengers(int flightNumber)
    {
        return Ok(_service.GetPassengers(flightNumber));
    }
}