import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }

  getWeatherData(city: string, country: string, apikey: string): Observable<any> {
    return this.http.get(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apikey}&units=metric`);
  }
}
