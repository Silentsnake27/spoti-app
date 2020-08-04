import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { SpotifyService } from '../services/spotify.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private _injector: Injector) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let spotifyService = this._injector.get(SpotifyService);
    return next.handle(req).pipe(catchError(err => {
      let errorMessage = '';
      if(err instanceof ErrorEvent){
        // client-side error
        errorMessage = `Client-side error: ${err.error.error.message}`;
      }else {
        // backend error
        if(err.error.error.message === 'No token provided' || 'Invalid access token'){
          console.log('error en token');
          errorMessage = `Server-side error: ${err.status} ${err.error.error.message}. Por favor espere 10 segundos a que suba el server en la otra app`  
          spotifyService.getApiToken()
        }else
        errorMessage = `Server-side error: ${err.status} ${err.error.error.message}`

      }
      // window.alert(errorMessage)
      return throwError(errorMessage)
    }));
  }
}
