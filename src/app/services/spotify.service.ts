import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import AudioFeatures from '../models/audiofeatures';

@Injectable()

export default class SpotifyService {
  constructor(private http: HttpClient) {}

  public getRecommendations(
    features: AudioFeatures,
    genres: string,
  ): Observable<SpotifyApi.RecommendationsFromSeedsResponse> {
    const params = new HttpParams()
      .set('seed_genres', genres)
      .set('limit', '12')
      .set('min_popularity', '10')
      .set('target_valence', String(features.maxValence))
      .set('target_energy', String(features.maxEnergy))
      .set('max_tempo', String(features.maxTempo))
      .set('mode', String(features.mode));
    return this.http.get<SpotifyApi.RecommendationsFromSeedsResponse>('/api/getRecommendations', { params });
  }
}
