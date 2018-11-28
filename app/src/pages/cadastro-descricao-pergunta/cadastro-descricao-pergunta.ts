import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Pergunta } from '../../modules/pergunta';
import { HttpClient } from '@angular/common/http';
import { CadastroPerguntaPage } from '../cadastro-pergunta/cadastro-pergunta';
import { Resposta } from '../../modules/resposta';

/**
 * Generated class for the CadastroDescricaoPeguntaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastro-descricao-pergunta',
  templateUrl: 'cadastro-descricao-pergunta.html',
})
export class CadastroDescricaoPerguntaPage {

  public pergunta: Pergunta;
  public resposta: Resposta[];
  public respostas: Resposta;
 
  load;
  conteudoAlert = {titulo:'', mensagem:''}

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpClient,
  
    private _loadCtr: LoadingController /** permite criar um loading para informar ao cliente carregando lista*/,
    private _alertCtrl: AlertController /** objeto para construir componentes alertas */
    ) 
    {
      this.respostas = new Resposta();
      this.respostas = this.navParams.get('respostaSelecionada')
    this.load = _loadCtr.create(
      {content: "Carregando..."}
    );
    
  }

  ionViewDidLoad() {
   // console.log('ionViewDidLoad CadastroDescricaoPerguntaPage');
  }
 
  ok(){
    

    this.navCtrl.getPrevious().data.userBack;
    this.navCtrl.pop();
   // console.log(this.respostas);

    
  }

  

  
  ionViewWillLeave() {  
    this.navCtrl.getPrevious().data.userBack = this.respostas;
  
   }


}
