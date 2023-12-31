//Esse código js é um dos 3 códigos principais ele contrala os htmls de produto

//Váriaveis globais
let ids = [];
let id;
let edicao = true;

//Chamada da função para carregamento inicial dos dados
if (window.location.href.indexOf("cadastroProduto.html") !== -1) {
  getListProduto();
  console.log("Carregado");
}

//Chamada da função para carregamento inicial dos dados
if (window.location.href.indexOf("consultaProduto.html") !== -1) {
  console.log("Carregado");
}

// Adiciona 'idn' à lista 'ids'
function pegaListaId(idn) {
  ids.push(idn);
}

//Função para limpar os valores da tabela
function limparDados() {
  console.log("limpar");
  //Impede a edição
  edicao = false;
  document.getElementById("getNome").value = "";
  document.getElementById("getQuantidade").value = "";
  document.getElementById("getPreco").value = "";
}

//Função para obter a lista existente do servidor via requisição GET
function getListProduto() {
  limparDados();
  getList("5001", "produtos", formProdutos);
  function formProdutos(produtos) {
    produtos.forEach((produto) =>
      insertList(produto.nome, produto.quantidade, produto.valor),
    );
    produtos.forEach((produto) => pegaListaId(produto.id));
  }
}

//Função para colocar um produto na lista do servidor via requisição POST
async function postProduto(nomeProduto, quantidadeProduto, precoProduto) {
  preco = precoProduto.replace("R$ ", "").replace(/\./g, "").replace(/,/g, ".");
  const formData = new FormData();
  formData.append("nome", nomeProduto);
  formData.append("quantidade", quantidadeProduto);
  formData.append("preco", preco);
  post("5001", "produto", formData);
}

//Função para remover um produto da lista de acordo com o click no botão close
function remover() {
  console.log("Remover");
  let close = document.getElementsByClassName("close"); // Seleciona todas as células da tabela com a classe close
  // var table = document.getElementById('myTable');
  for (let i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName("td")[0].innerHTML;

      let linha = this.parentNode.parentElement; // Seleciona a linha que contém a célula clicada
      let idLinha = linha.id - 1;
      id = ids[idLinha]; //Id do produto referente a linha

      if (confirm("Você tem certeza?")) {
        div.remove();
        deletarProdutoId(id);
        alert("Removido!");
      }
    };
  }
}

// Adicionando evento de clique ao botão
function editar() {
  console.log("Editar");
  let celulasBtnEditar = document.querySelectorAll(" .edit"); // Seleciona todas as células da tabela com a classe edit

  for (let i = 0; i < celulasBtnEditar.length; i++) {
    celulasBtnEditar[i].onclick = function () {
      //Libera a edição
      edicao = true;
      // Esconde o botão de edição
      celulasBtnEditar[i].style.display = "none";

      let linha = this.parentNode.parentElement; // Seleciona a linha que contém a célula clicada
      let idLinha = linha.id;

      let celulasDaLinhaGeral = document.getElementById(idLinha);
      let celulasDaLinha =
        celulasDaLinhaGeral.querySelectorAll(" .linhaEditavel"); // Seleciona todas as células de classe linhaEditavel

      idLinha++;

      // Transforma cada célula em um elemento de input
      for (let j = 0; j < celulasDaLinha.length; j++) {
        let input = document.createElement("input");
        input.type = "text";
        input.value = celulasDaLinha[j].innerHTML;
        celulasDaLinha[j].innerHTML = "";
        celulasDaLinha[j].appendChild(input);

        // Aplique a máscara ao novo campo de entrada
        if (j == 0) {
          $(input).on("input", function () {
            this.value = this.value.replace(/[^a-zA-Z\u00C0-\u00FF\s]/g, "");
          });
        }
        if (j == 1) {
          $(input).on("input", function () {
            this.value = this.value.replace(/[^0-9]/g, "");
          });
        }
        if (j == 2) {
          //Formata o código para edição
          let precoFormatado = input.value;
          precoFormatado = precoFormatado
            .replace("R$&nbsp;", "")
            .replace(/\./g, "");
          console.log(precoFormatado);
          input.value = precoFormatado;
          //Aplique a máscara ao novo campo de entrada
          $(input).maskMoney({
            prefix: "R$ ",
            allowNegative: true,
            thousands: ".",
            decimal: ",",
            affixesStay: false,
          });
        }
      }

      //Adiciona um botão de salvar à linha
      let celulaEditar = this.parentNode;
      inserirBtnSalvar(celulaEditar);

      //Adiciona um evento de clique ao botão de salvar/*
      let salvar = document.getElementsByClassName("salvar");
      //Iterar sobre conjunto
      for (let i = 0; i < salvar.length; i++) {
        console.log(salvar[i]);
        salvar[i].onclick = function () {
          console.log("func");
          //Impede a edição
          edicao = false;
          //Obtém os valores dos inputs e salva os campos
          let inputs = linha.getElementsByTagName("input");

          idLinha--;

          //Remove o botão de salvar
          salvar[i].remove();

          //Mostra o botão de edição novamente
          for (let i = 0; i < celulasBtnEditar.length; i++) {
            celulasBtnEditar[i].style.display = "";
          }

          //Transforma os elementos de input de volta em text
          let nome = inputs[0].value;
          let quantidade = inputs[1].value;
          let preco = inputs[2].value;

          //Código para permitir a edição do preço
          let precoFormatado = preco.replace(/\./g, "").replace(",", ".");
          precoFormatado = precoFormatado.replace("R$ ", "");
          precoFormatado = parseFloat(precoFormatado);
          precoFormatado = precoFormatado.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
          });
          // Verifica se a string já contém "R$"
          if (!precoFormatado.includes("R$")) {
            precoFormatado = "R$ " + precoFormatado;
          }

          celulasDaLinha[0].innerHTML = nome;
          celulasDaLinha[1].innerHTML = quantidade;
          celulasDaLinha[2].innerHTML = precoFormatado;
          //Pega o id referente a coluna clicada
          idLinhaUpdate = idLinha - 1;
          let id = ids[idLinhaUpdate];

          updateProduto(id, nome, quantidade, preco);
        };
      }
    };
  }
}

