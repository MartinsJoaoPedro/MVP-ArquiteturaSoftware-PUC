//Váriaveis globais
let ids = [];
let id;

//Chamada da função para carregamento inicial dos dados
if (window.location.href.indexOf("cliente.html") !== -1) {
  getList();
}

//Função para carregamento da estrutura inicial
function inicar() {
  let atulizar = document.createElement("span");
  atulizar.innerHTML = "atulizar";
  atulizar.classList.add("addBtn");
  atulizar.onclick = busca();
}

// Adiciona 'idn' à lista 'ids'
function pegaListaId(idn) {
  ids.push(idn);
}

//Função para colocar o botão de remover
function inserirBtnRemover(item) {
  let span = document.createElement("span");
  //u00D7 == x
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  //x está no span
  span.appendChild(txt);
  //span está no paramentro parent
  item.appendChild(span);
}

//Função para colocar o botão de editar
function inserirBtnEditar(item) {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u270F");
  span.className = 'edit';
  span.appendChild(txt);
  item.appendChild(span);
}

//Função para limpar os valores da tabela
function limparDados() {
  document.getElementById("getNome").value = "";
  document.getElementById("getQuantidade").value = "";
  document.getElementById("getValor").value = "";
}

//Altera de pagina cliente
function cliente() {
  console.log("click cliente");
  window.location.href = 'cliente.html';
}

//Altera de pagina cliente
function produto() {
  console.log("click validade");
  window.location.href = 'produto.html';
}

//Altera de pagina busca
function busca() {
  console.log("click sacola");
  window.location.href = 'busca.html';
}

//Altera de pagina endereço
function endereco() {
  console.log("click endereco");
  window.location.href = 'endereco.html';
}

/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
/*
function getList() {
    let url = 'http://127.0.0.1:5000/clientes';
    console.log("get")
    console.log(url)
    fetch(url, {
        method: 'get',
    })
        .then((response) => response.json())
        .then((data) => {
            data.clientes.forEach(item => insertList(item.cpf, item.nome, item.cep));
            data.clientes.forEach(item => pegaListaId(item.cpf));
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}*/

/*
  --------------------------------------------------------------------------------------
  Função para colocar um item do estoque na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/

//Função para colocar um item do cliente na lista do servidor via requisição POST
async function postItem(inputCpf, inputNome, inputPrice) {

    //Criação do objeto
    const formData = new FormData();
    formData.append('CPF', inputCpf);
    formData.append('nome', inputNome);
    formData.append('Cep', inputPrice);

    //post do objeto
    let url = 'http://127.0.0.1:5000/cliente';
    console.log("post")
    console.log(url)
    fetch(url, {
        method: 'post',
        body: formData
    })
        //a resposta deve ser convertida em json
        .then((response) => response.json())
        .catch((error) => {
            console.error('Error:', error);
        });
}
