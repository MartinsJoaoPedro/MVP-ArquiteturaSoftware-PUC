//Função com tratamento TyperError
function TratamentoTypeError(error) {
  console.log(
    "Ocorreu um erro ao buscar a lista de compras. Por favor, tente novamente mais tarde.",
  );
  console.error("TypeError:", error.message);
}

//Função com tratamento Fetch
function TratamentoFetchError() {
  console.log(
    "Não foi possível conectar ao servidor. Por favor, verifique se o servidor está em execução e tente novamente.",
  );
}

//Função base para criação de outras funções com tratamento
function getListTratamneto(api) {
  limparDados();
  let url = "http://127.0.0.1:5003/" + api;
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
        // manipulação de dados
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
    console.error("Error:", error);
  }
}