using System.ComponentModel.DataAnnotations;

namespace Flight.Application.DTOs
{
    public class AddPassengerRequest
    {
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string PassengerId { get; set; }
        [Required]
        public string Class { get; set; }
        [Required]
        public double TicketPrice { get; set; }
        [Required]
        public int NumberOfBags { get; set; }
        [Required]
        public double TotalBaggageWeight { get; set; }

    }
}
