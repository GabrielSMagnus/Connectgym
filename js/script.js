
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


// Seleciona a área do carrossel.
const carrossel = document.querySelector(".carrossel-planos");

// Guarda a posição horizontal inicial do movimento.
let inicioX = 0;

// Indica se o usuário começou a arrastar.
let arrastando = false;

// Detecta quando o usuário pressiona o mouse
// ou coloca o dedo sobre o carrossel.
carrossel.addEventListener("pointerdown", function(event) {

    // Guarda a posição horizontal inicial.
    inicioX = event.clientX;

    // Informa que o movimento começou.
    arrastando = true;

});


// Detecta quando o usuário solta o mouse ou o dedo.
document.addEventListener("pointerup", function(event) {

    // Se não estava arrastando, não faz nada.
    if (!arrastando) {
        return;
    }

    // Calcula a distância entre o início e o fim do movimento.
    let diferenca = event.clientX - inicioX;

    // Finaliza o movimento atual.
    arrastando = false;


    // Verifica se o usuário arrastou para a esquerda
    // por mais de 50 pixels.
    if (diferenca < -50) {

        // Avança para o próximo cartão.
        planoAtual = (planoAtual + 1) % cards.length;

        // Atualiza as posições dos cartões.
        atualizarCarrossel();

    }

    // Verifica se o usuário arrastou para a direita
    // por mais de 50 pixels.
    else if (diferenca > 50) {

        // Volta para o cartão anterior.
        planoAtual = (planoAtual - 1 + cards.length) % cards.length;

        // Atualiza as posições dos cartões.
        atualizarCarrossel();

    }

});


// Caso o movimento seja interrompido pelo navegador,
// cancela o estado de arrastamento.
document.addEventListener("pointercancel", function() {
    arrastando = false;
});



// Executa uma função automaticamente a cada 5000 milissegundos (5 segundos).
setInterval(function() {

    // Avança para o próximo plano.
    // O operador % faz com que, depois do último cartão,
    // o carrossel volte para o primeiro.
    planoAtual = (planoAtual + 1) % cards.length;

    // Atualiza as posições dos cartões na tela.
    atualizarCarrossel();

}, 5000);
