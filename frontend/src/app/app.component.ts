import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { WeatherForecast, WeatherForecastService } from './weather-forecast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  weatherData: WeatherForecast[] = [];
  loading = false;
  error: string | null = null;
  useCelsius = false;

  constructor(private readonly weatherService: WeatherForecastService) {}

  ngOnInit(): void {
    this.loadWeatherForecast();
  }

  loadWeatherForecast(): void {
    this.loading = true;
    this.error = null;

    this.weatherService
      .getWeatherForecast()
      .pipe(finalize(() => {
        this.loading = false;
      }))
      .subscribe({
        next: data => {
          this.weatherData = data;
        },
        error: err => {
          this.error = err?.message || 'Failed to fetch weather data';
        },
      });
  }

  toggleUnit(useCelsius: boolean): void {
    this.useCelsius = useCelsius;
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString(undefined, {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  }

  toTemp(forecast: WeatherForecast): number {
    return this.useCelsius ? forecast.temperatureC : forecast.temperatureF;
  }
}
