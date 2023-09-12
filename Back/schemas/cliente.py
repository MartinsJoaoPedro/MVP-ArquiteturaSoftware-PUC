from pydantic import BaseModel
from typing import Optional, List
from model.cliente import Cliente


class ClienteSchema(BaseModel):
    """ Define como um novo cliente a ser inserido deve ser representado
    """
    cpf: str = "000.000.000-31"
    nome: str = "Banana Prata"
    cep: str = "00000000"


class ClienteBuscaSchema(BaseModel):
    """ Define como deve ser a estrutura que representa a busca. Que será
        feita apenas com base no nome do cliente.
    """
    cpf: str = "000.000.000-31"


# class clienteBuscaSchemaId(BaseModel):
#     """ Define como deve ser a estrutura que representa a busca. Que será
#         feita apenas com base no nome do cliente.
#     """
#     id: int = 1

class ClienteBuscaSchemaNome(BaseModel):
    """ Define como deve ser a estrutura que representa a busca. Que será
        feita apenas com base no nome do cliente.
    """
    nome: str = "Banana Prata"


class ClienteBuscaSchemaCep(BaseModel):
    """ Define como deve ser a estrutura que representa a busca. Que será
        feita apenas com base no nome do cliente.
    """
    cep: str = "00000000"


class ListagemClientesSchema(BaseModel):
    """ Define como uma listagem de clientes será retornada.
    """
    clientes: List[ClienteSchema]


def apresenta_clientes(clientes: List[Cliente]):
    """ Retorna uma representação do cliente seguindo o schema definido em
        clienteViewSchema.
    """
    result = []
    for cliente in clientes:
        result.append({
            "cpf": cliente.cpf,
            "nome": cliente.nome,
            "cep": cliente.cep,
        })

    return {"clientes": result}


class ClienteViewSchema(BaseModel):
    """ Define como um cliente será retornado: cliente.
    """
    cpf: str = "000.000.000-31"
    nome: str = "Banana Prata"
    cep: str = "00000000"


class ClienteDelSchema(BaseModel):
    """ Define como deve ser a estrutura do dado retornado após uma requisição
        de remoção.
    """
    mesage: str
    nome: str


class ClienteUpdateSchema(BaseModel):
    nome: str = "Banana Prata"
    cep: str = "00000000"


def apresenta_cliente(cliente: Cliente):
    """ Retorna uma representação do cliente seguindo o schema definido em
        clienteViewSchema.
    """
    return {
        "cpf": cliente.cpf,
        "nome": cliente.nome,
        "cep": cliente.cep,
    }
