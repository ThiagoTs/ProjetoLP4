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

  /**atributos que iremos usar no nosso controlller */
  private orderForm;
  public usuario: Usuario;
  public usuarioBackup: Usuario;
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
    if(this.navParams.get('usuarioSelecionado')){
      this.usuario = this.navParams.get('usuarioSelecionado');
    }

  }

  /**Ao clicar no botão do formulário, se o usuário tiver id o usuário existe
   * então vamos alterar, se o id não existir, apenas salva o usuário. Isto é 
   * para reutilizar o formulário e nao ser necessário criar nova página.
   */
  verficaSalvarEditar(){
    this.error.condicao = false;
    this.validarDados();
    
    if(!this.error.condicao){
      this.usuario.senha = this.senha;

      if(this.usuario.id){
        this.editar();
        }
        else{
          this.salvar();
        }
    }
  }

  /**valida os dados de usuário */
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

  /**
   * método que faz uma chamada ao servidor por meio do recurso /usuario e o verbo post
   * desta forma o usuário é cadastrado.
   */
  salvar(){
    this.http.post("http://localhost:3000/usuario", 
      this.usuario
        ).subscribe(res => {
          // console.log(res);
          this.error.condicao = false;
          this.error.message = '';
          this.success.condicao = true;
          this.success.message = "Criado com sucesso"
          this.navCtrl.pop();
        }, (err) => {
          console.log(err);
        });
  }

  /**
   * Quando página está sendo encerrada, este método é executado, 
   * Assim permite eu pegar os dados do usuário cadastro e enviar para inserir na lista
   * sem necessidade de ir no servidor novamente.
   */
  ionViewWillLeave() {  
    this.navCtrl.getPrevious().data.userBack = this.usuario;
   }

  /**
   * método que faz uma chamada ao servidor por meio do recurso /usuario e o verbo put
   * desta forma os dados do usuaŕio já cadastrado é alterado.
   */
  editar(){
    this.http.put("http://localhost:3000/usuario/" + this.usuario.id, 
      this.usuario
        ).subscribe(res => {
          console.log(res);
          this.error.condicao = false;
          this.error.message = '';
          this.success.condicao = true;
          this.success.message = "Criado com sucesso"
          this.usuario = new Usuario();
          
        }, (err) => {
          console.log(err);
        });
  }

}