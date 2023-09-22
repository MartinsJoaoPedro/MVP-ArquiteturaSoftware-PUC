//Esse código js é um dos 3 códigos principais ele contrala os htmls de compra

//Váriaveis globais
let ids = [];
let id;
let edicao = true;

//Chamada da função para carregamento inicial dos dados
if (window.location.href.indexOf("cadastroCompra.html") !== -1) {
  console.log("Carregado");
  getListCompra();
  getListCpfCompra();
  getListProdutoCompra();
  console.log("Carregamento");
}

//Chamada da função para carregamento inicial dos dados
if (window.location.href.indexOf("consultaCompra.html") !== -1) {
  console.log("Carregado");

  //Preencher os campos de seleção
  getListCpfCompra();
  getListProdutoCompra();

  //Pega os elementos
  let id = document.getElementById("getId");
  let cpf = document.getElementById("getCpf");
  let produto = document.getElementById("getProduto");

  //Ao clicar em um campo eu limpo o outro
  id.onclick = function () {
    cpf.value = "";
    produto.value = "";
  };

  produto.onclick = function () {
    cpf.value = "";
    id.value = "";
  };

  cpf.onclick = function () {
    produto.value = "";
    id.value = "";
  };
}

//Essa função serve para controlar a lista de ids da página
function pegaListaId(idn) {
  //Adiciona 'idn' à lista 'ids'
  ids.push(idn);
}

//Função para colocar o botão de remover
function inserirBtnRemover(compra) {
  console.log("botão de remoção");
  let span = document.createElement("span");
  //u00D7 == x
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  //x está no span
  span.appendChild(txt);
  //span está no paramentro parent
  compra.appendChild(span);
}

//Função para colocar o botão de editar
function inserirBtnEditar(compra) {
  console.log("botão de edição");
  let span = document.createElement("span");
  //“PENCIL” emoji
  let txt = document.createTextNode("\u270F");
  span.className = "edit";
  //“PENCIL” está no span
  span.appendChild(txt);
  //span está no paramentro parent
  compra.appendChild(span);
}

//Função para limpar os valores da tabela
function limparDados() {
  console.log("limpar");
  //Impede a edição
  edicao = false;
  document.getElementById("getCpf").value = "";
  document.getElementById("getProduto").value = "";
}

//Função para obter a lista existente do servidor via requisição GET
function getListCompra() {
  limparDados();
  getList("5003", "compras", handleCompras);
  function handleCompras(compras) {
    compras.forEach((compra) => {
      insertList(compra.cpf, compra.nome, compra.produto);
      pegaListaId(compra.id);
    });
  }
}

//Função para colocar um compra na lista do servidor via requisição POST
async function postCompra(inputCpf, inputNome, inputProduct) {
  //Criação do objeto
  const formData = new FormData();
  formData.append("cpf", inputCpf);
  formData.append("nome", inputNome);
  formData.append("produto", inputProduct);
  post("5003", "compra", formData);
}

