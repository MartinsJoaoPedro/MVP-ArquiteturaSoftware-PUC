function setCep(celula) {
  if (edicao == false) {
    var cep = celula.innerHTML;
    // Chama a função getEndereco com o CEP
    getEndereco(cep);
  }
}

// Esta função obtém o CEP digitado do campo de texto
function getEndereco(cep) {
  // Limpa os resultados anteriores
  document.getElementById("resultados").innerHTML = "";

  fetch("https://viacep.com.br/ws/" + cep + "/json/")
    .then((response) => response.json())
    .then((data) => {
      const resultadosDiv = document.getElementById("resultados");
      for (const [key, value] of Object.entries(data)) {
        const dataDiv = document.createElement("div");
        const keySpan = document.createElement("span");
        keySpan.textContent = `${key}: `;
        keySpan.style.fontWeight = "bold";
        dataDiv.appendChild(keySpan);
        const valueSpan = document.createElement("span");
        valueSpan.textContent = value;
        dataDiv.appendChild(valueSpan);
        resultadosDiv.appendChild(dataDiv);
      }
      // Exibe o modal
      const modal = document.getElementById("myModal");
      modal.style.display = "block";
    });
}

// Esta função obtém o CEP da URL
function getCepFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("cep");
}

// Função para exibir os resultados
function exibirResultados(data) {
  const resultadosDiv = document.getElementById("resultados");
  resultadosDiv.innerHTML = `
      <h2>Resultados</h2>
      <p><strong>CEP:</strong> ${data.cep}</p>
      <p><strong>Logradouro:</strong> ${data.logradouro}</p>
      <p><strong>Complemento:</strong> ${data.complemento}</p>
      <p><strong>Bairro:</strong> ${data.bairro}</p>
      <p><strong>Cidade:</strong> ${data.localidade}</p>
      <p><strong>Estado:</strong> ${data.uf}</p>
  `;
}

// Obtém o elemento que fecha o modal
var span = document.getElementById("close");

// Quando o usuário clica no elemento (x), fecha o modal
span.onclick = function () {
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
};

// Quando o usuário clica em qualquer lugar fora do modal, fecha-o
window.onclick = function (event) {
  var modal = document.getElementById("myModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
