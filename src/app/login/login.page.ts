import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup;

  constructor(public fb: FormBuilder, public alertController: AlertController, public navCtrl: NavController) {
    this.formularioLogin = this.fb.group({
      'usuario': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required)
    });
  }

  ngOnInit() {
  }

  async ingresar() {
    var f = this.formularioLogin.value;
    var usuarioStr = localStorage.getItem('usuario');
    

    if (usuarioStr) {
      var usuario = JSON.parse(usuarioStr);
      localStorage.setItem('nombreUsuario', usuario.nombre);
      if (usuario.usuario == f.usuario && usuario.password == f.password) {
        console.log('Ingresado');
        localStorage.setItem('ingresado', 'true');
        this.navCtrl.navigateRoot('principal');
        
      } else {
        const alert = await this.alertController.create({
          header: 'Datos incorrectos',
          message: 'Los datos que ingresaste no son correctos',
          buttons: ['Aceptar'],
        });

        await alert.present();
      }
    } else {
      const alert = await this.alertController.create({
        header: 'Datos no encontrados',
        message: 'No se encontraron datos de usuario en el almacenamiento local',
        buttons: ['Aceptar'],
      });

      await alert.present();
    }
  }
}
