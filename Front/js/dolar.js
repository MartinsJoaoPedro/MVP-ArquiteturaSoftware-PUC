//Script do código da api para exibição do valor em dolar
function setPreco(celula) {
  if (edicao == false) {
    var valor = celula.innerHTML;
    // Chama a função getCotacao com o valor
    getCotacao(valor);
  }
}

// Esta função obtém a cotação do valor digitado
function getCotacao(valor) {
  //formata o valor para que possa ser legível para api
  valor = valor.replace("R$&nbsp;", "").replace(/\./g, "").replace(",", ".");
  // Limpa os resultados anteriores
  document.getElementById("resultados").innerHTML = "";

  fetch("https://economia.awesomeapi.com.br/last/USD-BRL")
    .then((response) => response.json())
    .then((data) => {
      const cotacao = data.USDBRL.ask;
      const valorEmDolar = valor / cotacao;

      const resultadosDiv = document.getElementById("resultados");
      const dataDiv = document.createElement("div");
      const valorSpan = document.createElement("span");
      valorSpan.textContent = `Valor em dólar: `;
      valorSpan.style.fontWeight = "bold";
      dataDiv.appendChild(valorSpan);
      const cotacaoSpan = document.createElement("span");
      cotacaoSpan.textContent = valorEmDolar.toFixed(2);
      dataDiv.appendChild(cotacaoSpan);
      resultadosDiv.appendChild(dataDiv);

      // Exibe o modal
      const modal = document.getElementById("myModal");
      modal.style.display = "block";
    });
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
