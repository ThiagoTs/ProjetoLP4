import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, Button } from 'ionic-angular';
import { Usuario } from '../../modules/usuario';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { CadastroUsuarioPage } from '../cadastro-usuario/cadastro-usuario';
import { VisualizarUsuarioPage } from '../visualizar-usuario/visualizar-usuario';

/**
 * controller responsável pela listagem de usuário
 */

@IonicPage()
@Component({
  selector: 'page-lista-usuario',
  templateUrl: 'lista-usuario.html',
})
export class ListaUsuarioPage {

  /**atributos da página */
  usuarios: Usuario[];
  http : HttpClient;
  load;
  alert;

  constructor(
    public navCtrl: NavController, /** objeto que permite manipular as navegações e páginas do ionic */
    public navParams: NavParams, /** permite obter os parâmetro vindos de outras páginas */
    private _http: HttpClient, /** Objeto que lida com as requisições http ao servidor (api) */
    private _loadCtr: LoadingController /** permite criar um loading para informar ao cliente carregando lista*/,
    private _alert: AlertController /** objeto para construir componentes alertas */
  ) {

    /**objeto http responsável por efetuar as requisições ao backend (api) */
    this.http = _http;
    /**loader que apresenta ao usuário que a listagem está sendo carregada, assim o usuário não fica esperando  */
    this.load = _loadCtr.create(
      {content: "Carregando..."}
    );
    /**o método presente permite mostrar o componente craido load */
    this.load.present();

    /**cria-se um novo componente alerta para informar que houve falha de conexão */
    this.alert = _alert.create(
      {
        title:"Falha na Conexão",
        subTitle: "Não foi possível carregar lista de usuários",
        buttons:[
            {text: 'OK'}
        ]
      }
    );
  }

  /** 
   * Primeiro método executado quando a paǵina é carregada na pilha de execução.
   * Este método é executado apenas uma única vez. Só é executado novamente quando a página é carregada novamente. 
   * Quando é executado pop em uma página subsequente, volta-se para esta página, porém, este método não é carregado novamente. 
  */
  ionViewDidLoad() {

    /**
     * Método que vai ao servidor por meio do método GET e o recurso /usuario 
     * Por default, é retornado uma lista de objetos, e eu faço parse da lista por meio do <Usuario[]>, desta forma eu tenho uma
     * lista de Usuário.
     * Tenho o subscribe, com as promessas, se deu tudo certo e eu tenho uma lista de usuários. Ou retorna exceção, e eu tenho 
     * o HttpErrorResponse. 
     * */
    this.http.get<Usuario[]>("http://localhost:3000/usuario")
      .subscribe(
        (users) => {
          
          //insere usuários na lista de usuários, desta forma, vai aparecer na página html
          this.usuarios = users;

          //esconde loader para mostrar ao usuaŕio o alerta de carregando listagem
          this.load.dismiss();
        },
        (err: HttpErrorResponse) => {

          //esconde loader para mostrar ao usuaŕio o alerta de carregando listagem
          this.load.dismiss();

          //mostra alerta de erro, que houve problemas ao carregar lista de usuários
          this.alert.present();
        }
      );
  }

  /** avança para a página cadastrar usuário */
  avancarCadastroUsuario(){
    this.navCtrl.push(CadastroUsuarioPage.name)
  }

  /**avança para a página  */
  seleciona(user : Usuario){

    /** 
     * Existe um segundo parâmetro na fução push que permite eu passar dados e objetos para uma página a ser chamada na pilha. 
     * a próxima pagina VisualizarUsuarioPage irá receber um parâmetro chamado usuarioSelecionado com os dados do usuário selecionado
     * no bind (on click)
     * */
    this.navCtrl.push(VisualizarUsuarioPage.name, {
      usuarioSelecionado: user
    });
  }

  /**  
   *  Este método é executado quando esta página volta a ser ativa. Quando se chama outra página, como o que acontece na avança cadastro ou
   * seleciona, esta página entra em segundo plano e fica desativada. Quando a página seguinte é finalizada, este método é executado. 
  */
  ionViewWillEnter() {
    
    /** 
     * Na página cadastro de usuário, após cadastrar um usuário, eu seto um parâmetro userBack com os dados do usuaŕio cadastrado. Ou seja, se
     * este parâmetro existe, quer dizer que houve um usuário novo cadastrado, então vou inserir este novo usuaŕio na lista de usuários. 
     * Assim eu não preciso ir no servidor requerir uma nova listagem pq o usuaŕio foi cadastrado.
    */
    if(this.navParams.get('userBack')){
      /** obtenho o parâmetro por meio do método get e inserio na lista pelo método push */
      var userBack = this.navParams.get('userBack');
      this.usuarios.push(userBack);
      console.log('back');
    }

    /**
     * Na página de visualizar usuário, é possível excluir um usuário, se eu excluo, eu crio um parâmetro chamado idExcluirUser contendo o id do
     * usuário deletado. Desta forma eu consigo remover da lista, o usuário deletado, sem necessidade de requerer nova ida ao servidor
     */
    if(this.navParams.get('idExcluirUser')){

      /**obtenho o id do usuario deletado */
      var idExcluirUser = this.navParams.get('idExcluirUser');

      /** uso o método filter da minha lista, para retornar os objetos que tiverem id diferente do id de retorno*/
      this.usuarios = this.usuarios.filter(function(obj){
        return obj.id !== idExcluirUser;
      });
    }
  }

}