//Função para deletar um produto da lista utilizando o ID do servidor via requisição DELETE
function deletarProdutoId(IdProduto) {
  deletarId("5001", "produto", IdProduto);
}

//Função para adicionar um novo produto com nome, quantidade e valor
function newItem() {
  console.log("novo item");
  let nome = document.getElementById("getNome").value;
  let quantidade = document.getElementById("getQuantidade").value;
  let preco = document.getElementById("getPreco").value;
  preco = preco.replace("R$ ", "").replace(/\./g, "").replace(/,/g, ".");

  if (nome === "") {
    alert("Escreva o nome do produto!");
  } else if (isNaN(quantidade)) {
    alert("Quantidade precisa ser um número!");
  } else if (preco === "") {
    alert("Escreva o preco do produto!");
  } else {
    //Acrescenta o produto na lista do site
    insertList(nome, quantidade, preco);
    //Envia um comando post para api
    postProduto(nome, quantidade, preco);
    //evita bug apos adicionar uma linha
    alert("Produto adicionado!");
  }
}

//Função para inserir produtos na lista apresentada
let rowId = 1;
function insertList(nomeProduto, quantidadeProduto, precoProduto) {
  console.log("Inserindo produtos");

  // Formatar o preço
  precoProduto = parseFloat(precoProduto).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  //alert("insertList");
  var produto = [nomeProduto, quantidadeProduto, precoProduto];
  var table = document.getElementById("myTable");
  var row = table.insertRow();
  row.id = `${rowId++}`; // atribui um id à linha e incrementa o contador

  // repita onde( inteiro "i" = 0 e menor que o numero de itens, some 1)
  for (var i = 0; i < produto.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = produto[i];
    cel.classList.add("linhaEditavel"); // Adiciona a classe .linhaEditavel à célula

    // Adiciona um evento de clique à célula do preco

    if (i == 2) {
      // Supondo que o preco seja o terceiro item na lista
      cel.classList.add("preco"); // Adiciona a classe .preco à célula do preco
      cel.onclick = function () {
        setPreco(this);
      };
    }
  }
  inserirBtnRemover(row.insertCell(-1));
  inserirBtnEditar(row.insertCell(-1));

  limparDados();
  //Habilita as funções dos botões
  remover();
  editar();
}

