import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VisualizarUsuarioPage } from './visualizar-usuario';

@NgModule({
  declarations: [
    VisualizarUsuarioPage,
  ],
  imports: [
    IonicPageModule.forChild(VisualizarUsuarioPage),
  ],
})
export class VisualizarUsuarioPageModule {}
