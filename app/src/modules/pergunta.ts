import { Resposta } from "./Resposta";

export class Pergunta {
    id: number;
    pergunta: string;
    respostas: Resposta[];
    categoria: number;

    constructor(){
        this.id = 0;
        this.pergunta = '';
        this.categoria = 0;
    }
}