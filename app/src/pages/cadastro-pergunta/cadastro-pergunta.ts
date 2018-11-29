import { Resposta } from './../../modules/resposta';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Pergunta } from '../../modules/pergunta';
import { HttpClient } from '@angular/common/http';
import { CadastroDescricaoPerguntaPage } from '../cadastro-descricao-pergunta/cadastro-descricao-pergunta';

/**
 * Generated class for the CadastroPerguntaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastro-pergunta',
  templateUrl: 'cadastro-pergunta.html',
})
export class CadastroPerguntaPage {

  public resposta: Resposta;
  public aux2: boolean = false;

  private orderForm;

  public pergunta: Pergunta;
  public respostas: Resposta;
  private error = { condicao: false, message: '' };
  private success = { condicao: false, message: '' };


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpClient,

  ) {

    this.pergunta = new Pergunta();
    this.respostas = new Resposta();

    this.respostas = this.navParams.get('respostaSelecionada');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPerguntaPage');
  }


  ionViewWillEnter() {
    this.resposta = new Resposta;


    if (this.navParams.get('userBack')) {
      /** obtenho o parâmetro por meio do método get e inserio na lista pelo método push */

      var aux = this.navParams.get('userBack');
      this.resposta.label = aux.label;
      this.resposta.descricao = aux.descricao;
      this.resposta.condicao = aux.condicao;
     
      if(!this.validarRespota(this.resposta)){
        this.pergunta.respostas.push(this.resposta);
      }
    }
  }
  
  validarRespota(as: Resposta): boolean {
    if (this.aux2) {
      for (var i = 0; i < 5; i++) {
        if (as.label === 'a') {
          this.pergunta.respostas[i].label = this.resposta.label;
          this.pergunta.respostas[i].descricao = this.resposta.descricao;
          this.pergunta.respostas[i].condicao = this.resposta.condicao;
          return true;
        } else {
          if (as.label === 'b') {
            this.pergunta.respostas[i].label = this.resposta.label
            this.pergunta.respostas[i].descricao = this.resposta.descricao;
            this.pergunta.respostas[i].condicao = this.resposta.condicao;
            return true;
          } else {
            if (as.label === 'c') {
              this.pergunta.respostas[i].label = this.resposta.label
              this.pergunta.respostas[i].descricao = this.resposta.descricao;
              this.pergunta.respostas[i].condicao = this.resposta.condicao;
              return true;
            } else {
              if (as.label === 'd') {
                this.pergunta.respostas[i].label = this.resposta.label
                this.pergunta.respostas[i].descricao = this.resposta.descricao;
                this.pergunta.respostas[i].condicao = this.resposta.condicao;
                return true;
              } else {
                if (as.label === 'e') {
                  this.pergunta.respostas[i].label = this.resposta.label
                  this.pergunta.respostas[i].descricao = this.resposta.descricao;
                  this.pergunta.respostas[i].condicao = this.resposta.condicao;
                  return true;
                }
              }
            }
          }
        }

      }


    } else {
      return false;
    }
  }

  cadastroDescricaoA() {

    this.navCtrl.push(CadastroDescricaoPerguntaPage.name, { respostaSelecionada: this.respostas });




  }

  cadastroDescricaoB() {

    this.navCtrl.push(CadastroDescricaoPerguntaPage.name, { respostaSelecionada: this.resposta });

  }

  cadastroDescricaoC() {

    this.navCtrl.push(CadastroDescricaoPerguntaPage.name, { respostaSelecionada: this.resposta });

  }

  cadastroDescricaoD() {
    this.navCtrl.push(CadastroDescricaoPerguntaPage.name, { respostaSelecionada: this.resposta });

  }

  cadastroDescricaoE() {
    this.navCtrl.push(CadastroDescricaoPerguntaPage.name, { respostaSelecionada: this.resposta });

  }


  validarDados() {

  }


  verficaSalvarEditar() {
    this.error.condicao = false;
    this.validarDados();

    if (!this.error.condicao) {

      if (this.pergunta.id) {
        this.editar();
      }
      else {
        this.salvar();
      }
    }
  }

  salvar() {
    this.http.post("http://localhost:3000/pergunta_resposta",
      this.pergunta
    ).subscribe(res => {

      this.error.condicao = false;
      this.error.message = 'Falha';
      this.success.condicao = true;
      this.success.message = "Criado com sucesso"
      this.navCtrl.pop();
    }, (err) => {
      console.log(err);
    });
  }

  editar() {

  }

}


