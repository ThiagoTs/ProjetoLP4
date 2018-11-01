import { Usuario } from './../../modules/usuario';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the VisualizarUsuarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-visualizar-usuario',
  templateUrl: 'visualizar-usuario.html',
})
export class VisualizarUsuarioPage {

  usuario: Usuario;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams
    ) { 
        this.usuario = this.navParams.get('usuarioSelecionado');
        console.log(this.usuario);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VisualizarUsuarioPage');
  }

}
