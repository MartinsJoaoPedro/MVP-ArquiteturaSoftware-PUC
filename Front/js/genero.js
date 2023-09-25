//Script do código da api para exibição do genero baseado no nome de um cliente
function setNome(celula) {
  if (edicao == false) {
    var nome = celula.innerHTML;
    // Chama a função getGender com o nome
    getGender(nome);
  }
}

// Esta função obtém o gênero do nome digitado
function getGender(nome) {
  // Limpa os resultados anteriores
  document.getElementById("resultados").innerHTML = "";

  fetch("https://api.genderize.io?name=" + nome)
    .then((response) => response.json())
    .then((data) => {
      const resultadosDiv = document.getElementById("resultados");
      if (data.gender) {
        const dataDiv = document.createElement("div");
        const keySpan = document.createElement("span");
        keySpan.textContent = "Gênero: ";
        keySpan.style.fontWeight = "bold";
        dataDiv.appendChild(keySpan);
        const valueSpan = document.createElement("span");
        // Substitui 'female' por 'Mulher' e 'male' por 'Homem'
        valueSpan.textContent = data.gender === 'female' ? 'Mulher' : data.gender === 'male' ? 'Homem' : data.gender;
        dataDiv.appendChild(valueSpan);
        resultadosDiv.appendChild(dataDiv);
      }
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
