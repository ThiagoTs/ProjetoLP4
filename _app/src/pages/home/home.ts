import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ListaUsuarioPage } from '../lista-usuario/lista-usuario';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
//CONTROLER DA HOME


  listaUsuarios = ListaUsuarioPage;
  constructor(public navCtrl: NavController) {

  }
  avancarListaUsuario(){
    this.navCtrl.push(ListaUsuarioPage.name);
  }

}
