//Script do código dos botões
//Carrega página cadastro de cliente
function cadastroCliente() {
  setTimeout(function () {
    isClicked = false;
  }, 5000); // Atraso de 5 segundo
  console.log("click cadastroCliente");
  window.location.href = "../html/cadastroCliente.html";
}

//Carrega página cadastro de produto
function cadastroProduto() {
  console.log("click cadastroProduto");
  window.location.href = "../html/cadastroProduto.html";
}

//Carrega página cadastro de compra
function cadastroCompra() {
  console.log("click cadastroCompra");
  window.location.href = "../html/cadastroCompra.html";
}

//Carrega página consulta de produtos
function consultaProduto() {
  console.log("click consultaProduto");
  window.location.href = "../html/consultaProduto.html";
}

//Carrega página consulta de cliente
function consultaCliente() {
  console.log("click consultaCliente");
  window.location.href = "../html/consultaCliente.html";
}

//Carrega página consulta de compra
function consultaCompra() {
  console.log("click consultaCompra");
  window.location.href = "../html/consultaCompra.html";
}

//Carrega página index
function index() {
  console.log("click index");
  window.location.href = "../html/index.html";
}

//Função para colocar o botão de remover
function inserirBtnRemover(back) {
  console.log("botão de remoção");
  let span = document.createElement("span");
  //u00D7 == x
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  //x está no span
  span.appendChild(txt);
  //span está no paramentro parent
  back.appendChild(span);
}

//Função para colocar o botão de editar
function inserirBtnEditar(back) {
  console.log("botão de edição");
  let span = document.createElement("span");
  //“PENCIL” emoji
  let txt = document.createTextNode("\u270F");
  span.className = "edit";
  //“PENCIL” está no span
  span.appendChild(txt);
  //span está no paramentro parent
  back.appendChild(span);
}

//Função para colocar o botão de salvar
function inserirBtnSalvar(back) {
  console.log("botão de salvar");
  let span = document.createElement("span");
  //“PENCIL” emoji
  let txt = document.createTextNode("\u270F");
  span.className = "addBtn";
  span.classList.add("salvar");
  span.innerHTML = "Salvar";
  //“PENCIL” está no span
  //span.appendChild(txt);
  //span está no paramentro parent
  back.appendChild(span);
}
