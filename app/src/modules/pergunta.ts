import { Resposta } from "./resposta";

export class Pergunta {
  
    id: number;
    pergunta: string;
    respostas: Resposta[]; //Para a lista de resposta
    categoria : string;
   
    constructor(){
        this.id = 0;
        this.pergunta = '';
        this.categoria = '';
        this.respostas = [];
    }
}