class usuarioDAO{
    constructor(connection){
        this._con = connection;
    }

    /**
     * @param perguntas - perguntas a cadatrar
     * @param callback - resposta de retorno
     */

     create(perguntas,callback){
         try {
            this._con.querry('INSERT INTO perguntas set ?', perguntas, callback) 
         } catch (error) {
             console.log(error);
         }
     }
     findAll(callback){
         try {
            this._con.query('SELECT * FROM perguntas ', callback);
         } catch (error) {
             
         }
     }
}