import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Pergunta } from '../../modules/pergunta';
import { HttpClient } from '@angular/common/http';
import { CadastroPerguntaPage } from '../cadastro-pergunta/cadastro-pergunta';

@IonicPage()
@Component({
  selector: 'page-visualizar-pergunta-resp',
  templateUrl: 'visualizar-pergunta-resp.html',
})
export class VisualizarPerguntaRespPage {
 perguntas : Pergunta;
 load;

  conteudoAlert = {titulo:'', mensagem:''}
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _alertCtrl: AlertController,
    private _loadCtr: LoadingController,
    private _http: HttpClient
  ){
    this.perguntas = this.navParams.get('perguntaSelecionada');
    this.load = _loadCtr.create(
      {content: "Carregando..."}
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VisualizarPerguntaRespPage.name,'+'respostas');
  }

  editar(){
    this.navCtrl.push(CadastroPerguntaPage.name, {
      perguntaSelecionada: this.perguntas
    });
  }

  confirmaExcluir() {
    let alert = this._alertCtrl.create({
      title: 'Excluir Pergunta',
      message: 'Você tem certeza que deseja excluir esta pergunta?',
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
            alert.dismiss;
            this.excluir();
          }
        }
      ]
    });
    alert.present();
  }

  excluir(){
    this.load.present();
    console.log("http://localhost:3000//" + this.perguntas.id);
    this._http.delete("http://localhost:3000/pergunta/" + this.perguntas.id)
    .subscribe(
      (message) => {
        console.log(message);
        this.load.dismiss();
        this.alertFinal();
        this.conteudoAlert.mensagem = "Deletado";
        this.conteudoAlert.titulo = "Deletado com sucesso"
      },
      (err) => {
        console.log(err);
      }
    );
  }

  alertFinal() {
    let alert = this._alertCtrl.create({
      title: "Sucesso",
      subTitle: "Excluído com sucesso!",
      buttons: [
        {
          text: 'Fechar',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }

}

