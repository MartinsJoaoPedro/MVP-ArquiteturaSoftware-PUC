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
  span.className = "edit";
  span.appendChild(txt);
  item.appendChild(span);
}

//Função para limpar os valores da tabela
function limparDados() {
  document.getElementById("getNome").value = "";
  document.getElementById("getCPF").value = "";
  document.getElementById("getCEP").value = "";
}

//Altera de pagina cliente
function cliente() {
  console.log("click cliente");
  window.location.href = "cliente.html";
}

//Altera de pagina cliente
function produto() {
  console.log("click validade");
  window.location.href = "produto.html";
}

//Altera de pagina busca
function busca() {
  console.log("click sacola");
  window.location.href = "busca.html";
}

//Altera de pagina endereço
function endereco() {
  console.log("click endereco");
  window.location.href = "endereco.html";
}

/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/

function getList() {
  let url = "http://127.0.0.1:5000/clientes";
  console.log("get");
  console.log(url);
  fetch(url, {
    method: "get",
  })
    .then((response) => response.json())
    .then((data) => {
      data.clientes.forEach((item) =>
        insertList(item.cpf, item.nome, item.cep)
      );
      data.clientes.forEach((item) => pegaListaId(item.cpf));
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para colocar um item do estoque na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/

//Função para colocar um item do cliente na lista do servidor via requisição POST
async function postItem(inputCpf, inputNome, inputCep) {
  //Criação do objeto
  const formData = new FormData();
  formData.append("cpf", inputCpf);
  formData.append("nome", inputNome);
  formData.append("cep", inputCep);
  console.log("Formulário");
  for (var pair of formData.entries()) {
    console.log(pair[0] + ", " + pair[1]);
  }
  //post do objeto
  let url = "http://127.0.0.1:5000/cliente";
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

//Função para remover um item do cliente da lista de acordo com o click no botão close
function Remover() {
  let close = document.getElementsByClassName("close"); // Seleciona todas as células da tabela com a classe close
  // var table = document.getElementById('myTable');
  for (let i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const cpfCliente = div.getElementsByTagName("td")[0].innerHTML;
      console.log(cpfCliente);

      let linha = this.parentNode.parentElement; // Seleciona a linha que contém a célula clicada
      let idLinha = linha.id - 1;
      id = ids[idLinha]; //Id do cliente referente a linha

      if (confirm("Você tem certeza?")) {
        div.remove();
        deletarClienteId(id);
        alert("Removido!");
      }
    };
  }
}

// Adicionando evento de clique ao botão
function Editar() {
  let celulasBtnEditar = document.querySelectorAll(" .edit"); // Seleciona todas as células da tabela com a classe edit

  for (let i = 0; i < celulasBtnEditar.length; i++) {
    celulasBtnEditar[i].onclick = function () {
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
      }

      // Adiciona um botão de salvar à linha
      let celulaEditar = this.parentNode;
      let salvar = document.createElement("span");
      salvar.innerHTML = "Salvar";
      salvar.classList.add("addBtn");
      celulaEditar.appendChild(salvar);

      // Adiciona um evento de clique ao botão de salvar
      salvar.onclick = function () {
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
        let cep = inputs[2].value;

        celulasDaLinha[0].innerHTML = cpf;
        celulasDaLinha[1].innerHTML = nome;
        celulasDaLinha[2].innerHTML = cep;

        //Pega o id referente a coluna clicada
        idLinhaUpdate = idLinha - 1;
        let id = ids[idLinhaUpdate];

        console.log("cliente");
        console.log(id);
        console.log(cpf);
        console.log(nome);
        console.log(cep);
        console.log("============");

        updateCliente(cpf, nome, cep);
      };
    };
  }
}

//Função para deletar um item do cliente da lista do servidor via requisição DELETE
function deletarCliente(cpfCliente) {
  console.log("CPF do cliente");
  console.log(cpfCliente);
  let url = "http://127.0.0.1:5000/cliente?cpf=" + cpfCliente;
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

//Função para deletar um item do cliente da lista utilizando o ID do servidor via requisição DELETE
function deletarClienteId(IdItem) {
  console.log("ID do item");
  console.log(IdItem);
  let url = "http://127.0.0.1:5000/cliente?cpf=" + IdItem;
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

//Função para adicionar um novo item do cliente com cpf, nome e cep
function newItem() {
  let cpf = document.getElementById("getCPF").value;
  let nome = document.getElementById("getNome").value;
  let cep = document.getElementById("getCEP").value;

  if (cpf === "") {
    alert("Escreva o CPF de um cliente!");
  } else if (nome === "") {
    alert("Escreva o nome de um cliente!");
  } else if (cep === "") {
    alert("Escreva o CEP de um cliente!");
  } else {
    //Acrescenta o item do cliente na lista do site
    insertList(cpf, nome, cep);
    //Envia um comando post para api
    postItem(cpf, nome, cep);
    cliente(); //evita bug apos adicionar uma linha
    alert("Cliente adicionado!");
  }
}

let rowId = 1;
//Função para inserir items ao cliente na lista apresentada
function insertList(cpfCliente, nome, cep) {
  var item = [cpfCliente, nome, cep];
  var table = document.getElementById("myTable");
  var row = table.insertRow();
  row.id = `${rowId++}`; // atribui um id à linha e incrementa o contador

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
    cel.classList.add("linhaEditavel"); // Adiciona a classe .linhaEditavel à célula
  }
  inserirBtnRemover(row.insertCell(-1));
  inserirBtnEditar(row.insertCell(-1));

  limparDados();
  Remover();
  Editar();
}

//primeiro remove todas as linhas da tabela (exceto a primeira linha, que geralmente é o cabeçalho da tabela) e então insere uma nova linha
function insertUm(cpfCliente, nome, cep) {
  var item = [cpfCliente, nome, cep];
  var table = document.getElementById("myTable");
  while (table.rows.length > 1) {
    table.deleteRow(1);
  }
  var row = table.insertRow();
  row.id = `${rowId++}`; // atribui um id à linha e incrementa o contador

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
}

//Insere uma nova linha
function insertMais(cpfCliente, nome, cep) {
  var item = [cpfCliente, nome, cep];
  var table = document.getElementById("myTable");
  var row = table.insertRow();
  row.id = `${rowId++}`; // atribui um id à linha e incrementa o contador

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
}

//Função para alterar um cliente
function updateCliente(cpfCliente, nomeCliente, cepCliente) {
  //Criação do objeto
  const formData = new FormData();
  formData.append("nome", nomeCliente);
  formData.append("cep", cepCliente);

  //put do objeto
  let url = "http://127.0.0.1:5000/cliente?cpf=" + cpfCliente;
  console.log("put");
  console.log(url);
  fetch(url, {
    method: "put",
    body: formData,
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error:", error);
    });
}

function buscarCliente() {
  document.getElementById("att2").style.display = "block";
  let inputCPF = document.querySelectorAll("#getCPF");
  let inputNome = document.querySelectorAll("#getNome");
  let inputCEP = document.querySelectorAll("#getCEP");
  let Cliente;

  let buscar = document.getElementById("buscar");
  buscar.remove();

  for (let k = 0; k < inputCPF.length; k++) {
    Cliente = inputCPF[k].value;
    if (Cliente != "") {
      console.log("cpf");
      buscaGet("cpf", Cliente);
    } else {
      Cliente = inputNome[k].value;
      if (Cliente != "") {
        console.log("nome");
        buscaGetmais("nome", Cliente);
      } else {
        Cliente = inputCEP[k].value;
        if (Cliente != "") {
          console.log("cep");
          buscaGetmais("cep", Cliente);
        }
      }
    }
  }
}

function buscaGet(ParametroUrl, paramentroCliente) {
  let url =
    "http://127.0.0.1:5000/cliente" +
    ParametroUrl +
    "?" +
    ParametroUrl +
    "=" +
    paramentroCliente;

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
        insertUm(data.cpf, data.nome, data.cep);
      } else {
        alert("Cliente não encontrado");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function buscaGetmais(ParametroUrl, paramentroCliente) {
  let url =
    "http://127.0.0.1:5000/clientes" +
    ParametroUrl +
    "?" +
    ParametroUrl +
    "=" +
    paramentroCliente;

  //get do objeto
  console.log("get");
  console.log(url);
  fetch(url, {
    method: "get",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.clientes);
      if (data.clientes != null) {
        data.clientes.forEach((item) =>
          insertMais(item.cpf, item.nome, item.cep)
        );
      } else {
        alert("Clientes não encontrados");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