//Função para remover um compra da lista de acordo com o click no botão close
function remover() {
  console.log("Remover");
  let close = document.getElementsByClassName("close"); // Seleciona todas as células da tabela com a classe close
  // var table = document.getElementById('myTable');
  for (let i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;

      let linha = this.parentNode.parentElement; // Seleciona a linha que contém a célula clicada
      let idLinha = linha.id - 1;
      const id = ids[idLinha]; //Id do compra referente a linha
      console.log("IdItem:");
      console.log(id);

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
      //Libera a edição
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
        if (j == 0) {
          // Aplique a máscara ao novo campo de entrada
          $(input).mask("000.000.000-00");
        }
        if (j == 1) {
          // Aplique a máscara ao novo campo de entrada
          $(input).on("input", function () {
            this.value = this.value.replace(/[^a-zA-Z\u00C0-\u00FF\s]/g, "");
          });
        }
        if (j == 2) {
          // Aplique a máscara ao novo campo de entrada
          $(input).on("input", function () {
            this.value = this.value.replace(/[^a-zA-Z\u00C0-\u00FF\s]/g, "");
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
        //Impede a edição
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
        let nome = inputs[1].value;
        let produto = inputs[2].value;

        celulasDaLinha[0].innerHTML = cpf;
        celulasDaLinha[1].innerHTML = nome;
        celulasDaLinha[2].innerHTML = produto;

        //Pega o id referente a coluna clicada
        idLinhaUpdate = idLinha - 1;
        let id = ids[idLinhaUpdate];

        console.log("compra");
        console.log(id);
        console.log(cpf);
        console.log(produto);
        console.log("============");
        //updateItem(produto, cpf);
        updateCompra(id, cpf, nome, produto);
      };
    };
  }
}

//Função para deletar um compra da lista utilizando o produto do servidor via requisição DELETE
function deletarCompra(produtoCompra) {
  let url = "http://127.0.0.1:5003/compra?produto=" + produtoCompra;
  console.log("delete");
  console.log(url);
  try {
    fetch(url, {
      method: "delete",
    })
      .then((response) => response.json())
      .catch((error) => {
        if (error instanceof TypeError) {
          TratamentoTypeError(error);
        } else if (error.message === "Failed to fetch") {
          TratamentoFetchError();
        } else {
          // Relance o erro se não for um TypeError ou um erro de conexão
          throw error;
        }
      });
  } catch (error) {
    //console.error("TypeError:", error.message);
  }
}

//Função para deletar um compra da lista utilizando o ID do servidor via requisição DELETE
function deletarCompraId(IdCompra) {
  deletarId("5003", "compra", IdCompra);
}

//Função para adicionar um novo compra com produto e cpf
async function newItem() {
  console.log("novo item");
  let cpf = document.getElementById("getCpf").value;
  let produto = document.getElementById("getProduto").value;

  if (produto === "") {
    alert("Escreva o produto da compra!");
  } else if (cpf === "") {
    alert("Escreva o cpf da compra!");
  } else {
    try {
      let nomeComprador = await getName(cpf);
      console.log("NEWITEM");
      console.log(nomeComprador);
      insertList(cpf, nomeComprador, produto);
      postCompra(cpf, nomeComprador, produto);
      alert("Compra adicionada!");
    } catch (error) {
      console.error(error);
    }
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
function insertUm(cpfCompra, nomeCompra, produtoCompra) {
  console.log("Inserindo compra única");
  var compra = [cpfCompra, nomeCompra, produtoCompra];
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
function insertMais(cpfCompra, nomeCompra, produtoCompra) {
  console.log("Inserindo compras");
  var compra = [cpfCompra, nomeCompra, produtoCompra];
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
function updateCompra(idCompra, cpfCompra, nomeCompra, produtoCompra) {
  //Criação do objeto
  const formData = new FormData();
  formData.append("cpf", cpfCompra);
  formData.append("nome", nomeCompra);
  formData.append("produto", produtoCompra);

  //put do objeto
  update("5003", "compra", idCompra, formData);
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
      console.log("Consulta de id");
      buscaGetCompra("id", Compra);
    } else {
      Compra = inputCpf[k].value;
      if (Compra != "") {
        console.log("Consulta de cpf");
        buscaGetmaisCompra("cpf", Compra);
      } else {
        Compra = inputProduto[k].value;
        if (Compra != "") {
          console.log("Consulta de produto");
          buscaGetmaisCompra("produto", Compra);
        }
      }
    }
  }
}

function buscarCompraTodas() {
  getListCompra();

  //remove o botão impede que sejam adicinadas repetições
  let buscar = document.getElementById("buscarTodos");
  buscar.remove();
}

//Código para gerar os dados de busca
//lista os os clientes e usa o cpf pra pegar o nome
function getListCpfCompra() {
  limparDados();
  let url = "http://127.0.0.1:5002/clientes";
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
        //Condição pra entrada vazia
        if (data.clientes !== null) {
          let select = document.getElementById("getCpf");
          //select.innerHTML = ""; // Limpa o select
          data.clientes.forEach((item) => {
            let option = document.createElement("option");
            option.value = item.cpf;
            option.text = item.cpf;
            select.appendChild(option);
          });
        } else {
          close.log("Clientes não encontrado");
        }
      })
      .catch((error) => {
        if (error instanceof TypeError) {
          TratamentoTypeError(error);
        } else if (error.message === "Failed to fetch") {
          TratamentoFetchError();
        } else {
          // Relance o erro se não for um TypeError ou um erro de conexão
          throw error;
        }
      });
  } catch (error) {
    //console.error("TypeError:", error.message);
  }
}

//lista os produtos
function getListProdutoCompra() {
  limparDados();
  let url = "http://127.0.0.1:5001/produtos";
  console.log("get");
  console.log(url);
  try {
    fetch(url, {
      method: "get",
    })
      .then((response) => response.json())
      .then((data) => {
        //Condição pra entrada vazia
        if (data.produtos !== null) {
          let select = document.getElementById("getProduto");
          //select.innerHTML = ""; // Limpa o select
          data.produtos.forEach((produto) => {
            let option = document.createElement("option");
            option.value = produto.nome;
            option.text = produto.nome;
            select.appendChild(option);
          });
        } else {
          console.log("Produtos não econtrado");
        }
      })
      .catch((error) => {
        if (error instanceof TypeError) {
          TratamentoTypeError(error);
        } else if (error.message === "Failed to fetch") {
          TratamentoFetchError();
        } else {
          // Relance o erro se não for um TypeError ou um erro de conexão
          throw error;
        }
      });
  } catch (error) {
    console.error("TypeError:", error.message);
  }
}

//obter o nome com base em um cpf
function getName(cpf) {
  console.log("getName");
  limparDados();
  let url = "http://127.0.0.1:5002/clientecpf?cpf=" + cpf;
  console.log("get");
  console.log(url);
  return new Promise((resolve, reject) => {
    try {
      fetch(url, {
        method: "get",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.clientes !== null) {
            data.clientes.forEach((item) => resolve(item.nome));
          } else {
            reject("Nome não encontrado");
          }
        })
        .catch((error) => {
          if (error instanceof TypeError) {
            TratamentoTypeError(error);
          } else if (error.message === "Failed to fetch") {
            TratamentoFetchError();
          } else {
            throw error;
          }
        });
    } catch (error) {
      reject(error);
    }
  });
}

//Consulta para id
function buscaGetCompra(ParametroUrl, paramentroCompra) {
  console.log("buscaGet");
  getList("5003", "compras", handleCompras, ParametroUrl, paramentroCompra);
  function handleCompras(compra) {
    compra.forEach((item) => {
      insertUm(item.cpf, item.nome, item.produto);
    });
  }
}

//Consulta para varios
function buscaGetmaisCompra(ParametroUrl, paramentroCompra) {
  console.log("buscaGetMais");
  getList("5003", "compras", handleCompras, ParametroUrl, paramentroCompra);
  function handleCompras(compras) {
    compras.forEach((item) => {
      insertMais(item.cpf, item.nome, item.produto);
    });
  }
}
