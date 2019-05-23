import { Component, OnInit } from '@angular/core';

import { ApiService } from '../services/weather.service';
import { AudioFeatures } from '../models/audiofeatures';
import { FeaturesService } from '../services/features.service';
import { SpotifyService } from '../services/spotify.service';
import { Weather } from '../models/weather';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  public cityValue: string;
  public countryValue: string;
  public tracks = [];
  public weather = new Weather();
  private token: any;

  constructor(
    private api: ApiService,
    private features: FeaturesService,
    private spotify: SpotifyService) { }

  ngOnInit() {
    this.token = this.spotify.getToken();
  }

  public getWeather(city: string, country: string): void {
    const apikey = '8d2de98e089f1c28e1a22fc19a24ef04';
    this.api.getWeatherData(city, country, apikey).subscribe(result => {
      if (result !== undefined || result !== '') {
        this.weather.temp = String(Math.round(result.main.temp));
        this.weather.city = result.name;
        this.weather.country = result.sys.country;
        this.weather.humidity = result.main.humidity;
        this.weather.description = result.weather[0].description;
        this.weather.main = result.weather[0].main;
        this.weather.wind = result.wind.speed;
        this.weather.icon = result.weather[0].icon;
      }
      const feat = this.features.convertWeatherToFeatures(this.weather);
      this.getTracks(feat, this.token.access_token);
    });

  }

  private getTracks(features: AudioFeatures, token: string): void {
    const genresRand = this.features.spotifyGenres.sort(() => 0.5 - Math.random());
    const genres = genresRand.slice(0, 5).join(',');
    this.spotify.getRecommendations(features, genres, token).subscribe(data => {
      this.tracks = data.tracks;
    });
  }

}
