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

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPerguntaPage');
  }


  ionViewWillEnter() {
    this.resposta = new Resposta;


    if (this.navParams.get('userBack')) {
      /** obtenho o parâmetro por meio do método get e inserio na lista pelo método push */

      var newResp = this.navParams.get('userBack');
      this.resposta.label = newResp.label;
      this.resposta.descricao = newResp.descricao;
      this.resposta.condicao = newResp.condicao;

     
     
      if(!this.setaRespostas(this.resposta)){
        //this.pergunta.respostas.push(this.resposta);
        console.log('Setei');
      }
    }
  }
  
  setaRespostas(resp: Resposta): boolean {

    console.log(resp.condicao, resp.descricao, resp.label);
    this.pergunta = new Pergunta;
    
      for (var i = 0; i < 5; i++) {
        if (resp.label === 'a') {

          this.pergunta.respostas[i].label = this.resposta.label;
          this.pergunta.respostas[i].descricao = this.resposta.descricao;
          this.pergunta.respostas[i].condicao = this.resposta.condicao;
          console.log(this.pergunta.respostas[i].label)
          return true;
        } else {
          if (resp.label === 'b') {
            console.log('entrei aqui');
            this.pergunta.respostas[i].label = this.resposta.label
            this.pergunta.respostas[i].descricao = this.resposta.descricao;
            this.pergunta.respostas[i].condicao = this.resposta.condicao;
            return true;
          } else {
            if (resp.label === 'c') {
              this.pergunta.respostas[i].label = this.resposta.label
              this.pergunta.respostas[i].descricao = this.resposta.descricao;
              this.pergunta.respostas[i].condicao = this.resposta.condicao;
              return true;
            } else {
              if (resp.label === 'd') {
                this.pergunta.respostas[i].label = this.resposta.label
                this.pergunta.respostas[i].descricao = this.resposta.descricao;
                this.pergunta.respostas[i].condicao = this.resposta.condicao;
                return true;
              } else {
                if (resp.label === 'e') {
                  this.pergunta.respostas[i].label = this.resposta.label
                  this.pergunta.respostas[i].descricao = this.resposta.descricao;
                  this.pergunta.respostas[i].condicao = this.resposta.condicao;
                  return true;
                } else{
                  return false;
                }
              }
            }
          }
        }

      }
  }


  cadastroDescricaoA() {
    this.respostas = new Resposta;
    this.respostas.label = "a"
    this.navCtrl.push(CadastroDescricaoPerguntaPage.name, { respostaSelecionada: this.respostas });

  }

  cadastroDescricaoB() {
    this.respostas = new Resposta;
    this.respostas.label = "b"
    this.navCtrl.push(CadastroDescricaoPerguntaPage.name, { respostaSelecionada: this.respostas });
     
  }

  cadastroDescricaoC() {
    this.respostas = new Resposta;
    this.respostas.label = "c"
    this.navCtrl.push(CadastroDescricaoPerguntaPage.name, { respostaSelecionada: this.respostas });

  }

  cadastroDescricaoD() {
    this.respostas = new Resposta;
    this.respostas.label = "d"
    this.navCtrl.push(CadastroDescricaoPerguntaPage.name, { respostaSelecionada: this.respostas });

  }

  cadastroDescricaoE() {
    this.respostas = new Resposta;
    this.respostas.label = "e"
    this.navCtrl.push(CadastroDescricaoPerguntaPage.name, { respostaSelecionada: this.respostas });

  }

  validarDados() {
      
    if(this.pergunta.respostas.length < 5){
      this.error.condicao = true;
      this.error.message = 'Não estão preenchido todas as respostas'

    }
    if(!this.pergunta.pergunta){
      this.error.condicao = true;
      this.error.message = 'A descrição da pergunta não está preenchida'
    }
    if(!this.pergunta.categoria){
      this.error.condicao = true;
      this.error.message = 'A categoria não está preenchida'
    }
  }


  verificaSalvar() {
    this.error.condicao = false;
    this.validarDados();

    if (!this.error.condicao) {

        this.salvar();
    }else{
      console.log("Falha ao salvar");
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

  

}


