
module.exports = function(app){

    app.post('/pergunta', function(req, resp){
        /**Propriedade que permite manipular o body da requisição */
        data = req.body;
    
        /**objetos quer me permite conectar no banco e maninpular as operações */
        var con = app.persistencia.connectionFactory;
        var dao = new app.persistencia.perguntaDAO(con);
    
        /**
         * valida se os dados estão corretos conforme regra de negócio
         */
        var service = new app.services.perguntaService();
        response = service.validarDados(data);
        if(!response.status){
            resp.status(400);
            resp.json({"message": response.message});   
            return;
        }
    
        /**função assíncrona, como não sabemos quanto tempo irá demorar a conexão com banco. 
         * É importante que as operações sejam assíncronas. O quer dizer que a função create
         * será realizada, porém não será aguardado um retorno, as rotinas irão continuar sem 
         * um retorno de create, por isto tempos a função anônima passada no segundo parâmetro 
         * que é responsável por manipular o retorno da fução assíncrona. 
         */
        data.deletado = 0;
        dao.create(data, function(exception, result){
            if(exception){
    
                /**
                 * verifica se a exceção é de chave única duplicada, no qual email se enquadra 
                 * na exceção
                 */
                if(exception.code === 'ER_DUP_ENTRY'){
                    resp.status(400);
                    resp.send({"mensagem":"Pergunta já cadastrada"});
                    return;
                }
                /**
                 * error genéricos
                 */
                resp.status(500);
                resp.send({"mensagem":"erro ao salvar a pergunta"});
                console.log(exception);
                return;
            }
    
            /**
             * sucesso no cadastro
             */
           resp.status(201);
           resp.send(data);
        });
    });
}