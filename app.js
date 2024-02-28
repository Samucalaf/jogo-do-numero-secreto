//Guardamos o número em uma variável para depois fazer a verificação
let listaDeNumeroSorteados = [];
let numeroSercreto = gerarNumeroAleatorio();
let tentativas = 1;

//--------------
function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'brazilian portuguese female', {rate:1.2});
}
//--------------
//Aqui é só as mensagens 
function exibirMensagemInicial(){
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}
exibirMensagemInicial();

//-------------
//Aqui é onde verificamos se o usuario acertou ou errou o numeroSecreto
function verificarChute() {
    //Essa variável armazena o chute do usuario
    let chute = document.querySelector('input').value;
    //Aqui verificamos se o chute está certo ou errado, e em quantas tentativas o usuario acertou 
    if (chute == numeroSercreto){
        exibirTextoNaTela('h1' , 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else{
        if(chute > numeroSercreto){
            exibirTextoNaTela('p', 'O número secreto é menor');
        } else{
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        //tentativas = tentativas + 1;
        tentativas++;
        limparCampo();
    }
} 

//-------------------------
//Aqui temos a função gerar número aleatório, ela gera um número aleatório entre 1 e 10 que é armazenado na variável numeroEscolhido

function gerarNumeroAleatorio() {
  let numeroEscolhido = parseInt(Math.random() * 10 + 1);
  let quantidadeDeElementosNaLista = listaDeNumeroSorteados.length; // length, é uma propriedade de arrays em JavaScript que retorna o número de elementos presentes em uma lista.

//A condição if (quantidadeDeElementosNaLista == 3) verifica se a quantidade de elementos na lista listaDeNumeroSorteados é igual a 10.
//Nesse caso, a linha de código listaDeNumeroSorteados = []; é executada, o que significa que a lista é reiniciada, ficando vazia novamente.
//Essa reinicialização da lista é feita para evitar que a lista fique com mais de 10 elementos, garantindo que sempre haja espaço para sortear novos números.
//Essa parte do código é importante
  if (quantidadeDeElementosNaLista == 10){
    listaDeNumeroSorteados = [];
  }

  if (listaDeNumeroSorteados.includes(numeroEscolhido)){
       return gerarNumeroAleatorio();
  } else{
    listaDeNumeroSorteados.push(numeroEscolhido);
    console.log(listaDeNumeroSorteados);
    return numeroEscolhido;
  }
//-----------------------
//Função limpas campo, limpa o campo para novas tentativas
}
function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

//---------------
//Função reinicar jogo, reinicia o jogo quando acertamos o número secreto
function reiniciarJogo(){
    numeroSercreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}

