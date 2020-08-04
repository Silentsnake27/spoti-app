import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styles: [],
})
export class ArtistaComponent {
  artista: any = {};
  loading: boolean;
  topTracks: any[] = []

  constructor(
    private _routerActivated: ActivatedRoute,
    private _spotifyService: SpotifyService
  ) {
    this._routerActivated.params.subscribe((params) => {
      // this.loading = true
      this.getArtista(params['id']);
      this.getTopTracks(params['id'])
    });
  }

  getArtista(id: string) {
    this.loading = true
    
    this._spotifyService.getArtista(id).subscribe((artista) => {
      // console.log(artista);
      this.artista = artista;
      this.loading = false
    });
  }

  getTopTracks(id: string){
    this._spotifyService.getTopTracks(id).subscribe(topTracks => {
      // console.log(topTracks);
      this.topTracks = topTracks
      
    })
  }
}
