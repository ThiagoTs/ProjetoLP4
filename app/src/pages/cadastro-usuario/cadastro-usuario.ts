import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Usuario } from '../../modules/usuario';
import { HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-cadastro-usuario',
  templateUrl: 'cadastro-usuario.html',
})
export class CadastroUsuarioPage {

  private orderForm;
  public usuario: Usuario;
  private senha: string;
  private senha_confirma:string;
  private error = { condicao: false, message:''};
  private success = { condicao: false, message: ''};

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public http: HttpClient,
  ) {
    this.usuario = new Usuario();
  }

  salvar(){
    this.error.condicao = false;
    this.validarDados();
    console.log(this.error.condicao);
    
    if(!this.error.condicao){
      this.usuario.senha = this.senha;

      this.http.post("http://localhost:3000/usuario", 
      this.usuario
        ).subscribe(res => {
          console.log(res);
          this.error.condicao = false;
          this.error.message = '';
          this.success.condicao = true;
          this.success.message = "Criado com sucesso"
          this.usuario = new Usuario();
          this.senha = "";
          this.senha_confirma = "";
          
        }, (err) => {
          console.log(err);
        });

    }
  }

  validarDados(){
    if(!this.usuario.nome){
      this.error.condicao = true;
      this.error.message = "Nome, campo obrigatório!";
    }

    if(!this.usuario.email){
      this.error.condicao = true;
      this.error.message = "Email, campo obrigatório!";
    }

    if(!this.senha || !this.senha_confirma){
      this.error.condicao = true;
      this.error.message = "Senha e confirma senha, campos obrigatórios!";
    }

    if(this.senha !== this.senha_confirma){
      this.error.condicao = true;
      this.error.message = "Senha e confirma senha devem ser iguais";
    }

    if(!this.usuario.perfil){
      this.error.condicao = true;
      this.error.message = "Perfil, campo obrigatório!";
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroUsuarioPage');
  }

}