// Carrossel da equipe: troca de pessoa sozinho, a cada 3 segundos.
(function () {
    var moldura = document.getElementById("moldura");
    var nome = document.getElementById("nome");

    var fotos = [
        "imagemAdrian.jpeg",
        "imagemVitoria.jpeg",
        "imagens.jpeg",
        "ImagemPaola.jpeg",
        "imagemMariaEduarda.jpeg",
        "imagemNatalia.jpeg",
        "imagemCaue.jpeg"
    ];
    var nomes = [
        "Adrian Amoriso",
        "Vitoria Cucke",
        "Anderson",
        "Paola Gomes",
        "Maria Eduarda",
        "Natalia Possamai",
        "Caue Silva"
    ];

    var path = "imagens/";
    var tempoEntreFotos = 3000; // 3000 = 3 segundos
    var indice = 0;             // qual pessoa está aparecendo

    window.addEventListener("load", inicio);

    function inicio() {
        mostrarPessoa();
        setInterval(avancarPessoa, tempoEntreFotos);
    }

    // Vai para a próxima pessoa. Na última, volta para a primeira
    function avancarPessoa() {
        if (indice < fotos.length - 1) {
            indice++;
        } else {
            indice = 0;
        }
        mostrarPessoa();
    }

    // Troca a foto e o nome pela pessoa atual
    function mostrarPessoa() {
        moldura.src = path + fotos[indice];
        nome.textContent = nomes[indice];
    }
})();
