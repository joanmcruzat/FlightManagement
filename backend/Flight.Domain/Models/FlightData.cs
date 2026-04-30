namespace Flight.Domain.Models
{
    public class FlightData
    {
        public int FlightNumber { get; set; }
        public string Destination { get; set; }
        public List<Passenger> Passengers { get; set; } = new();
    }
}

