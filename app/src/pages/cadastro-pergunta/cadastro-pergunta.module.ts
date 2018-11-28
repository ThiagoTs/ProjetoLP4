import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroPerguntaPage } from './cadastro-pergunta';

@NgModule({
  declarations: [
    CadastroPerguntaPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastroPerguntaPage),
  ],
})
export class CadastroPerguntaPageModule {}
