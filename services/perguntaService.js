class perguntaService{
    constructor(){}

    JsonGet(data){
        for(var i=0; i < data.length; i++){
            data[i].respostas = JSON.parse(data[i].respostas); 
        }

        return data;
    }

    validarPerguntas(data) {
        var teste = 0 ;
        var alternativas = ['a','b','c','d','e'];
        
        

        // Verificar se existe letras duplicadas ou sem ordem
        for (var i=0; i<5;i++){
            if(data.respostas[i].label != alternativas[i]){
                return {status: false , message: 'A ordem das alternativas estão incorretas ou duplicadas'};
            }
        }
         //Verificar se a descrição estava vazia
         for (var i=0; i<5;i++){
            if(data.respostas[i].descricao = ''){
                teste++;
            }if(teste>=1){
                return {status: false , message: "Descrição esta vazia"};
            }
        }

         //Verificar se a condição estava vazia
         for (var i=0; i<5;i++){
             teste=0;
            if(data.respostas[i].condicao = ''){
                teste++;
            }if(teste>=1){
                return {status: false , message: "A condição esta vazia"};
            };
        }

        //Verificar se está true or false
        /*
        for (var i=0; i<5;i++){
           if(data.respostas[i].condicao != 'true' || data.respostas[i].condicao != 'false' ){
               return {status: false , message: "A condição deve ser true ou false" };
            }
        }*/

        //Verificar se existe mais de uma resposta true
        for (var i=0; i<5;i++){
            teste = 0;
            if(data.respostas[i].condicao = 'true'){
                teste++;
            }if(teste>1){
                return {status: false , message: "Só pode existir uma resposta verdadeira"};
            }if(i=4){
                if(teste = 0){
                    return {status: false , message: "Deve existir pelo menos uma resposta verdadeira"};
                }
            }
        }
        //Verificar categoria
        /*
        if(data.categoria != '1' || data.categoria != '2' || data.categoria != '3'){
            return {status: false , message: "Só existem a categoria 1, 2 e 3"}
        }*/
    
        return {status: true};
    }
}
module.exports =  function(){
    return perguntaService;
}