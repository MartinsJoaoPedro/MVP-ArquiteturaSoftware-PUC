from pydantic import BaseModel
from typing import Optional, List
from model.cliente import Cliente


class ClienteSchema(BaseModel):
    """Define como um novo cliente a ser inserido sem o id deve ser representado"""

    cpf: str = "000.000.000-00"
    nome: str = "João"
    cep: str = "00000-000"


class ClienteSchemaCpf(BaseModel):
    """Define como deve ser a estrutura que representa a buscado cpf do cliente."""

    cpf: str = "000.000.000-00"


class ClienteSchemaNome(BaseModel):
    """Define como deve ser a estrutura que representa a buscado nome do cliente."""

    nome: str = "João"


class ClienteSchemaCep(BaseModel):
    """Define como deve ser a estrutura que representa a busca do cep do cliente."""

    cep: str = "00000-000"


def apresenta_cliente(cliente: Cliente):
    """Retorna uma representação do cliente seguindo o schema definido em
    clienteViewSchema.
    """
    return {
        "cpf": cliente.cpf,
        "nome": cliente.nome,
        "cep": cliente.cep,
    }


class ListagemClientesSchema(BaseModel):
    """Define como uma listagem de clientes será retornada."""

    clientes: List[ClienteSchema]


def apresenta_clientes(clientes: List[Cliente]):
    """Retorna uma representação do cliente seguindo o schema definido em
    clienteViewSchema.
    """
    result = []
    for cliente in clientes:
        result.append(
            {
                "cpf": cliente.cpf,
                "nome": cliente.nome,
                "cep": cliente.cep,
            }
        )

    return {"clientes": result}
