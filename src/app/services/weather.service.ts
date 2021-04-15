import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherResponse } from '../interfaces/weather';
import { config } from './config';

@Injectable()
export default class ApiService {
  constructor(private http: HttpClient) { }

  getWeatherData(city: string, country: string): Observable<WeatherResponse> {
    return this.http.get<WeatherResponse>(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${config.apiKey}&units=metric`);
  }
}
