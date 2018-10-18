class perguntaService {

    constructor() { }

    jsonGet(data) {
        for (var i = 0; i < data.length; i++) {
            data[i].respostas = JSON.parse(data[i].respostas);
        }

        return data;
    }

    validarPerguntas(data) {
        var teste = 0;
        var alternativas = ['a', 'b', 'c', 'd', 'e'];



        // Verificar se existe letras duplicadas ou sem ordem
        for (var i = 0; i < 5; i++) {
            if (data.respostas[i].label !== alternativas[i]) {
                return { status: false, message: "A ordem das alternativas estão incorretas ou duplicadas" };
            }
        }
        //Verificar se a descrição estava vazia
        for (var i = 0; i < 5; i++) {
            if (data.respostas[i].descricao == '') {
                return { status: false, message: "Descrição esta vazia" };
            }
        }

        //Verificar se a condição estava vazia
        for (var i = 0; i < 5; i++) {
            if (data.respostas[i].condicao == '') {
                return { status: false, message: "A condição esta vazia" };
            };
        }

        //Verificar se está true or false
        for (var i = 0; i < 5; i++) {
            if (data.respostas[i].condicao == 'true') {
            } else {
                if (data.respostas[i].condicao == 'false') {
                } else {
                    return { status: false, message: "As condições devem ser true ou false" };
                }
            }
        }

        //Verificar se existe mais de uma resposta true
        teste == 0;
        for (var i = 0; i < 5; i++) {
            if (data.respostas[i].condicao == 'true') {
                teste++;
            } 
            if (teste > 1) {
                return { status: false, message: "Só pode existir uma resposta verdadeira" };
            } 
            if (i == 4) {
                if (teste == 0) {
                    return { status: false, message: "Deve existir pelo menos uma resposta verdadeira" };
                }
            }
        }
        //Verificar categoria

        if (data.categoria == '1') {
        } else {
            if (data.categoria == '2') {
            } else {
                if (data.categoria == '3') {
                } else {
                    return { status: false, message: "Só existem a categoria 1, 2 e 3" };
                }
            }
        }
        //Validar linha de dados
        if (!data.pergunta) {  
            return { status: false, message: "Pergunta deve ser obrigatória " };
        }
        if (!data.respostas) { 
           return { status: false, message: "Resposta Obrigatória" };   
        }
        if (!data.categoria) {
            return { status: false, message: "Categoria Obrigatória" };
        }
       

        return { status: true };
    }
}
module.exports = function () {
    return perguntaService;
}