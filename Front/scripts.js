//Váriaveis globais
let ids = [];
let id;
let edicao = true;

//Chamada da função para carregamento inicial dos dados
if (window.location.href.indexOf("cadastroProduto.html") !== -1) {
  getList();
}

//Função para carregamento da estrutura inicial
function inicar() {
  console.log("inicar");
  let atulizar = document.createElement("span");
  atulizar.innerHTML = "atulizar";
  atulizar.classList.add("addBtn");
  atulizar.onclick = buscaProduto();
}

// Adiciona 'idn' à lista 'ids'
function pegaListaId(idn) {
  ids.push(idn);
}

//Função para colocar o botão de remover
function inserirBtnRemover(Produto) {
  console.log("botão de remoção");
  let span = document.createElement("span");
  //u00D7 == x
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  //x está no span
  span.appendChild(txt);
  //span está no paramentro parent
  Produto.appendChild(span);
}

//Função para colocar o botão de editar
function inserirBtnEditar(produto) {
  console.log("botão de edição");
  let span = document.createElement("span");
  let txt = document.createTextNode("\u270F");
  span.className = "edit";
  span.appendChild(txt);
  produto.appendChild(span);
}

//Função para limpar os valores da tabela
function limparDados() {
  console.log("limpar");
  edicao = false;
  document.getElementById("getNome").value = "";
  document.getElementById("getQuantidade").value = "";
  document.getElementById("getValor").value = "";
}

//Função para obter a lista existente do servidor via requisição GET
function getList() {
  limparDados();
  let url = "http://127.0.0.1:5000/produtos";
  console.log("get");
  console.log(url);
  fetch(url, {
    method: "get",
  })
    .then((response) => response.json())
    .then((data) => {
      data.produtos.forEach((produto) =>
        insertList(produto.nome, produto.quantidade, produto.valor)
      );
      data.produtos.forEach((produto) => pegaListaId(produto.id));
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

//Função para colocar um produto na lista do servidor via requisição POST
async function postItem(inputProduct, inputQuantity, inputPrice) {
  preco = inputPrice.replace("R$ ", "").replace(/\./g, "").replace(/,/g, ".");
  //Criação do objeto
  const formData = new FormData();
  formData.append("nome", inputProduct);
  formData.append("quantidade", inputQuantity);
  formData.append("valor", preco);
  // Log dos valores do FormData
  for (var pair of formData.entries()) {
    console.log(pair[0] + ", " + pair[1]);
  }

  //post do objeto
  let url = "http://127.0.0.1:5000/produto";
  console.log("post");
  console.log(url);
  fetch(url, {
    method: "post",
    body: formData,
  })
    //a resposta deve ser convertida em json
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error:", error);
    });
}

//Função para remover um produto da lista de acordo com o click no botão close
function Remover() {
  console.log("Remover");
  let close = document.getElementsByClassName("close"); // Seleciona todas as células da tabela com a classe close
  // var table = document.getElementById('myTable');
  for (let i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName("td")[0].innerHTML;
      console.log(nomeItem);

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
function Editar() {
  console.log("Editar");
  let celulasBtnEditar = document.querySelectorAll(" .edit"); // Seleciona todas as células da tabela com a classe edit

  for (let i = 0; i < celulasBtnEditar.length; i++) {
    celulasBtnEditar[i].onclick = function () {
      edicao = true;
      // Esconde o botão de edição
      for (let i = 0; i < celulasBtnEditar.length; i++) {
        celulasBtnEditar[i].style.display = "none";
      }

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

        if (j == 2) {
          // Aplique a máscara ao novo campo de entrada
          $(input).mask("00000-000");
        }
        if (j == 0) {
          // Aplique a máscara ao novo campo de entrada
          $(input).mask("000.000.000-00");
        }
      }

      // Adiciona um botão de salvar à linha
      let celulaEditar = this.parentNode;
      let salvar = document.createElement("span");
      salvar.innerHTML = "Salvar";
      salvar.classList.add("addBtn");
      celulaEditar.appendChild(salvar);

      // Adiciona um evento de clique ao botão de salvar
      salvar.onclick = function () {
        edicao = false;
        // Obtém os valores dos inputs e salva os campos
        let inputs = linha.getElementsByTagName("input");
        for (let k = 0; k < inputs.length; k++) {
          let valor = inputs[k].value;
          // Salva o valor do campo aqui
        }

        idLinha--;

        // Remove o botão de salvar
        salvar.remove();

        // Mostra o botão de edição novamente
        for (let i = 0; i < celulasBtnEditar.length; i++) {
          celulasBtnEditar[i].style.display = "";
        }

        // Transforma os elementos de input de volta em text
        let tamanho = inputs.length;

        let nome = inputs[0].value;
        let quantidade = inputs[1].value;
        let preco = inputs[2].value;

        celulasDaLinha[0].innerHTML = nome;
        celulasDaLinha[1].innerHTML = quantidade;
        celulasDaLinha[2].innerHTML = preco;

        //Pega o id referente a coluna clicada
        idLinhaUpdate = idLinha - 1;
        let id = ids[idLinhaUpdate];

        console.log("produto");
        console.log(id);
        console.log(nome);
        console.log(quantidade);
        console.log(preco);
        console.log("============");
        //updateItem(nome, quantidade, preco);
        updateProduto(id, nome, quantidade, preco);
      };
    };
  }
}

//Função para deletar um produto da lista utilizando o nome do servidor via requisição DELETE
function deletarProduto(nomeProduto) {
  let url = "http://127.0.0.1:5000/produto?nome=" + nomeProduto;
  console.log("delete");
  console.log(url);
  fetch(url, {
    method: "delete",
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error:", error);
    });
}

//Função para deletar um produto da lista utilizando o ID do servidor via requisição DELETE
function deletarProdutoId(IdProduto) {
  let url = "http://127.0.0.1:5000/produto?id=" + IdProduto;
  console.log("delete");
  console.log(url);
  fetch(url, {
    method: "delete",
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error:", error);
    });
}

//Função para adicionar um novo produto com nome, quantidade e valor
function newItem() {
  console.log("novo item");
  let nome = document.getElementById("getNome").value;
  let quantidade = document.getElementById("getQuantidade").value;
  let preco = document.getElementById("getValor").value;

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
    postItem(nome, quantidade, preco);
    //evita bug apos adicionar uma linha
    alert("Produto adicionado!");
  }
}

//Função para inserir produtos na lista apresentada
let rowId = 1;
function insertList(nomeProduto, quantidadeProduto, precoProduto) {
  console.log("Inserindo produtos");
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
  }
  inserirBtnRemover(row.insertCell(-1));
  inserirBtnEditar(row.insertCell(-1));

  limparDados();
  //Habilita as funções dos botões
  Remover();
  Editar();
}

