import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { ApiService } from './services/weather.service';
import { AppComponent } from './app.component';
import { FeaturesService } from './services/features.service';
import { SpotifyService } from './services/spotify.service';
import { WeatherComponent } from './weather/weather.component';

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    ApiService,
    FeaturesService,
    SpotifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
