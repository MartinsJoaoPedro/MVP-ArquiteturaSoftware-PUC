//Esse código js é um dos 3 códigos principais ele contrala os htmls de cliente

//Váriaveis globais
let ids = [];
let id;
let edicao = true;

//Chamada da função para carregamento inicial dos dados
if (window.location.href.indexOf("cadastroCliente.html") !== -1) {
  console.log("Carregamento");
  getListCliente();
}

//Chamada da função para carregamento inicial dos dados
if (window.location.href.indexOf("consultaCliente.html") !== -1) {
  console.log("Carregamento");
}

// Adiciona 'idn' à lista 'ids'
function pegaListaId(idn) {
  ids.push(idn);
}

//Função para colocar o botão de remover
function inserirBtnRemover(cliente) {
  console.log("botão de remoção");
  let span = document.createElement("span");
  //u00D7 == x
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  //x está no span
  span.appendChild(txt);
  //span está no paramentro parent
  cliente.appendChild(span);
}

//Função para colocar o botão de editar
function inserirBtnEditar(cliente) {
  console.log("botão de edição");
  let span = document.createElement("span");
  //“PENCIL” emoji
  let txt = document.createTextNode("\u270F");
  span.className = "edit";
  //“PENCIL” está no span
  span.appendChild(txt);
  //span está no paramentro parent
  cliente.appendChild(span);
}

//Função para limpar os valores da tabela
function limparDados() {
  console.log("limpar");
  //Impede a edição
  edicao = false;
  document.getElementById("getNome").value = "";
  document.getElementById("getCpf").value = "";
  document.getElementById("getCep").value = "";
}

//Função para obter a lista existente do servidor via requisição GET
function getListCliente() {
  limparDados();
  getList("5002", "clientes", formClientes);
  function formClientes(clientes) {
    clientes.forEach((item) => insertList(item.cpf, item.nome, item.cep));
    clientes.forEach((item) => pegaListaId(item.cpf));
  }
}

//Função para colocar um item do produto na lista do servidor via requisição POST
async function postCliente(inputCpf, inputNome, inputCep) {
  const formData = new FormData();
  formData.append("cpf", inputCpf);
  formData.append("nome", inputNome);
  formData.append("cep", inputCep);
  post("5002", "cliente", formData);
}

//Função para remover um item do cliente da lista de acordo com o click no botão close
function remover() {
  console.log("Remover");
  let close = document.getElementsByClassName("close"); // Seleciona todas as células da tabela com a classe close
  // var table = document.getElementById('myTable');
  for (let i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const cpf = div.getElementsByTagName("td")[0].innerHTML;

      let linha = this.parentNode.parentElement; // Seleciona a linha que contém a célula clicada
      let idLinha = linha.id - 1;
      id = ids[idLinha]; //Id do cliente referente a linha

      console.log(id);
      if (confirm("Você tem certeza?")) {
        div.remove();
        deletarClienteId(id);
        alert("Removido!");
      }
    };
  }
}

function editar() {
  console.log("Editar");
  let celulasBtnEditar = document.querySelectorAll(".edit");

  for (let i = 0; i < celulasBtnEditar.length; i++) {
    celulasBtnEditar[i].onclick = function () {
      //Libera a edição
      edicao = true;
      for (let i = 0; i < celulasBtnEditar.length; i++) {
        celulasBtnEditar[i].style.display = "none";
      }

      let linha = this.parentNode.parentElement;
      let idLinha = linha.id;

      let celulasDaLinhaGeral = document.getElementById(idLinha);
      // Obtenha o valor do CPF diretamente da tabela
      let celulaCpf = celulasDaLinhaGeral.querySelectorAll(".linhaId");
      cpf = celulaCpf[0].innerText;
      let celulasDaLinha =
        celulasDaLinhaGeral.querySelectorAll(".linhaEditavel");

      idLinha++;

      for (let j = 0; j < celulasDaLinha.length; j++) {
        let input = document.createElement("input");
        input.type = "text";
        input.value = celulasDaLinha[j].innerHTML;
        celulasDaLinha[j].innerHTML = "";
        celulasDaLinha[j].appendChild(input);

        if (j == 0) {
          // Aplique a máscara ao novo campo de entrada
          $(input).on("input", function () {
            this.value = this.value.replace(/[^a-zA-Z\u00C0-\u00FF\s]/g, "");
          });
        }
        if (j == 1) {
          $(input).mask("00000-000");
        }
      }

      let celulaEditar = this.parentNode;
      let salvar = document.createElement("span");
      salvar.innerHTML = "Salvar";
      salvar.classList.add("addBtn");
      celulaEditar.appendChild(salvar);

      salvar.onclick = function () {
        //Impede a edição
        edicao = false;

        // Obtém os valores dos inputs
        let inputs = linha.getElementsByTagName("input");
        // Obtenha os valores de Nome e CEP dos campos de entrada HTML
        let nome = inputs[0].value;
        let cep = inputs[1].value;
        celulasDaLinha[0].innerHTML = nome;
        celulasDaLinha[1].innerHTML = cep;

        // Verifique se os campos de entrada HTML para Nome e CEP não estão vazios
        if (nome === "" || cep === "") {
          alert("Por favor, preencha todos os campos.");
          return;
        }

        idLinha--;

        salvar.remove();

        for (let i = 0; i < celulasBtnEditar.length; i++) {
          celulasBtnEditar[i].style.display = "";
        }

        idLinhaUpdate = idLinha - 1;
        let id = ids[idLinhaUpdate];

        updateCliente(cpf, nome, cep);
      };
    };
  }
}

