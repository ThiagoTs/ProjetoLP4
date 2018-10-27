import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Usuario } from '../../modules/usuario';

/**
 * Generated class for the CadastroUsuarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastro-usuario',
  templateUrl: 'cadastro-usuario.html',
})
export class CadastroUsuarioPage {

  private usuario: Usuario;
  private senha: string;
  private confirmaSenha: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _http: HttpClient

  ) {
    this.usuario = new Usuario();
    this.senha = "";
    this.confirmaSenha = "";
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroUsuarioPage');
  }
  salvar(){
    console.log(this.usuario);
    this.usuario.senha = this.senha;

    this._http.post("http://localhost:3000/usuario",this.usuario)
    .subscribe(
      res => {
        console.log(res);
      }
      
    );
  }

}
