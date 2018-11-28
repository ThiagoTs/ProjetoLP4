export class Usuario {
    id: number;
    nome: string;
    email: string;
    perfil: number;
    senha: string;

    constructor(){
        this.id = 0;
        this.nome = "";
        this.email = "";
        this.perfil = 0;
        this.senha = "";
    }
}