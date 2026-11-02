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
var temporizador; // guarda o timer da troca automática
var pausa;  // guarda o timer que espera a rolagem parar

window.onload = inicio;

function inicio() {
    // Busca os elementos do HTML pelo id
    carrossel    = document.getElementById("carrossel");
    trilho       = document.getElementById("trilho");
    botaoVoltar  = document.getElementById("btnVoltar");
    botaoAvancar = document.getElementById("btnAvancar");
    bolinhas     = document.getElementById("bolinhas");
     // --- Criação das cópias para o loop ---

    // Guarda as fotos originais e cria as cópias para o loop
    var originais = Array.from(trilho.children);
    total = originais.length;

    // Cópias colocadas ANTES das originais (início da fila)
    for (var i = 0; i < total; i++) {
        var copiaInicio = originais[i].cloneNode(true); // true = copia também o que está dentro
        copiaInicio.setAttribute("aria-hidden", "true"); // esconde a cópia dos leitores de tela
        trilho.insertBefore(copiaInicio, originais[0]);  // coloca antes da primeira original
    }

    // Cópias colocadas DEPOIS das originais (fim da fila)
    for (var j = 0; j < total; j++) {
        var copiaFim = originais[j].cloneNode(true);
        copiaFim.setAttribute("aria-hidden", "true");
        trilho.appendChild(copiaFim);
    }
     
    // Agora a fila tem 21 fotos: 7 cópias, 7 originais e 7 cópias
    criarBolinhas();

        
    // Liga os botões às funções.
    // O if evita erro quando a seta não existe no HTML
    if (botaoVoltar) {
        botaoVoltar.onclick = voltarFoto;
    }
    if (botaoAvancar) {
        botaoAvancar.onclick = avancarFoto;
    }
     // Quando a pessoa rolar a área do carrossel, chama aoRolar
    carrossel.onscroll   = aoRolar;

    posicao = total; // começa na primeira foto original
    mostrarFoto("auto");// centraliza a foto sem animação
    automaticoFoto();// inicia a troca automática
}

function criarBolinhas() {
    for (let i = 0; i < total; i++) {
        var item = document.createElement("li"); // o item da lista
        var botao = document.createElement("button");// a bolinha em si
        botao.className = "bolinha";   // classe usada pelo CSS 
        botao.setAttribute("aria-label", "Foto " + (i + 1));// nome para leitores de tela
        // Quando clicada, vai para a foto i.
        // O let garante que cada bolinha guarde o seu próprio i
        botao.onclick = function () { irParaFoto(i); };
        item.appendChild(botao); // bolinha dentro do item
        bolinhas.appendChild(item); // item dentro da lista de bolinhas
    }
}
// Seta da direita, ou troca automática: avança uma foto
function avancarFoto() {
    if (posicao < trilho.children.length - 1) {// se não estiver na última
        posicao++;
    }
    mostrarFoto("smooth");// rola com animação
    reiniciarAutomatico();// reinicia o timer, para não trocar logo depois do clique
}

function voltarFoto() {// Seta da esquerda: volta uma foto
    if (posicao > 0) {// se não estiver na primeira
        posicao--;
    }
    mostrarFoto("smooth");
    reiniciarAutomatico();
}
// Clique numa bolinha: vai direto para a foto i
function irParaFoto(i) {
    posicao = total + i; // soma total para cair na foto original, no meio da fila
    mostrarFoto("smooth");
    reiniciarAutomatico();
}

function mostrarFoto(comportamento) {
    // comportamento é "smooth" (com animação) ou "auto" (sem animação)
    var foto = trilho.children[posicao];
 
    // Calcula a rolagem: posição da foto menos a metade do espaço que sobra ao lado
    carrossel.scrollTo({
        left: foto.offsetLeft - (carrossel.clientWidth - foto.offsetWidth) / 2,
        behavior: comportamento
    });
 
    // Descobre o número da foto original.
    // O % (resto da divisão) faz as cópias voltarem a 0 a 6.
    // Ex.: posição 10 -> 10 % 7 = 3
    indice = ((posicao % total) + total) % total;
 
    marcarFoto(); // atualiza o destaque
}
 
 

function marcarFoto() {
    // Calcula a foto original a partir da posição atual.
    // Fica aqui para atualizar também quando a pessoa rola com o dedo
    indice = ((posicao % total) + total) % total;

    // Tira a classe "ativo" de todas as fotos
    for (var i = 0; i < trilho.children.length; i++) {
        trilho.children[i].classList.remove("ativo");
    }

    // Põe "ativo" só na foto do centro
    trilho.children[posicao].classList.add("ativo");

    // Marca a bolinha da foto atual
    for (var j = 0; j < total; j++) {
        bolinhas.children[j].firstElementChild.setAttribute("aria-current", String(j === indice));
    }
}
 
 
// Chamada várias vezes por segundo enquanto a pessoa rola
function aoRolar() {
    posicao = fotoDoCentro(); // descobre qual foto está no centro agora
    marcarFoto();             // o destaque acompanha o dedo
 
    // Cancela a espera anterior e começa uma nova de 150 milissegundos.
    // O ajuste do loop só acontece quando a pessoa para de rolar
    clearTimeout(pausa);
    pausa = setTimeout(ajustarLoop, 150);
}
 
// Descobre qual foto está mais perto do meio da área visível
function fotoDoCentro() {
    var meio = carrossel.scrollLeft + carrossel.clientWidth / 2; // meio da área visível
    var melhor = 0;
    var menorDistancia = Infinity; // começa com um número enorme
 
    for (var i = 0; i < trilho.children.length; i++) {
        var foto = trilho.children[i];
        var centroDaFoto = foto.offsetLeft + foto.offsetWidth / 2;
        var distancia = Math.abs(centroDaFoto - meio); // distância até o meio
 
        // Se essa foto estiver mais perto que a melhor até agora, ela passa a ser a melhor
        if (distancia < menorDistancia) {
            menorDistancia = distancia;
            melhor = i;
        }
    }
    return melhor; // número da foto mais centralizada
}
 
// Faz o loop: se a pessoa parou numa cópia, pula para a original igual
function ajustarLoop() {
    if (posicao >= 2 * total) {
        // Parou numa cópia do fim (14 ou mais): volta 7 posições
        posicao = posicao - total;
        mostrarFoto("auto"); // sem animação, para o pulo não aparecer
    } else if (posicao < total) {
        // Parou numa cópia do início (menos de 7): avança 7 posições
        posicao = posicao + total;
        mostrarFoto("auto");
    }
}
 
 

 
// Inicia o timer: avança uma foto a cada 3000 milissegundos (3 segundos)
function automaticoFoto() {
    temporizador = setInterval(avancarFoto, 3000);
}
 
// Para o timer atual e começa a contar de novo.
// Usada quando a pessoa clica, para a troca não acontecer logo depois
function reiniciarAutomatico() {
    clearInterval(temporizador);
    automaticoFoto();
}
