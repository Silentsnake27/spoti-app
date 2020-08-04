import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SpotifyService } from '../services/spotify.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptor implements HttpInterceptor {
  constructor(private _spotify: SpotifyService, private _router: Router) {
    // console.log('paso por el interceptor');
  }

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // let spotifyService = this._injector.get(SpotifyService);
    // console.log('paso por el interceptor', spotifyService.getToken());
    if (localStorage.hasOwnProperty('access_token')) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this._spotify.getToken()}`,
      });
      const reqClone = req.clone({
        headers,
      });
      return next.handle(reqClone);
    }
    // this._router.navigateByUrl('/home')
    return next.handle(req);
  }
}
