//Script do código dos botões de carregamentodas páginas
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
