import { Injectable } from '@angular/core';

import { AudioFeatures } from '../models/audiofeatures';
import { Weather } from '../models/weather';


@Injectable()

export class FeaturesService {

  public spotifyGenres = [
      'acoustic',
      'alt-rock',
      'alternative',
      'ambient',
      'black-metal',
      'blues',
      'breakbeat',
      'chill',
      'classical',
      'dance',
      'death-metal',
      'deep-house',
      'disco',
      'drum-and-bass',
      'dub',
      'dubstep',
      'edm',
      'electro',
      'electronic',
      'emo',
      'funk',
      'garage',
      'goth',
      'grindcore',
      'groove',
      'grunge',
      'hard-rock',
      'hardcore',
      'heavy-metal',
      'hip-hop',
      'house',
      'idm',
      'indie',
      'indie-pop',
      'industrial',
      'jazz',
      'metal',
      'metalcore',
      'maximal-techno',
      'new-release',
      'pop',
      'power-pop',
      'punk',
      'punk-rock',
      'r-n-b',
      'reggae',
      'rock',
      'singer-songwriter',
      'ska',
      'soul',
      'soundtracks',
      'synth-pop',
      'techno',
      'trance',
      'trip-hop',
  ];

  public convertWeatherToFeatures(weather: Weather): AudioFeatures {
    const wind = Number(weather.wind);
    const temp = Number(weather.temp);
    const audioFeatures = new AudioFeatures();

    switch (weather.description) {
      case ('Clear') :
        audioFeatures.maxValence = 0.6;
        audioFeatures.maxEnergy = 0.5;
        audioFeatures.mode = 1;
        break;
      case ('Clouds') :
        audioFeatures.maxValence = 0.45;
        audioFeatures.maxEnergy = 0.45;
        audioFeatures.mode = 0;
        break;
      case ('Snow') :
        audioFeatures.maxValence = 0.4;
        audioFeatures.maxEnergy = 0.6;
        audioFeatures.mode = 1;
        break;
      case ('Rain') :
        audioFeatures.maxValence = 0.35;
        audioFeatures.maxEnergy = 0.35;
        audioFeatures.mode = 0;
        break;
      case ('Drizzle') :
        audioFeatures.maxValence = 0.4;
        audioFeatures.maxEnergy = 0.35;
        audioFeatures.mode = 0;
        break;
      case ('Thunderstorm') :
        audioFeatures.maxValence = 0.7;
        audioFeatures.maxEnergy = 0.7;
        audioFeatures.mode = 1;
        break;
      default :
        audioFeatures.maxValence = 0.5;
        audioFeatures.maxEnergy = 0.5;
        audioFeatures.mode = 1;
    }

    switch (true) {
      case (wind < 5) :
        audioFeatures.maxEnergy += 0.025;
        break;
      case (wind < 10) :
        audioFeatures.maxEnergy += 0.05;
        break;
      case (wind < 15) :
        audioFeatures.maxEnergy += 0.075;
        break;
      case (wind < 20) :
        audioFeatures.maxEnergy += 0.075;
        break;
    }

    switch (true) {
      case (temp < 5) :
        audioFeatures.maxTempo = 80;
        audioFeatures.maxValence -= 0.05;
        break;
      case (temp < 10) :
        audioFeatures.maxTempo = 90;
        audioFeatures.maxValence -= 0.025;
        break;
      case (temp < 15) :
        audioFeatures.maxTempo = 100;
        break;
      case (temp < 20) :
        audioFeatures.maxTempo = 110;
        audioFeatures.maxValence += 0.25;
        break;
      case (temp < 25) :
        audioFeatures.maxTempo = 120;
        audioFeatures.maxValence += 0.5;
        break;
      case (temp < 30) :
        audioFeatures.maxTempo = 130;
        audioFeatures.maxValence += 0.1;
        break;
      case (temp > 30) :
        audioFeatures.maxTempo = 140;
        audioFeatures.maxValence += 0.2;
        break;
    }
    return audioFeatures;
  }

}
