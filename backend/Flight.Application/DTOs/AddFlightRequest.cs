using System.ComponentModel.DataAnnotations;

namespace Flight.Application.DTOs
{
    public class AddFlightRequest
    {
        [Required]
        public int FlightNumber { get; set; }
        [Required]
        public string Destination { get; set; }
    }
}
