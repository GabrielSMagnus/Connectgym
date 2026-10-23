const cards = document.querySelectorAll(".plano-card")

let planoAtual = 0

function atualizarCarrossel() {
    cards.forEach(function(card){
        card.classList.remove("ativo", "esquerda", "direita")
    })

    let anterior = (planoAtual - 1 + cards.length) % cards.length
    let proximo = (planoAtual + 1) % cards.length

    cards[planoAtual].classList.add("ativo")
    cards[anterior].classList.add("esquerda")
    cards[proximo].classList.add("direita")
}

atualizarCarrossel();

setInterval(function() {
    planoAtual = (planoAtual + 1) % cards.length;
    atualizarCarrossel();
}, 5000);
