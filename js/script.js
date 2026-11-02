
// Seleciona todos os elementos HTML que possuem a classe "plano-card".
// O querySelectorAll retorna uma lista com os seis cartões de planos.
const cards = document.querySelectorAll(".plano-card");

// Cria uma variável para armazenar a posição do plano que está no centro.
// O valor 0 significa que o primeiro cartão começa no centro.
let planoAtual = 0;


// Cria a função responsável por organizar a posição dos cartões.
function atualizarCarrossel() {

    // Percorre todos os cartões, um por vez.
    cards.forEach(function(card) {

        // Remove as classes de posição de cada cartão.
        // Isso evita que um cartão mantenha uma posição antiga.
        card.classList.remove("ativo", "esquerda", "direita");

    });


    // Calcula a posição do cartão anterior ao cartão central.
    // O operador % faz com que a contagem volte ao final da lista
    // quando o cartão atual for o primeiro.
    let anterior = (planoAtual - 1 + cards.length) % cards.length;


    // Calcula a posição do próximo cartão.
    // Quando chegar ao último cartão, a contagem volta para o primeiro.
    let proximo = (planoAtual + 1) % cards.length;


    // Adiciona a classe "ativo" ao cartão que ficará no centro.
    cards[planoAtual].classList.add("ativo");

    // Adiciona a classe "esquerda" ao cartão anterior.
    cards[anterior].classList.add("esquerda");

    // Adiciona a classe "direita" ao próximo cartão.
    cards[proximo].classList.add("direita");

}


// Executa a função pela primeira vez.
// Assim, os cartões já aparecem nas posições corretas quando a página abre.
atualizarCarrossel();


// Executa uma função automaticamente a cada 5000 milissegundos (5 segundos).
setInterval(function() {

    // Avança para o próximo plano.
    // O operador % faz com que, depois do último cartão,
    // o carrossel volte para o primeiro.
    planoAtual = (planoAtual + 1) % cards.length;

    // Atualiza as posições dos cartões na tela.
    atualizarCarrossel();

}, 5000);
