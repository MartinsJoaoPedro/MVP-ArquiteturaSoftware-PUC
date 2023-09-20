//Váriaveis globais
let ids = [];
let id;
let edicao = true;

//Chamada da função para carregamento inicial dos dados
if (window.location.href.indexOf("index.html") !== -1) {
  getList();
  getListCpf();
  getListProduto();
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

//Função para colocar o botão de remover
function inserirBtnRemover(Compra) {
  console.log("botão de remoção");
  let span = document.createElement("span");
  //u00D7 == x
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  //x está no span
  span.appendChild(txt);
  //span está no paramentro parent
  Compra.appendChild(span);
}

//Função para colocar o botão de editar
function inserirBtnEditar(compra) {
  console.log("botão de edição");
  let span = document.createElement("span");
  let txt = document.createTextNode("\u270F");
  span.className = "edit";
  span.appendChild(txt);
  compra.appendChild(span);
}

//Função para limpar os valores da tabela
function limparDados() {
  console.log("limpar");
  edicao = false;
  document.getElementById("getCpf").value = "";
  document.getElementById("getProduto").value = "";
}

//Função para obter a lista existente do servidor via requisição GET
function getList() {
  limparDados();
  let url = "http://127.0.0.1:5003/compras";
  console.log("get");
  console.log(url);
  try {
    fetch(url, {
      method: "get",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        data.compras.forEach((compra) =>
          insertList(compra.cpf, compra.nome, compra.produto)
        );
        data.compras.forEach((compra) => pegaListaId(compra.id));
      })
      .catch((error) => {
        if (error instanceof TypeError) {
          // Trate o TypeError aqui
          console.log(
            "Ocorreu um erro ao buscar a lista de compras. Por favor, tente novamente mais tarde."
          );
          console.error("TypeError:", error.message);
        } else {
          // Relance o erro se não for um TypeError
          throw error;
        }
      });
  } catch (error) {
    console.error("Error:", error);
  }
}

//Função para colocar um compra na lista do servidor via requisição POST
async function postItem(inputCpf, inputNome, inputProduct) {
  //Criação do objeto
  const formData = new FormData();
  formData.append("cpf", inputCpf);
  formData.append("nome", inputNome);
  formData.append("produto", inputProduct);
  // Log dos valores do FormData
  for (var pair of formData.entries()) {
    console.log(pair[0] + ", " + pair[1]);
  }

  //post do objeto
  let url = "http://127.0.0.1:5003/compra";
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

//Função para remover um compra da lista de acordo com o click no botão close
function remover() {
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
      id = ids[idLinha]; //Id do compra referente a linha

      if (confirm("Você tem certeza?")) {
        div.remove();
        deletarCompraId(id);
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
        y;
        if (j == 2) {
          alert("entrou");
          // Aplique a máscara ao novo campo de entrada
          $("#getPreco").maskMoney({
            prefix: "R$ ",
            allowNegative: true,
            thousands: ".",
            decimal: ",",
            affixesStay: false,
          });
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

        let cpf = inputs[0].value;
        let produto = inputs[1].value;

        celulasDaLinha[0].innerHTML = cpf;
        celulasDaLinha[1].innerHTML = produto;

        //Pega o id referente a coluna clicada
        idLinhaUpdate = idLinha - 1;
        let id = ids[idLinhaUpdate];

        console.log("compra");
        console.log(id);
        console.log(cpf);
        console.log(produto);
        console.log("============");
        //updateItem(produto, cpf);
        updateCompra(id, cpf, produto);
      };
    };
  }
}

//Função para deletar um compra da lista utilizando o produto do servidor via requisição DELETE
function deletarCompra(produtoCompra) {
  let url = "http://127.0.0.1:5003/compra?produto=" + produtoCompra;
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

//Função para deletar um compra da lista utilizando o ID do servidor via requisição DELETE
function deletarCompraId(IdCompra) {
  let url = "http://127.0.0.1:5003/compra?id=" + IdCompra;
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

//Função para adicionar um novo compra com produto e cpf
function newItem() {
  console.log("novo item");
  let cpf = document.getElementById("getCpf").value;
  let produto = document.getElementById("getProduto").value;

  if (produto === "") {
    alert("Escreva o produto da compra!");
  } else if (cpf === "") {
    alert("Escreva o cpf da compra!");
  } else {
    //Acrescenta o compra na lista do site
    insertList(cpf, nomeComprador, produto);
    //Envia um comando post para api
    postItem(cpf, nomeComprador, produto);
    //evita bug apos adicionar uma linha
    alert("Compra adicionada!");
  }
}

//Função para inserir compras na lista apresentada
let rowId = 1;
function insertList(cpfCompra, nomeCompra, produtoCompra) {
  console.log("Inserindo compras");
  //alert("insertList");
  var compra = [cpfCompra, nomeCompra, produtoCompra];
  var table = document.getElementById("myTable");
  var row = table.insertRow();
  row.id = `${rowId++}`; // atribui um id à linha e incrementa o contador

  // repita onde( inteiro "i" = 0 e menor que o numero de itens, some 1)
  for (var i = 0; i < compra.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = compra[i];
    cel.classList.add("linhaEditavel"); // Adiciona a classe .linhaEditavel à célula
  }
  inserirBtnRemover(row.insertCell(-1));
  inserirBtnEditar(row.insertCell(-1));

  limparDados();
  //Habilita as funções dos botões
  remover();
  editar();
}

//primeiro remove todas as linhas da tabela (exceto a primeira linha, que geralmente é o cabeçalho da tabela) e então insere uma nova linha
function insertUm(cpfCompra, produtoCompra) {
  console.log("Inserindo compra única");
  var compra = [cpfCompra, produtoCompra];
  var table = document.getElementById("myTable");
  while (table.rows.length > 1) {
    table.deleteRow(1);
  }
  var row = table.insertRow();
  row.id = `${rowId++}`; // atribui um id à linha e incrementa o contador

  // repita onde(inteiro "i" = 0 e menor que o numero de itens, some 1)
  for (var i = 0; i < compra.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = compra[i];
  }
}

//Insere uma nova linha
function insertMais(cpfCompra, produtoCompra) {
  console.log("Inserindo compras");
  var compra = [cpfCompra, produtoCompra];
  var table = document.getElementById("myTable");
  var row = table.insertRow();
  row.id = `${rowId++}`; // atribui um id à linha e incrementa o contador

  //Repita onde( inteiro "i" = 0 e menor que o numero de itens, some 1)
  for (var i = 0; i < compra.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = compra[i];
  }
}

//Função para alterar um compra
function updateCompra(idCompra, cpfCompra, produtoCompra) {
  //Criação do objeto
  const formData = new FormData();
  formData.append("cpf", cpfCompra);
  formData.append("produto", produtoCompra);

  //put do objeto
  let url = "http://127.0.0.1:5003/compra?id=" + idCompra;
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

//busca um compra
function buscarCompra() {
  console.log("Buscando compra");
  document.getElementById("att2").style.display = "block";
  let inputID = document.querySelectorAll("#getId");
  let inputCpf = document.querySelectorAll("#getCpf");
  let inputProduto = document.querySelectorAll("#getProduto");
  let Compra;

  let buscar = document.getElementById("buscar");
  buscar.remove();

  for (let k = 0; k < inputID.length; k++) {
    Compra = inputID[k].value; // Salva o valor do campo aqui         }
    if (Compra != "") {
      console.log("id");
      buscaGet("id", Compra);
    } else {
      Compra = inputCpf[k].value;
      if (Compra != "") {
        console.log("cpf");
        buscaGetmais("cpf", Compra);
      } else {
        Compra = inputProduto[k].value;
        if (Compra != "") {
          console.log("produto");
          buscaGetmais("produto", Compra);
        }
      }
    }
  }
}

//Consulta para id
function buscaGet(ParametroUrl, paramentroCompra) {
  let url =
    "http://127.0.0.1:5003/compra" +
    ParametroUrl +
    "?" +
    ParametroUrl +
    "=" +
    paramentroCompra;

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
        insertUm(data.cpf, data.produto);
      } else {
        alert("Compra não encontrada");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

//Consulta para varios
function buscaGetmais(ParametroUrl, paramentroCompra) {
  let url =
    "http://127.0.0.1:5003/compras" +
    ParametroUrl +
    "?" +
    ParametroUrl +
    "=" +
    paramentroCompra;

  //get do objeto
  console.log("get");
  console.log(url);
  fetch(url, {
    method: "get",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.compras);
      if (data.compras != 0) {
        data.compras.forEach((Compra) =>
          insertMais(Compra.cpf, Compra.produto)
        );
      } else {
        alert("Prodduto não encontrado");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function getListCpf() {
  limparDados();
  let url = "http://127.0.0.1:5002/clientes";
  console.log("get");
  console.log(url);
  fetch(url, {
    method: "get",
  })
    .then((response) => response.json())
    .then((data) => {
      let select = document.getElementById("getCpf");
      select.innerHTML = ""; // Limpa o select
      data.clientes.forEach((item) => {
        let option = document.createElement("option");
        option.value = item.cpf;
        option.text = item.cpf;
        select.appendChild(option);
      });

      // Adicione um evento de mudança aqui
      select.onchange = function () {
        getName(this.value);
        console.log('Você selecionou a opção: ' + this.value);
        // Adicione sua lógica aqui
      };

      data.clientes.forEach((item) => pegaListaId(item.cpf));
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function getListProduto() {
  limparDados();
  let url = "http://127.0.0.1:5001/produtos";
  console.log("get");
  console.log(url);
  fetch(url, {
    method: "get",
  })
    .then((response) => response.json())
    .then((data) => {
      let select = document.getElementById("getProduto");
      select.innerHTML = ""; // Limpa o select
      data.produtos.forEach((produto) => {
        let option = document.createElement("option");
        option.value = produto.nome;
        option.text = produto.nome;
        select.appendChild(option);
      });
      data.produtos.forEach((produto) => pegaListaId(produto.id));
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

let nomeComprador;
function getName(cpf) {
  limparDados();
  let url = "http://127.0.0.1:5002/clientescpf?" + cpf;
  console.log("get");
  console.log(url);
  fetch(url, {
    method: "get",
  })
    .then((response) => response.json())
    .then((data) => {
      data.cliente.forEach((cliente) => {
        nomeComprador = cliente.nome;
      });
      console.log(nomeComprador); // Mova esta linha para aqui
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
