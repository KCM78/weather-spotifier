import { Component } from '@angular/core';

import ApiService from '../services/weather.service';
import AudioFeatures from '../models/audiofeatures';
import FeaturesService from '../services/features.service';
import SpotifyService from '../services/spotify.service';
import Weather from '../models/weather';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export default class WeatherComponent {
  public cityValue: string;

  public countryValue: string;

  public tracks = [];

  public weather = new Weather();

  public playlist: string;

  public playlistSnapshotId: string;

  public playlistUrl: string;

  constructor(
    private api: ApiService,
    private features: FeaturesService,
    private spotify: SpotifyService,
  ) { }

  public getWeather(city: string, country: string): void {
    this.api.getWeatherData(city, country).subscribe((result) => {
      if (result !== undefined || result !== null) {
        this.weather.temp = String(Math.round(result.main.temp));
        this.weather.city = result.name;
        this.weather.country = result.sys.country;
        this.weather.humidity = result.main.humidity.toString();
        this.weather.description = result.weather[0].description;
        this.weather.main = result.weather[0].main;
        this.weather.wind = result.wind.speed.toString();
        this.weather.icon = result.weather[0].icon;
        this.weather.weatherId = result.weather[0].id.toString();
      }
      const feat = this.features.convertWeatherToFeatures(this.weather);
      this.getTracks(feat);
    });
  }

  private getTracks(features: AudioFeatures): void {
    const genresRand = features.genreGroup.sort(() => 0.5 - Math.random());
    const genres = genresRand.slice(0, 5).join();
    this.spotify.getRecommendations(features, genres).subscribe((data) => {
      this.tracks = data.tracks;
    });
  }
}
