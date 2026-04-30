using Flight.Application.DTOs;
using Flight.Application.Interfaces;
using Flight.Application.Exceptions;
using Flight.Infrastructure.Data;
using Flight.Domain.Models;


namespace Flight.Application.Services;

public class FlightService : IFlightService
{
    private readonly List<FlightData> _flights = InMemoryData.Flights;

    public void AddFlight(AddFlightRequest request)
    {
        if (_flights.Any(f => f.FlightNumber == request.FlightNumber))
            throw new ApiException("DuplicateFlight", "Flight already exists.");

        _flights.Add(new FlightData
        {
            FlightNumber = request.FlightNumber,
            Destination = request.Destination
        });
    }

    public List<FlightData> GetFlights() => _flights;

    public object GetFlightSummary(int flightNumber)
    {
        var flight = GetFlightOrThrow(flightNumber);

        return new
        {
            flight.FlightNumber,
            flight.Destination,
            TotalPassengers = flight.Passengers.Count,
            AvailableSeats = new
            {
                First = 20 - flight.Passengers.Count(p => p.Class == "First"),
                Business = 30 - flight.Passengers.Count(p => p.Class == "Business"),
                Economy = 150 - flight.Passengers.Count(p => p.Class == "Economy")
            }
        };
    }

    public PassengerResponse AddPassenger(int flightNumber, AddPassengerRequest request)
    {
        var flight = GetFlightOrThrow(flightNumber);

        ValidateDuplicatePassenger(flight, request.PassengerId);
        ValidateBaggage(request);

        int seat = AssignSeat(request.Class, flight.Passengers);

        var passenger = new Passenger
        {
            PassengerId = request.PassengerId,
            FirstName = request.FirstName,
            LastName = request.LastName,
            Class = request.Class,
            SeatNumber = seat,
            TicketPrice = request.TicketPrice,
            NumberOfBags = request.NumberOfBags,
            TotalBaggageWeight = request.TotalBaggageWeight
        };

        flight.Passengers.Add(passenger);

        return new PassengerResponse
        {
            SeatNumber = seat,
            FirstName = passenger.FirstName,
            LastName = passenger.LastName,
            Class = passenger.Class,
            Message = "Passenger added successfully"
        };
    }

    public List<Passenger> GetPassengers(int flightNumber)
    {
        return GetFlightOrThrow(flightNumber).Passengers;
    }

    // ===== Helpers =====

    private FlightData GetFlightOrThrow(int flightNumber)
    {
        var flight = _flights.FirstOrDefault(f => f.FlightNumber == flightNumber);
        if (flight == null)
            throw new ApiException("FlightNotFound", "Flight not found.");
        return flight;
    }

    private void ValidateDuplicatePassenger(FlightData flight, string passengerId)
    {
        if (flight.Passengers.Any(p => p.PassengerId == passengerId))
            throw new ApiException("DuplicatePassenger", "Passenger already exists.");
    }

    private void ValidateBaggage(AddPassengerRequest request)
    {
        var rules = new Dictionary<string, (int bags, double weight)>
    {
        { "First", (2, 30) },
        { "Business", (2, 20) },
        { "Economy", (1, 20) }
    };

        if (!rules.ContainsKey(request.Class))
            throw new ApiException("InvalidClass", "Invalid passenger class.");

        var rule = rules[request.Class];

        if (request.NumberOfBags > rule.bags || request.TotalBaggageWeight > rule.weight)
        {
            throw new ApiException(
                "BaggageExceeded",
                $"{request.Class} class allows maximum {rule.bags} bags with total weight of {rule.weight} kg. " +
                $"Provided: {request.NumberOfBags} bags, {request.TotalBaggageWeight} kg."
            );
        }
    }

    private int AssignSeat(string passengerClass, List<Passenger> passengers)
    {
        var ranges = new Dictionary<string, (int start, int end)>
        {
            { "First", (1, 20) },
            { "Business", (21, 50) },
            { "Economy", (51, 200) }
        };

        var (start, end) = ranges[passengerClass];

        var taken = passengers
            .Where(p => p.Class == passengerClass)
            .Select(p => p.SeatNumber)
            .ToHashSet();

        for (int i = start; i <= end; i++)
            if (!taken.Contains(i))
                return i;

        throw new ApiException("SeatUnavailable", "No seats available.");
    }

}