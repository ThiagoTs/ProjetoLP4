class usuarioService{

    constructor(){ }

    /**
     *  valida se os dados de usuário são válidos conforme regra de negócio
     * @param data - dados do usuário 
     */
    validarDados(data){
        if(!data.nome){
            return {status: false, message: "nome Obrigatório"};
        }

        if(!data.email){
            return {status: false, message: "email Obrigatório"};
        }

        if(!data.senha){
            return {status: false, message: "senha Obrigatório"};
        }

        if(!data.perfil){
            return {status: false, message: "perfil Obrigatório"};
        }

        return {status: true};
    };
};
module.exports = function(){
    return usuarioService;
}