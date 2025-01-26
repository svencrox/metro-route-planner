import { Component, OnInit } from "@angular/core";
import { MetroService, RouteResponse } from "../metro.service";

@Component({
	selector: "app-metro",
	templateUrl: "./metro.component.html",
	styleUrls: ["./metro.component.scss"],
})
export class MetroComponent implements OnInit {
	start: string = "";
	end: string = "";
	result: RouteResponse | null = null;
	error: string | null = null;
	stations: string[] = [];
	filteredStations: { start: string[]; end: string[] } = {
		start: [],
		end: [],
	};

	constructor(private metroService: MetroService) {}

	ngOnInit(): void {
		// Fetch stations from the backend
		this.metroService.getStations().subscribe({
			next: (stations) => {
				this.stations = stations;
			},
			error: (err) => {
				this.error = "Failed to load stations.";
				console.error(err);
			},
		});
	}

	filterStations(field: "start" | "end", event: Event): void {
		const inputValue = (event.target as HTMLInputElement).value;
		if (!inputValue.trim()) {
			this.filteredStations[field] = [];
			return;
		}

		// Filter stations based on input value (case-insensitive)
		this.filteredStations[field] = this.stations.filter((station) =>
			station.toLowerCase().includes(inputValue.toLowerCase())
		);
	}

	selectStation(field: "start" | "end", station: string): void {
		// Set the selected station and clear suggestions
		this[field] = station;
		this.filteredStations[field] = [];
	}

	onSubmit(): void {
		if (this.start && this.end) {
			this.metroService.calculateRoute(this.start, this.end).subscribe({
				next: (data) => {
					this.result = data;
					this.error = null;
				},
				error: (err) => {
					this.error = err.error.error || "An error occurred";
					this.result = null;
				},
			});
		}
	}

	getLineClass(line: string): string {
		switch (line) {
			case "green":
				return "green";
			case "blue":
				return "blue";
			default:
				return "black";
		}
	}
}
