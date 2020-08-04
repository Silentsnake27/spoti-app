import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styleUrls: ['./tarjetas.component.css'],
})
export class TarjetasComponent {
  @Input() items: any[] = [];

  constructor(private _router:Router) {}

  verArtista(item:any){
    let artistaId;

    if(item.type === 'artist'){
      artistaId = item.id;
    } else {
      artistaId = item.artists[0].id
    }
      this._router.navigate(['/artist', artistaId])    
  }
}
