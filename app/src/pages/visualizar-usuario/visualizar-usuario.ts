import { HttpClient } from '@angular/common/http';
import { Usuario } from './../../modules/usuario';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

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
    public navParams: NavParams,
    private _alertCtrl: AlertController,
    private _http: HttpClient
    ) { 
        this.usuario = this.navParams.get('usuarioSelecionado');
        console.log(this.usuario);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VisualizarUsuarioPage');
  }
  confirmar() {
    let alert = this._alertCtrl.create({
      title: 'Confirma Exclusão',
      message: 'Você realmente deseja excluir este usuário?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Excluir',
          handler: () => {
            console.log('Buy clicked');
            this.excluir();
            
          }
        }
      ]
    });
    alert.present();
  }
  excluir() {
    this._http.delete("http://localhost:3000/usuario/"+
    this.usuario.id).subscribe(
      (message) =>{
        console.log(message);
      },
      (err) => {
        console.log(err);
      }
    );
    
  }

}
