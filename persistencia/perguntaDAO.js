class perguntaDAO{
    constructor(connection){
        this._con = connection;
    }

    /**
     * @param pergunta_resposta - perguntas e resposta a cadatrar
     * @param callback - resposta de retorno
    */

        create(pergunta_resposta,callback){
            try {
                this._con.query('INSERT INTO pergunta_resposta set ?', pergunta_resposta, callback) 
            } catch (error) {
                console.log(error);
            }
        }
    /**
     * Busca todos as perguntas cadastradas
     * @param callback - função de retorno
     */
    
    findAll(callback){
        try {
            this._con.query('SELECT * FROM pergunta_resposta where deletado = 0', callback);
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Busca a pergunta_resposta a partir do id passado na requisição
     * @param id - id da pergunta_resposta
     * @param callback - função de retorno 
    */

    findById(id, callback){
        try {
            this._con.query('SELECT * FROM pergunta_resposta where pergunta_resposta.id = ? and deletado = 0', id, callback);
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Altera os dados do pergunta_resposta a partir do id passado por parâmetro
     * @param id - id do pergunta_resposta que será alterado
     * @param pergunta_resposta - dados do pergunta_resposta que serão persistido no banco 
     * @param callback - função de retorno 
     */

    update(id, pergunta_resposta, callback){
        try{
            this._con.query('UPDATE pergunta_resposta SET ? WHERE id = ?', [pergunta_resposta, id], callback);
        } catch(error){
            console.log(error);
        }
    }

     /**
     * 
     * @param id - id do pergunta_resposta que será excluído logicamente 
     * @param callback - função assíncrona 
     */
    delete(id, callback){
        try{
            this._con.query('UPDATE pergunta_resposta SET deletado = 1 WHERE id = ? ', id, callback);
        } catch(error){
            console.log(error);
        }
    }
}
/**
 * Expõem o módulo para outros módulos
 */
module.exports = function(){
    return perguntaDAO;
}