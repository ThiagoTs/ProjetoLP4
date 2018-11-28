import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Usuario } from '../../modules/usuario';
import { HttpClient } from '@angular/common/http';
import { CadastroUsuarioPage } from '../cadastro-usuario/cadastro-usuario';

/**
 * Controller responsável por visualizar os dados de usuário e escolha
 * de ações
 */

@IonicPage()
@Component({
  selector: 'page-visualizar-usuario',
  templateUrl: 'visualizar-usuario.html',
})
export class VisualizarUsuarioPage {

  /**atributos da página */
  private usuario : Usuario;
  private _isExcluir: boolean;
  load;
  conteudoAlert = {titulo:'', mensagem:''}

  constructor(
    public navCtrl: NavController, /** objeto que permite manipular as navegações e páginas do ionic */
    public navParams: NavParams, /** permite obter os parâmetro vindos de outras páginas */
    private _http: HttpClient, /** Objeto que lida com as requisições http ao servidor (api) */
    private _loadCtr: LoadingController /** permite criar um loading para informar ao cliente carregando lista*/,
    private _alertCtrl: AlertController /** objeto para construir componentes alertas */
  ) {

    this._isExcluir = false;
    this.usuario = this.navParams.get('usuarioSelecionado');
    this.load = _loadCtr.create(
      {content: "Carregando..."}
    );

  }

  /**
   * função executada ao clicar no botão de excluir que tem o bind
   */
  confirma() {
    /** Definição do compontente */
    let alert = this._alertCtrl.create({
      title: 'Excluir Usuário',
      message: 'Você tem certeza que deseja excluir este usuário?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Excluir',
          handler: () => {
            /**
             * caso confirme excluir, o alerta irá desaparecer e executar
             * a função excluir
             */
            alert.dismiss;
            this.excluir();
          }
        }
      ]
    });
    /** exibe o alerta de confirmar exclusão do usuário */
    alert.present();
  }

  /**
   * Após confirmar que realmente quer excluir o usuário, este método
   * será executado
   */
  excluir(){
    /**
     * carrega load apresentando ao usuário que uma ação está sendo executada 
     * portanto o usuário deve aguardar
    */
    this.load.present();

    /**
     * seta atributo que a ação execuada é uma exclusão
     */
    this._isExcluir = true;
    
    /**
     * Método que chama o recurso /usuário com id do usuário fazendo uso
     * do verbo delete. Retorna message de sucesso ou exceção
     */
    this._http.delete("http://localhost:3000/usuario/" + this.usuario.id)
    .subscribe(
      (message) => {
        /** Esconde o alerta de carregando */
        this.load.dismiss();

        /**Chama o alerta final para apresentar que foi excluído com sucesso  */
        this.alertFinal();
        this.conteudoAlert.mensagem = "Deletado";
        this.conteudoAlert.titulo = "Deletado com sucesso"
      },
      (err) => {
        this._isExcluir = false;
        console.log(err);

        this._alertCtrl.create(
          {
            title:"Falha ao deletar usuário",
            subTitle: "Não foi possível deletar usuário, entre em contato com suporte.",
            buttons:[
                {text: 'OK'}
            ]
          }
        ).present();
        this.load.dismiss();
      }
    );
  }

  /**
   * Quando página está sendo encerrada, este método é executado, 
   * Assim permite eu verificar se houve uma exclusão, e eu envio
   * para a página de listagem o id do usuário excluído, assim
   * o usuário pode ser removido da listagem, sem necessidade de ir
   * ao servidor (api)
   */
  ionViewWillLeave() {  
    if(this._isExcluir){
      /**permite eu enviar a página anterior um valor  idExcluirUser contendo
       * o id do usuário excluído
      */
      this.navCtrl.getPrevious().data.idExcluirUser = this.usuario.id;
    }
   }

   /**
    * Alerta final que apresenta que o usuário foi excluído com sucesso
    */
  alertFinal() {
    /**configuração do alerta */
    let alert = this._alertCtrl.create({
      title: "Sucesso",
      subTitle: "Excluído com sucesso!",
      buttons: [
        {
          text: 'Fechar',
          handler: () => {
            /**encerra página, pq usuário foi excluído */
            this.navCtrl.pop();
          }
        }
      ]
    });

    /**mostra o alerta definido */
    alert.present();
  }

  /**
   * Ao clicar para editar os dados do usuário eu carrego o usuário
   * e chamo a página CadastroUsuarioPage e envio um usuário, assim
   * permita que eu reutilize o formulário de cadastro de usuário 
   * para editar os dados, sem necessidade de recriar um novo formulário
   * 
   * */
  editar(){
    /**chama nova página por meio do push, e envia os dados do usuário */
    this.navCtrl.push(CadastroUsuarioPage.name, {
      usuarioSelecionado: this.usuario
    });
  }

}
