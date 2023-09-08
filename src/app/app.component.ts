import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent  implements OnInit{
  constructor() {}

  nombreUsuario!: string | null;
  
  ngOnInit() {
    console.log(localStorage.getItem('usuario'));
    const usuarioStr = localStorage.getItem('usuario');
    if (usuarioStr) {
      const usuarioObj = JSON.parse(usuarioStr);
      this.nombreUsuario = usuarioObj.usuario; // Obtén el nombre de usuario del objeto
      
    }
  }
}


