function att() {
  let buscar = document.getElementById("buscar");
  buscar.remove();
}

/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/

if (window.location.href.indexOf("endereco.html") !== -1) {
  /*getList();*/
  //getEndereco();
}

// Esta função obtém o CEP digitado do campo de texto
function getEndereco() {
  document.querySelector("#cep-data").innerHTML = "";
  let inputCep = document.querySelector("#getCep").value;

  fetch("https://viacep.com.br/ws/" + inputCep + "/json/")
    .then((response) => response.json())
    .then((data) => {
      const cepDataList = document.querySelector("#cep-data");
      for (const [key, value] of Object.entries(data)) {
        const listItem = document.createElement("li");
        listItem.textContent = `${key}: ${value}`;
        cepDataList.appendChild(listItem);
      }
    });
}

// Esta função obtém o CEP da URL
function getCepFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("cep");
}

// Chama getEnderecoCliente(cep) com o CEP obtido da URL
window.onload = function () {
  const cep = getCepFromUrl();
  if (cep) {
    getEnderecoCliente(cep);
  }
};

function getEnderecoCliente(cep) {
  document.querySelector("#cep-data").innerHTML = "";
  let inputCep = cep;

  fetch("https://viacep.com.br/ws/" + inputCep + "/json/")
    .then((response) => response.json())
    .then((data) => {
      const cepDataList = document.querySelector("#cep-data");
      for (const [key, value] of Object.entries(data)) {
        const listItem = document.createElement("li");
        listItem.textContent = `${key}: ${value}`;
        cepDataList.appendChild(listItem);
      }
    });
}
