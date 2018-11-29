import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ListaUsuarioPage } from '../lista-usuario/lista-usuario';
import { CadastroPerguntaPage } from '../cadastro-pergunta/cadastro-pergunta';
import { ListaPerguntaRespPage } from '../lista-pergunta-resp/lista-pergunta-resp';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  listaUsuarios = ListaUsuarioPage;
  pergunta: boolean= false;
  cont: number = 0;
  constructor(public navCtrl: NavController) {

  };

  avancarListaUsuario(){
    this.navCtrl.push(ListaUsuarioPage.name);
  };
  mostrarLista(){
    if(this.cont==0){
      this.pergunta=true;
      this.cont = 1;
    }else{
      this.cont= 0;
      this.pergunta=false;
    }
    
  };

  cadastrarPergunta(){
    this.navCtrl.push(CadastroPerguntaPage.name);
  };
  listarPerguntas(){
    this.navCtrl.push(ListaPerguntaRespPage.name);
  };

}
