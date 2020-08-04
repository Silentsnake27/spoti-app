import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [],
})
export class HomeComponent implements OnInit {
  nuevasCanciones: any[] = [];
  loading: boolean;
  error: boolean = false;
  mensajeError: string;
  constructor(private _spotify: SpotifyService) {
    this.loading = true;

    this._spotify.getNewReleases().subscribe(
      (data: any) => {
        // console.log(data.albums.items);
        // console.log(data);
        this.nuevasCanciones = data;
        this.loading = false;
      },
      (err) => {
        this.loading = false;
        // console.log(err);
        this.error = true;
        this.mensajeError = err;
      }
    );
  }

  ngOnInit(): void {}
}
