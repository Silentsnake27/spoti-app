import { Component } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [],
})
export class SearchComponent {
  artistas: any[] = [];
  loading: boolean;

  constructor(private _spotify: SpotifyService) {}

  buscar(termino: string) {
    if (!termino) {
      this.artistas = [];
      return;
    }
    this.loading = true;
    // console.log(termino);
    this._spotify.getArtistas(termino).subscribe((data) => {
      // console.log(data);
      this.artistas = data;
      this.loading = false;
    });
  }
}
