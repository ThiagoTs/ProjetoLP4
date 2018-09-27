class usuarioDAO{
    constructor(connection){
        this._con = connection;
    }

    /**
     * @param pergunta_resposta - perguntas e resposta a cadatrar
     * @param callback - resposta de retorno
     */

     create(perguntas,callback){
         try {
            this._con.querry('INSERT INTO pergunta_resposta set ?', perguntas, callback) 
         } catch (error) {
             console.log(error);
         }
     }
     findAll(callback){
         try {
            this._con.query('SELECT * FROM perguntas_resposta ', callback);
         } catch (error) {
             
         }
     }
}