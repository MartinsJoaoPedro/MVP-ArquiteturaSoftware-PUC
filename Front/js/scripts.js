//Váriaveis globais
let ids = [];
let id;
let edicao = true;

//Chamada da função para carregamento inicial dos dados
if (window.location.href.indexOf("index.html") !== -1) {
  
}

//Função para carregamento da estrutura inicial
function inicar() {
  console.log("inicar");
  let atulizar = document.createElement("span");
  atulizar.innerHTML = "atulizar";
  atulizar.classList.add("addBtn");
  atulizar.onclick = buscaCompra();
}

// Adiciona 'idn' à lista 'ids'
function pegaListaId(idn) {
  ids.push(idn);
}