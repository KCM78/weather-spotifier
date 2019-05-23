import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AudioFeatures } from '../models/audiofeatures';

@Injectable()

export class SpotifyService {

    constructor(private http: HttpClient) {}

    public getToken(): any {
        const params = {};
        const r = /([^&;=]+)=?([^&;]*)/g;
        const q = window.location.hash.substring(1);
        let e = r.exec(q);
        while (e) {
            params[e[1]] = decodeURIComponent(e[2]);
            e = r.exec(q);
        }
        return params;
    }

    public getRecommendations(features: AudioFeatures, genres: any, token: string): Observable<any> {
        const headers = new HttpHeaders()
            .set('Authorization', 'Bearer ' + token);
        const params = new HttpParams()
            .set('seed_genres', genres)
            .set('limit', '12')
            .set('min_popularity', '10')
            .set('target_valence', String(features.maxValence))
            .set('target_energy', String(features.maxEnergy))
            .set('max_tempo', String(features.maxTempo))
            .set('mode', String(features.mode));
        return this.http.get('https://api.spotify.com/v1/recommendations/', {params, headers});
    }
}
