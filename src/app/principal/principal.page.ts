import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';

import { GoogleMap, Marker } from '@capacitor/google-maps';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  nombreUsuario!: string | null;

  @ViewChild('map')mapRef!: ElementRef;
  map!: GoogleMap;

  constructor() { }

  

  ionViewDidEnter() {
    this.createMap();
  }

  ngOnInit() {
    
    const usuarioStr = localStorage.getItem('usuario');
    console.log(localStorage.getItem('usuario'));
    if (usuarioStr) {
      const usuarioObj = JSON.parse(usuarioStr);
      this.nombreUsuario = usuarioObj.usuario; // Obtén el nombre de usuario del objeto
      
    }
  }

  async createMap() {
    this.map = await GoogleMap.create({
      id: 'my-map',
      apiKey: environment.mapsKey,   
      element: this.mapRef.nativeElement,
      config: {     
        center: {
          lat: -33.03352241060603,
          lng: -71.53301720628482,
        },
        zoom: 18, 
      },
    });
    this.addMarkers();
  }

  async addMarkers(){
    const markers: Marker[] = [
      { 
        coordinate:{
          lat: -33.03332111205935,
          lng: -71.53237989657106,
  
        },
        title: 'Duoc UC: Sede Viña Del Mar',
        snippet: 'Duoc UC: Sede Viña Del Mar',
      },
      {

        coordinate: {
          lat: 33.7,
          lng: -117.2,
        },
        title: 'random place',
        snippet: 'Not sure'
      },
    ];

    const result = await this.map.addMarkers(markers);
    console.log(result);
  }  

}
