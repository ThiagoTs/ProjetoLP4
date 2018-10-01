
module.exports = function(app){

    /** GET /usuario
     *  rota que obtém lista de usuários (find all)
     */
    app.get('/pergunta', function(req, resp){
        var con = app.persistencia.connectionFactory;
        var dao = new app.persistencia.perguntaDAO(con);
        dao.findAll(function(exception, result){
            if(exception){
                resp.status(500);
                resp.send({"message":"Error inesperado"});
                return;
            }

            if(result.length == 0){
                resp.status(404);
                resp.send({"message":"pergunta não encontrada"});
                return;
            }

            /**
             * exceção genérica
             */
            if(exception){
                resp.status(500);
                resp.send({"mensagem":"erro ao buscar pergunta"});
                console.log(exception);
                return;
            }

            var service = new app.services.perguntaService();
            var dados = service.JsonGet(result);

            resp.status(200);
            resp.send(dados);
        });
    });

    /** GET /usuario:id
     *  rota que obtém um único usuário pelo id passado por parâmetro (find by id)
     *  quando queremos definir um parâmetro definimos :id, assim, o que vier na rota /usuario/2 o 2 é o id de um usuário
     */
    app.get('/usuario/:id', function(req, resp){
        var data = req.params;
        var con = app.persistencia.connectionFactory;
        var dao = new app.persistencia.usuarioDAO(con);

        /**
         * função assíncrona para obter o usuário pelo id
         */
        dao.findById(data.id, function(exception, result){
            
            /** 
             * tratamento se result vier vazio, quer dizer que não foi encontrado 
             *  nenhum usuário, assim retorna 404, código http para não encontrado
            */
            if(result.length == 0){
                resp.status(404);
                resp.send({"message":"usuario não encontrado"});
                return;
            }

            /**
             * exceção genérica
             */
            if(exception){
                resp.status(500);
                resp.send({"mensagem":"erro ao buscar usuário"});
                console.log(exception);
                return;
            }

            /**
             * se usuário é encontrado, retorna a posição 0, pq como buscamos pelo id, deve ter apenas um usuário
             */
            resp.send(result[0]);
        });
        
    });
    
    /** POST /pergunta 
     *  rota que permite criar uma nova pergunta
    */
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
        }else{
            data.respostas = JSON.stringify(data.respostas);
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

    /** PUT /usuario 
     *  rota que permite alterar um usuário pelo id
    */
   app.put('/usuario/:id', function(req, resp){

    /**
     * o put temos tanto o parâmetro que é o id do usuário, quanto elementos no corpo da requisição com os dados novos
     */
    var param = req.params;
    var novo = req.body;

    var con = app.persistencia.connectionFactory;
    var dao = new app.persistencia.usuarioDAO(con);

    /**
     * primeiro passo na alteraçaõ do usuário é buscar o usuário pelo id
     */
    dao.findById(param.id, function(exception, result){

        /**
         * verifica se houve alguma exception, se houver, retorna 500, código http para erro
         */
        if(exception){
            resp.status(500);
            resp.send({"mensagem":"erro ao salvar usuário"});
            console.log(exception);
            return;
        }
        
        /**
         * se result vazio mensagem de usuário não encontrado junto com código http 404
         */
        if(result.length == 0){
            resp.status(404);
            resp.send({"message":"usuario não encontrado"});
            return;
        }

        /**
         * dados do usuário são alterados, observação: a partir do usuário já registrado no banco, antigo, alteramos
         * os atributos que vieram na request (novo), desta forma, garantimos que um usuário existente está sendo alterado
         */
        antigo = result[0];
        antigo.nome = novo.nome;
        antigo.email = novo.email;
        antigo.senha = novo.senha;


        /**
         * Passo 2, alteramos os dados do usuário por meio de uma função assíncrona de update no banco
         */
        dao.update(param.id, antigo, function(exception, result){

            /**
             * verifica se a exceção é de chave única duplicada, no qual email se enquadra 
             * na exceção
             */
            if(exception){
                if(exception.code === 'ER_DUP_ENTRY'){
                    resp.status(400);
                    resp.send({"mensagem":"Email já cadastrado"});
                    return;
                }

                resp.status(500);
                resp.send({"mensagem":"erro ao alterar usuário"});
                console.log(exception);
                return;
            }

            resp.send({"messagem":"alterado com sucesso"});
        });
        
    });
});

/** DELETE /usuario 
 *  rota que permite deletar um usuário existente
*/
app.delete('/pergunta/:id', function(req, resp){
    dado = req.params;
    var con = app.persistencia.connectionFactory;
    var dao = new app.persistencia.perguntaDAO(con);

    /**
     * primeira fase: buscar dados 
     */
    dao.findById(dado.id, function(exception, result){
        if(exception){
            resp.status(500);
            resp.send({"mensagem":"erro ao alterar pergunta"});
            console.log(exception);
            return;
        }
        
        /**
         * Verifica se usário existe
         */
        if(!result || result.length == 0){
            resp.status(404);
            resp.send({"message":"pergunta não encontrada"});
            return;
        }
        /** deleção lógica */
        dao.delete(dado.id, function(exception, result){
            /**
             * se houver exceção joga exceção
             */
            if(exception){
                resp.status(500);
                resp.send({"mensagem":"erro ao deletar pergunta"});
                console.log(exception);
                return;
            }

            /**
             * se ocorreu tudo bem
             */
            resp.status(200);
            resp.send({"message":"Deletada com sucesso"});
        });
    })

})
}