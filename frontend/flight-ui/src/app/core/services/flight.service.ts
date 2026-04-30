import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Flight {
  flightNumber: number;
  destination: string;
}

@Injectable({ providedIn: 'root' })
export class FlightService {
  private base = 'https://localhost:7221/api/flights';

  constructor(private http: HttpClient) { }

  getAll() { return this.http.get<Flight[]>(this.base); }
  add(data: Partial<Flight>) { return this.http.post<Flight>(this.base, data); }
}