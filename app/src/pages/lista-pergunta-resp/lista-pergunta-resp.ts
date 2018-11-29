import { VisualizarPerguntaRespPage } from '../visualizar-pergunta-resp/visualizar-pergunta-resp';
import { Component, } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Pergunta } from '../../modules/pergunta';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CadastroPerguntaPage } from '../cadastro-pergunta/cadastro-pergunta';

/**
 * Generated class for the ListaPerguntaRespPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lista-pergunta-resp',
  templateUrl: 'lista-pergunta-resp.html',
})
export class ListaPerguntaRespPage {
  perguntas: Pergunta[];
  http : HttpClient;
  load;
  alert;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private _http: HttpClient,
    private _loadCtr: LoadingController,
    private _alert: AlertController
  ) {

    this.http = _http;
    this.load = _loadCtr.create(
      {content: "Carregando..."}
    );
    this.load.present();

    this.alert = _alert.create(
      {
        title:"Falha na Conexão",
        subTitle: "Não foi possível carregar lista de perguntas",
        buttons:[
            {text: 'OK'}
        ]
      }
    );
  }

  ionViewDidLoad() {
    
    this.http.get<Pergunta[]>("http://localhost:3000/pergunta")
      .subscribe(
        (users) =>{
          console.log(users);
          this.perguntas = users;
          this.load.dismiss();
        },
        (err: HttpErrorResponse) =>{
          this.load.dismiss();
          this.alert.present();
        }
      );
  }

  seleciona(user:Pergunta){
    this.navCtrl.push(VisualizarPerguntaRespPage.name,{perguntaSelecionada: user});
   
  }
 
 

}

