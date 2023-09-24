//Função com tratamento TyperError
function TratamentoTypeError() {
  console.log(
    "Ocorreu um erro ao buscar a lista de compras. Por favor, tente novamente mais tarde.",
  );
}

//Função com tratamento Fetch
function TratamentoFetchError() {
  console.log(
    "Não foi possível conectar ao servidor. Por favor, verifique se o servidor está em execução e tente novamente.",
  );
}

function getList(porta, back, handleData) {
  limparDados();
  let url = "http://127.0.0.1:" + porta + "/" + back;
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
        if (data[back] !== null) {
          handleData(data[back]);
        } else {
          console.log("Não encontrado");
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

//Função para colocar um item do produto na lista do servidor via requisição POST
async function post(porta, back, formData) {
  //post do objeto
  let url = "http://127.0.0.1:" + porta + "/" + back;
  console.log("post");
  console.log(url);
  try {
    fetch(url, {
      method: "post",
      body: formData,
    })
      //a resposta deve ser convertida em json
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
    console.error("TypeError:", error.message);
  }
}

function deletarId(porta, back, id) {
  if (back == "cliente") {
    nomeId = "cpf";
  } else {
    nomeId = "id";
  }
  let url = "http://127.0.0.1:" + porta + "/" + back + "?" + nomeId + "=" + id;
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
    console.error("TypeError:", error.message);
  }
}

//Função para alterar um compra
function update(porta, back, id, formData) {
  if (back == "cliente") {
    nomeId = "cpf";
  } else {
    nomeId = "id";
  }
  //put do objeto
  let url = "http://127.0.0.1:" + porta + "/" + back + "?" + nomeId + "=" + id;
  console.log("put");
  console.log(url);
  try {
    fetch(url, {
      method: "put",
      body: formData,
    })
      //a resposta deve ser convertida em json
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

//Método chave para diversa funções de get
function get(porta, back, formData, ParametroUrl, paramentroCompra) {
  let url =
    "http://127.0.0.1:" +
    porta +
    "/" +
    back +
    ParametroUrl +
    "?" +
    ParametroUrl +
    "=" +
    paramentroCompra;

  //get do objeto
  console.log("get");
  try {
    console.log(url);
    fetch(url, {
      method: "get",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        //Condição pra entrada vazia
        if (data !== null) {
          console.log("data");
          formData(data);
        } else {
          console.log("Não encontrado");
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
