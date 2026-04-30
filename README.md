# FlightManagement

A simple flight management application built with an ASP.NET Core backend and an Angular frontend.

## Overview

This project allows users to manage flights, view flight summaries, and add passengers to flights. It uses an in-memory data store for flight and passenger data and exposes a REST API consumed by an Angular UI.

## Features

- Add new flights with flight number and destination
- View all flights
- View detailed flight summary with seat availability by class
- Add passengers to a flight
- Validate duplicate passengers and baggage rules by travel class
- Automatic seat assignment by class (First, Business, Economy)
- Swagger API documentation for backend testing
- Cross-origin support for Angular frontend

## Architecture

- `backend/Flight.API` - ASP.NET Core Web API project
  - `Program.cs` configures controllers, dependency injection, CORS, exception handling, and Swagger
  - `Controllers/FlightsController.cs` exposes flight-related endpoints
  - `Controllers/PassengersController.cs` exposes passenger management endpoints

- `backend/Flight.Application` - application layer
  - `Services/FlightService.cs` implements business logic
  - `DTOs/` defines request objects for flight and passenger creation
  - `Interfaces/IFlightService.cs` defines the service contract
  - `Exceptions/ApiException.cs` defines custom API exceptions

- `backend/Flight.Domain` - domain model layer
  - `Models/FlightData.cs` defines flight structure
  - `Models/Passenger.cs` defines passenger structure

- `backend/Flight.Infrastructure` - infrastructure layer
  - `Data/InMemoryData.cs` provides seeded flight and passenger data

- `frontend/flight-ui` - Angular application
  - Uses Angular 21 and Angular Material for UI
  - Connects to backend API at `http://localhost:5000` by default

## Prerequisites

- .NET 8 SDK
- Node.js 20+ / npm 10+
- Angular CLI (optional, if running frontend directly with `ng serve`)

## Run the Backend

1. Open a terminal at `backend/Flight.API`
2. Run:
   ```bash
   dotnet run --launch-profile https
   ```
3. The backend will start and expose the API at `https://localhost:7221;` and `http://localhost:5094` by default.
4. Swagger UI is available at `https://localhost:7221/swagger` when running in the Development environment.

## Run the Frontend

1. Open a terminal at `frontend/flight-ui`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Angular application:
   ```bash
   npm start
   ```
4. The frontend runs at `http://localhost:4200`.

## API Endpoints

- `POST /api/flights` - Add a flight
  - Request body: `flightNumber`, `destination`
- `GET /api/flights` - Get all flights
- `GET /api/flights/{flightNumber}` - Get flight summary including available seats
- `POST /api/flights/{flightNumber}/passengers` - Add passenger to flight
  - Request body: `firstName`, `lastName`, `passengerId`, `class`, `ticketPrice`, `numberOfBags`, `totalBaggageWeight`
- `GET /api/flights/{flightNumber}/passengers` - Get passengers for a flight

## Data and Validation Rules

- `FlightData` includes flight number, destination, and passenger list
- `Passenger` includes ID, name, travel class, seat number, baggage, and ticket price
- Seat ranges:
  - First: 1-20
  - Business: 21-50
  - Economy: 51-200
- Baggage limits:
  - First: 2 bags, 30 kg total
  - Business: 2 bags, 20 kg total
  - Economy: 1 bag, 20 kg total

## Notes

- The application uses an in-memory data store, so all changes reset when the backend restarts.
- CORS is configured to allow requests from `http://localhost:4200`.
- Custom API exceptions are returned as JSON with `error` and `message` fields.

## License

This project is provided as-is for demonstration and learning purposes.