//Função para deletar um item do cliente da lista utilizando o cpf do servidor via requisição DELETE
function deletarCliente(cpf) {
  let url = "http://127.0.0.1:5002/cliente?cpf=" + cpf;
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
    console.error("Error:", error);
  }
}

//Função para deletar um item do cliente da lista utilizando o ID do servidor via requisição DELETE
function deletarClienteId(cpfCliente) {
  deletarId("5002", "cliente", cpfCliente);
}

//Função para adicionar um novo item do cliente com cpf, nome e cep
function newItem() {
  console.log("novo item");
  let cpf = document.getElementById("getCpf").value;
  let nome = document.getElementById("getNome").value;
  let cep = document.getElementById("getCep").value;

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
    postCliente(cpf, nome, cep);
    //evita bug apos adicionar uma linha
    alert("Cliente adicionado!");
  }
}

let rowId = 1;
//Função para inserir items ao cliente na lista apresentada
function insertList(cpf, nome, cep) {
  console.log("Inserindo clientes");
  var item = [cpf, nome, cep];
  var table = document.getElementById("myTable");
  var row = table.insertRow();
  row.id = `${rowId++}`; // atribui um id à linha e incrementa o contador

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
    if (i == 0) {
      cel.classList.add("linhaId"); // Adiciona a classe .linhaId à célula
    } else {
      cel.classList.add("linhaEditavel"); // Adiciona a classe .linhaEditavel à célula
    }

    // Adiciona um evento de clique à célula do nome
    if (i == 1) {
      // Supondo que o nome seja o segundo item na lista
      cel.classList.add("nome"); // Adiciona a classe .nome à célula do nome
      cel.onclick = function () {
        setNome(this);
      };
    }
    // Adiciona um evento de clique à célula do CEP
    if (i == 2) {
      // Supondo que o CEP seja o terceiro item na lista
      cel.classList.add("cep"); // Adiciona a classe .cep à célula do CEP
      cel.onclick = function () {
        setCep(this);
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
function insertUmCliente(cpf, nome, cep) {
  console.log("Inserindo cliente único");
  var item = [cpf, nome, cep];
  var table = document.getElementById("myTable");
  while (table.rows.length > 1) {
    table.deleteRow(1);
  }
  var row = table.insertRow();
  row.id = `${rowId++}`; // atribui um id à linha e incrementa o contador

  // repita onde(inteiro "i" = 0 e menor que o numero de itens, some 1)
  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  inserirBtnRemover(row.insertCell(-1));
  inserirBtnEditar(row.insertCell(-1));
}

//Insere uma nova linha
function insertMaisCliente(cpf, nome, cep) {
  console.log("Inserindo clientes");
  var item = [cpf, nome, cep];
  var table = document.getElementById("myTable");
  var row = table.insertRow();
  row.id = `${rowId++}`; // atribui um id à linha e incrementa o contador

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  inserirBtnRemover(row.insertCell(-1));
  inserirBtnEditar(row.insertCell(-1));
}

//Função para alterar um cliente
function updateCliente(cpf, nome, cep) {
  //Criação do objeto
  const formData = new FormData();
  formData.append("nome", nome);
  formData.append("cep", cep);

  //put do objeto
  update("5002", "cliente", cpf, formData);
}

//busca um cliente
function buscarCliente() {
  console.log("Buscando cliente");
  document.getElementById("att2").style.display = "block";
  let inputCPF = document.querySelectorAll("#getCpf");
  let inputNome = document.querySelectorAll("#getNome");
  let inputCEP = document.querySelectorAll("#getCep");
  let Cliente;

  let buscar = document.getElementById("buscar");
  buscar.remove();

  for (let k = 0; k < inputCPF.length; k++) {
    Cliente = inputCPF[k].value;
    if (Cliente != "") {
      getCliente("cpf", Cliente);
    } else {
      Cliente = inputNome[k].value;
      if (Cliente != "") {
        getMaisClientes("nome", Cliente);
      } else {
        Cliente = inputCEP[k].value;
        if (Cliente != "") {
          getMaisClientes("cep", Cliente);
        }
      }
    }
  }
}

function buscarCompraTodas() {
  getListCliente();

  //remove o botão impede que sejam adicinadas repetições
  let buscar = document.getElementById("buscarTodos");
  buscar.remove();
}

//Consulta para cpf
function getCliente(ParametroUrl, paramentroCliente) {
  console.log("buscaGet");
  get("5002", "cliente", formClientes, ParametroUrl, paramentroCliente);
  function formClientes(cliente) {
    // Código para lidar com clientes
    insertUmCliente(cliente.cpf, cliente.nome, cliente.cep);
  }
}

//Consulta para varios
function getMaisClientes(ParametroUrl, paramentroCliente) {
  console.log("buscaGetMais");
  get("5002", "clientes", formClientes, ParametroUrl, paramentroCliente);
  function formClientes(clientes) {
    let cliente = clientes.cliente;
    //Lista a ser processada
    cliente.forEach((item) => {
      insertMaisCliente(item.cpf, item.nome, item.cep);
    });
  }
}
