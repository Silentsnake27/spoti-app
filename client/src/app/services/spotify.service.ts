import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  API_URI:string = 'http://localhost:3000/api'
  token: string =
    'BQBrj2QNNB5r7YyRREhGSMY7qm-6fSZqXcd8D2mvRvU1DmMpH-6Hr4mguU7I5M1bVdzLi95Q0pl69G5QuVk';

  constructor(private _http: HttpClient) {
    console.log('service listo');
  }

   getApiToken(){
    return this._http.get(`${this.API_URI}/token`).subscribe(data => {
      console.log(data);
      
      localStorage.setItem('access_token',data['access_token'])
      window.location.reload();
    })
  }

   getToken(){
    return localStorage.getItem('access_token')
}

  getQuery(query: string) {
    // this.getApiToken()
    const url = `https://api.spotify.com/v1/${query}`;

    // const headers = new HttpHeaders({
    //   Authorization: `Bearer ${this.token}`,
    // });

    return this._http.get(url);
  }

  getNewReleases() {
    // const headers = new HttpHeaders({
    //   Authorization: `Bearer ${this.token}`,
    // });

    return this.getQuery('browse/new-releases?limit=20').pipe(
      map((data) => data['albums'].items)
    );
    // return this._http
    //   .get('https://api.spotify.com/v1/browse/new-releases?limit=20', {
    //     headers,
    //   })
    //   .pipe(map((data) => data['albums'].items));
  }

  getArtistas(termino: string) {
    return this.getQuery(
      `search?query=${termino}&type=artist&offset=0&limit=20`
    ).pipe(map((data) => data['artists'].items));
  }

  getArtista(id: string) {
    return this.getQuery(`artists/${id}`);
  }

  getTopTracks(id: string) {
    return this.getQuery(`artists/${id}/top-tracks?country=us`).pipe(
      map((data) => data['tracks']));
  }
}
