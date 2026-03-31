import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { AppComponent } from './app.component';
import { WeatherForecastService } from './weather-forecast.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let weatherService: jasmine.SpyObj<WeatherForecastService>;

  beforeEach(async () => {
    weatherService = jasmine.createSpyObj<WeatherForecastService>('WeatherForecastService', ['getWeatherForecast']);
    weatherService.getWeatherForecast.and.returnValue(
      of([
        {
          date: '2026-03-31T00:00:00.000Z',
          temperatureC: 12,
          temperatureF: 54,
          summary: 'Mild',
        },
      ]),
    );

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [{ provide: WeatherForecastService, useValue: weatherService }],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
  });

  it('loads weather data on init', () => {
    expect(weatherService.getWeatherForecast).toHaveBeenCalled();
    expect(fixture.componentInstance.weatherData.length).toBe(1);
    expect(fixture.componentInstance.loading).toBeFalse();
  });

  it('toggles temperature units', () => {
    expect(fixture.componentInstance.useCelsius).toBeFalse();

    fixture.componentInstance.toggleUnit(true);

    expect(fixture.componentInstance.useCelsius).toBeTrue();
    expect(fixture.componentInstance.toTemp(fixture.componentInstance.weatherData[0])).toBe(12);
  });
});
