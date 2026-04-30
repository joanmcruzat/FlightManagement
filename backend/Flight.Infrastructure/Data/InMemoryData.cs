using Flight.Domain.Models;
using System.Collections.Generic;

namespace Flight.Infrastructure.Data
{
    public static class InMemoryData
    {
        public static List<FlightData> Flights { get; } = new List<FlightData>
        {
            new FlightData
            {
                FlightNumber = 1001,
                Destination = "Dubai",
                Passengers = new List<Passenger>
                {
                    new Passenger
                    {
                        PassengerId = "P001",
                        FirstName = "John",
                        LastName = "Doe",
                        Class = "First",
                        SeatNumber = 1,
                        TicketPrice = 1800,
                        NumberOfBags = 2,
                        TotalBaggageWeight = 25
                    },
                    new Passenger
                    {
                        PassengerId = "P002",
                        FirstName = "Jane",
                        LastName = "Smith",
                        Class = "Business",
                        SeatNumber = 21,
                        TicketPrice = 1500,
                        NumberOfBags = 1,
                        TotalBaggageWeight = 15
                    },
                    new Passenger
                    {
                        PassengerId = "P003",
                        FirstName = "Ali",
                        LastName = "Khan",
                        Class = "Economy",
                        SeatNumber = 51,
                        TicketPrice = 1500,
                        NumberOfBags = 1,
                        TotalBaggageWeight = 18
                    }
                }
            },

            new FlightData
            {
                FlightNumber = 2002,
                Destination = "London",
                Passengers = new List<Passenger>
                {
                    new Passenger
                    {
                        PassengerId = "P004",
                        FirstName = "Emma",
                        LastName = "Brown",
                        Class = "First",
                        SeatNumber = 2,
                        TicketPrice = 1500,
                        NumberOfBags = 2,
                        TotalBaggageWeight = 28,

                    },
                    new Passenger
                    {
                        PassengerId = "P005",
                        FirstName = "Liam",
                        LastName = "Wilson",
                        Class = "Economy",
                        SeatNumber = 52,
                        TicketPrice = 1500,
                        NumberOfBags = 1,
                        TotalBaggageWeight = 12
                    }
                }
            },

            new FlightData
            {
                FlightNumber = 3003,
                Destination = "Singapore",
                Passengers = new List<Passenger>
                {
                    new Passenger
                    {
                        PassengerId = "P006",
                        FirstName = "Sophia",
                        LastName = "Lee",
                        Class = "Business",
                        SeatNumber = 22,
                        TicketPrice = 1500,
                        NumberOfBags = 2,
                        TotalBaggageWeight = 18
                    }
                }
            }
        };
    }
}