//primeiro remove todas as linhas da tabela (exceto a primeira linha, que geralmente é o cabeçalho da tabela) e então insere uma nova linha
function insertUm(nomeProduto, quantidadeProduto, precoProduto) {
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
}

//Insere uma nova linha
function insertMais(nomeProduto, quantidadeProduto, precoProduto) {
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
}

//Função para alterar um produto
function updateProduto(
  idProduto,
  nomeProduto,
  quantidadeProduto,
  precoProduto
) {
  //Criação do objeto
  const formData = new FormData();
  formData.append("nome", nomeProduto);
  formData.append("quantidade", quantidadeProduto);
  formData.append("valor", precoProduto);

  //put do objeto
  let url = "http://127.0.0.1:5000/produto?id=" + idProduto;
  console.log("put");
  console.log(url);
  fetch(url, {
    method: "put",
    body: formData,
  })
    //a resposta deve ser convertida em json
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error:", error);
    });
}

//busca um produto
function buscarProduto() {
  console.log("Buscando produto");
  document.getElementById("att2").style.display = "block";
  let inputID = document.querySelectorAll("#getId");
  let inputNome = document.querySelectorAll("#getNome");
  let inputQuantidade = document.querySelectorAll("#getQuantidade");
  let inputValor = document.querySelectorAll("#getValor");
  let Produto;

  let buscar = document.getElementById("buscar");
  buscar.remove();

  for (let k = 0; k < inputID.length; k++) {
    Produto = inputID[k].value; // Salva o valor do campo aqui         }
    if (Produto != "") {
      console.log("id");
      buscaGet("id", Produto);
    } else {
      Produto = inputNome[k].value;
      if (Produto != "") {
        console.log("nome");
        buscaGetmais("nome", Produto);
      } else {
        Produto = inputQuantidade[k].value;
        if (Produto != "") {
          console.log("quantidade");
          buscaGetmais("quantidade", Produto);
        } else {
          Produto = inputValor[k].value;
          if (Produto != "") {
            console.log("valor");
            buscaGetmais("valor", Produto);
          }
        }
      }
    }
  }
}

//Consulta para id
function buscaGet(ParametroUrl, paramentroProduto) {
  let url =
    "http://127.0.0.1:5000/produto" +
    ParametroUrl +
    "?" +
    ParametroUrl +
    "=" +
    paramentroProduto;

  //get do objeto
  console.log("get");
  console.log(url);
  fetch(url, {
    method: "get",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.id != null) {
        insertUm(data.nome, data.quantidade, data.valor);
      } else {
        alert("Produto não encontrado");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

//Consulta para varios
function buscaGetmais(ParametroUrl, paramentroProduto) {
  let url =
    "http://127.0.0.1:5000/produtos" +
    ParametroUrl +
    "?" +
    ParametroUrl +
    "=" +
    paramentroProduto;

  //get do objeto
  console.log("get");
  console.log(url);
  fetch(url, {
    method: "get",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.produtos);
      if (data.produtos != 0) {
        data.produtos.forEach((Produto) =>
          insertMais(Produto.nome, Produto.quantidade, Produto.valor)
        );
      } else {
        alert("Prodduto não encontrado");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
