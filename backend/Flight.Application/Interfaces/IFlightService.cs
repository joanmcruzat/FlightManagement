using Flight.Application.DTOs;
using Flight.Domain.Models;

namespace Flight.Application.Interfaces;

public interface IFlightService
{
    void AddFlight(AddFlightRequest request);
    List<FlightData> GetFlights();
    object GetFlightSummary(int flightNumber);
    PassengerResponse AddPassenger(int flightNumber, AddPassengerRequest request);
    List<Passenger> GetPassengers(int flightNumber);
}