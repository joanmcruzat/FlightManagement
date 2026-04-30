namespace Flight.Domain.Models
{
    public class Passenger
    {
        public string PassengerId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Class { get; set; }
        public int SeatNumber { get; set; }
        public int NumberOfBags { get; set; }
        public double TotalBaggageWeight { get; set; }
        public double TicketPrice { get; set; }
    }
}
