// Elementos da página
var carrossel;
var trilho;
var botaoVoltar;
var botaoAvancar;
var bolinhas;

// Controle do carrossel
var total;        // quantas fotos originais existem (7)
var posicao;      // posição da foto do centro, contando as cópias (0 a 20)
var indice;       // número da foto original (0 a 6)
var temporizador;
var pausa;

window.onload = inicio;

function inicio() {
    carrossel    = document.getElementById("carrossel");
    trilho       = document.getElementById("trilho");
    botaoVoltar  = document.getElementById("btnVoltar");
    botaoAvancar = document.getElementById("btnAvancar");
    bolinhas     = document.getElementById("bolinhas");

    // Guarda as fotos originais e cria as cópias para o loop
    var originais = Array.from(trilho.children);
    total = originais.length;

    for (var i = 0; i < total; i++) {
        var copiaInicio = originais[i].cloneNode(true);
        copiaInicio.setAttribute("aria-hidden", "true");
        trilho.insertBefore(copiaInicio, originais[0]);
    }

    for (var j = 0; j < total; j++) {
        var copiaFim = originais[j].cloneNode(true);
        copiaFim.setAttribute("aria-hidden", "true");
        trilho.appendChild(copiaFim);
    }

    criarBolinhas();

    if (botaoVoltar) {
        botaoVoltar.onclick = voltarFoto;
    }
    if (botaoAvancar) {
        botaoAvancar.onclick = avancarFoto;
    }
    carrossel.onscroll   = aoRolar;

    posicao = total; // começa na primeira foto original
    mostrarFoto("auto");
    automaticoFoto();
}

function criarBolinhas() {
    for (let i = 0; i < total; i++) {
        var item = document.createElement("li");
        var botao = document.createElement("button");
        botao.className = "bolinha";
        botao.setAttribute("aria-label", "Foto " + (i + 1));
        botao.onclick = function () { irParaFoto(i); };
        item.appendChild(botao);
        bolinhas.appendChild(item);
    }
}

function avancarFoto() {
    if (posicao < trilho.children.length - 1) {
        posicao++;
    }
    mostrarFoto("smooth");
    reiniciarAutomatico();
}

function voltarFoto() {
    if (posicao > 0) {
        posicao--;
    }
    mostrarFoto("smooth");
    reiniciarAutomatico();
}

function irParaFoto(i) {
    posicao = total + i;
    mostrarFoto("smooth");
    reiniciarAutomatico();
}

// Rola até a foto ficar no centro e atualiza o destaque
function mostrarFoto(comportamento) {
    var foto = trilho.children[posicao];

    carrossel.scrollTo({
        left: foto.offsetLeft - (carrossel.clientWidth - foto.offsetWidth) / 2,
        behavior: comportamento
    });

    indice = ((posicao % total) + total) % total;
    marcarFoto();
}

// Põe a classe "ativo" na foto do centro e a bolinha correspondente em destaque
function marcarFoto() {
    for (var i = 0; i < trilho.children.length; i++) {
        trilho.children[i].classList.remove("ativo");
    }
    trilho.children[posicao].classList.add("ativo");

    for (var j = 0; j < total; j++) {
        bolinhas.children[j].firstElementChild.setAttribute("aria-current", String(j === indice));
    }
}

// Enquanto a pessoa rola com o dedo ou com a barra
function aoRolar() {
    posicao = fotoDoCentro();
    marcarFoto();

    // Espera parar de rolar para ajustar o loop
    clearTimeout(pausa);
    pausa = setTimeout(ajustarLoop, 150);
}

// Descobre qual foto está mais perto do centro
function fotoDoCentro() {
    var meio = carrossel.scrollLeft + carrossel.clientWidth / 2;
    var melhor = 0;
    var menorDistancia = Infinity;

    for (var i = 0; i < trilho.children.length; i++) {
        var foto = trilho.children[i];
        var centroDaFoto = foto.offsetLeft + foto.offsetWidth / 2;
        var distancia = Math.abs(centroDaFoto - meio);

        if (distancia < menorDistancia) {
            menorDistancia = distancia;
            melhor = i;
        }
    }
    return melhor;
}

// Se parou numa cópia, pula para a original igual, sem o salto aparecer
function ajustarLoop() {
    if (posicao >= 2 * total) {
        posicao = posicao - total;
        mostrarFoto("auto");
    } else if (posicao < total) {
        posicao = posicao + total;
        mostrarFoto("auto");
    }
}

function automaticoFoto() {
    temporizador = setInterval(avancarFoto, 3000);
}

function reiniciarAutomatico() {
    clearInterval(temporizador);
    automaticoFoto();
}