//primeiro remove todas as linhas da tabela (exceto a primeira linha, que geralmente é o cabeçalho da tabela) e então insere uma nova linha
function insertUmProduto(nomeProduto, quantidadeProduto, precoProduto) {
  console.log(nomeProduto, quantidadeProduto, precoProduto);
  console.log("Inserindo produto único");
  var produto = [nomeProduto, quantidadeProduto, precoProduto];
  var table = document.getElementById("myTable");
  while (table.rows.length > 1) {
    table.deleteRow(1);
  }
  var row = table.insertRow();
  row.id = `${rowId++}`; // atribui um id à linha e incrementa o contador

  // repita onde(inteiro "i" = 0 e menor que o numero de itens, some 1)
  for (var i = 0; i < produto.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = produto[i];
  }
  inserirBtnRemover(row.insertCell(-1));
  inserirBtnEditar(row.insertCell(-1));
}

//Insere uma nova linha
function insertMaisProduto(nomeProduto, quantidadeProduto, precoProduto) {
  console.log("Inserindo produtos");
  var produto = [nomeProduto, quantidadeProduto, precoProduto];
  var table = document.getElementById("myTable");
  var row = table.insertRow();
  row.id = `${rowId++}`; // atribui um id à linha e incrementa o contador

  //Repita onde( inteiro "i" = 0 e menor que o numero de itens, some 1)
  for (var i = 0; i < produto.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = produto[i];
  }
  inserirBtnRemover(row.insertCell(-1));
  inserirBtnEditar(row.insertCell(-1));
}

//Função para alterar um produto
function updateProduto(
  idProduto,
  nomeProduto,
  quantidadeProduto,
  precoProduto,
) {
  preco = precoProduto.replace("R$ ", "").replace(/\./g, "").replace(/,/g, ".");
  //Criação do objeto
  const formData = new FormData();
  formData.append("nome", nomeProduto);
  formData.append("quantidade", quantidadeProduto);
  formData.append("valor", preco);

  //put do objeto
  update("5001", "produto", idProduto, formData);
}

//busca um produto
function buscarProduto() {
  console.log("Buscando produto");
  document.getElementById("att2").style.display = "block";
  let inputID = document.querySelectorAll("#getId");
  let inputNome = document.querySelectorAll("#getNome");
  let inputQuantidade = document.querySelectorAll("#getQuantidade");
  let inputPreco = document.querySelectorAll("#getPreco");
  let Produto;

  let buscar = document.getElementById("buscar");
  buscar.remove();

  for (let k = 0; k < inputID.length; k++) {
    Produto = inputID[k].value; // Salva o valor do campo aqui
    if (Produto != "") {
      console.log("Consulta de id");
      getProduto("id", Produto);
    } else {
      Produto = inputNome[k].value;
      if (Produto != "") {
        console.log("Consulta de nome");
        getMaisProdutos("nome", Produto);
      } else {
        Produto = inputQuantidade[k].value;
        if (Produto != "") {
          console.log("Consulta de quantidade");
          getMaisProdutos("quantidade", Produto);
        } else {
          Produto = inputPreco[k].value;
          if (Produto != "") {
            console.log("Consulta de valor");
            //Código para alteração do formato do preço para possibilitar a busca
            precoFormatado = Produto.replace(/\./g, "").replace(/,/g, ".");
            getMaisProdutos("valor", precoFormatado);
          }
          d;
        }
      }
    }
  }
}

function buscarCompraTodas() {
  getListProduto();

  //remove o botão impede que sejam adicinadas repetições
  let buscar = document.getElementById("buscarTodos");
  buscar.remove();
}

//Consulta única
function getProduto(ParametroUrl, paramentroProduto) {
  console.log("buscaGet");
  get("5001", "produto", formProduto, ParametroUrl, paramentroProduto);
  function formProduto(produto) {
    // Código para lidar com um único produto
    insertUmProduto(produto.nome, produto.quantidade, produto.valor);
  }
}

//Consulta para varios
function getMaisProdutos(ParametroUrl, paramentroProduto) {
  console.log("buscaGetMais");
  get("5001", "produtos", formProduto, ParametroUrl, paramentroProduto);
  function formProduto(produto) {
    let produtos = produto.produtos;
    // Código para lidar com produtos
    produtos.forEach((item) => {
      insertMaisProduto(item.nome, item.quantidade, item.valor);
    });
  }
}
