namespace Flight.Application.Exceptions;

public class ApiException : Exception
{
    public string Error { get; set; }

    public ApiException(string error, string message) : base(message)
    {
        Error = error;
    }
}