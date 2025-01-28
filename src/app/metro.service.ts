import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface RouteResponse {
	path: RouteStop[];
	time: number;
	cost: number;
}

interface RouteStop {
	station: string;
	line: string;
	direction: string;
}

@Injectable({
	providedIn: "root",
})
export class MetroService {
	private apiUrl = "http://localhost:8000/calculate-route";
	private stationsUrl = "http://localhost:8000/stations";

	constructor(private http: HttpClient) {}

	calculateRoute(start: string, end: string): Observable<RouteResponse> {
		return this.http.post<RouteResponse>(this.apiUrl, { start, end });
	}

	getStations(): Observable<string[]> {
		return this.http.get<string[]>(this.stationsUrl);
	}
}
