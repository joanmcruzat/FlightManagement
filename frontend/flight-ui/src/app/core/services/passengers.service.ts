import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Passenger {
    passengerId: string;
    firstName: string;
    lastName: string;
    class: 'First' | 'Business' | 'Economy';
    flightNumber?: number;
}

@Injectable({ providedIn: 'root' })
export class PassengersService {
    private base = 'https://localhost:7221/api/';

    constructor(private http: HttpClient) { }

    getByFlight(flightNumber: number) {
        return this.http.get<Passenger[]>(`${this.base}flights/${flightNumber}/passengers`);
    }

    getAll() {
        return this.http.get<Passenger[]>(`${this.base}passengers`);
    }

    add(flightNumber: number, data: Partial<Passenger>) {
        return this.http.post<Passenger>(`${this.base}flights/${flightNumber}/passengers`, data);
    }

}