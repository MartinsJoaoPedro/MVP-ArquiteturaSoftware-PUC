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
  getEndereco();

}

function getEndereco() {
  document.querySelector('#cep-data').innerHTML = '';
  let inputCep = document.querySelector("#getCep").value;

  fetch('https://viacep.com.br/ws/' + inputCep + '/json/')
    .then(response => response.json())
    .then(data => {
      const cepDataList = document.querySelector('#cep-data');
      for (const [key, value] of Object.entries(data)) {
        const listItem = document.createElement('li');
        listItem.textContent = `${key}: ${value}`;
        cepDataList.appendChild(listItem);
      }
    });
}
