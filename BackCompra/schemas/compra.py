from pydantic import BaseModel
from typing import Optional, List
from model.compra import Compra


class CompraViewSchema(BaseModel):
    """Define como um compra será retornado: compra."""

    id: int = 1
    cpf: str = "000.000.000-00"
    nome: str = "João"
    produto: str = "Banana"


class CompraSchema(BaseModel):
    """Define como um novo compra a ser inserido deve ser representado"""

    cpf: str = "000.000.000-00"
    nome: str = "João"
    produto: str = "Banana"


class CompraSchemaId(BaseModel):
    """Define como deve ser a estrutura que representa a busca. Que será
    feita apenas com base no produto do compra.
    """

    id: int = 1


class CompraSchemaCpf(BaseModel):
    """Define como deve ser a estrutura que representa a busca. Que será
    feita apenas com base no produto do compra.
    """

    cpf: str = "000.000.000-00"


class CompraSchemaNome(BaseModel):
    """Define como deve ser a estrutura que representa a busca. Que será
    feita apenas com base no produto do compra.
    """

    nome: str = "João"


class CompraSchemaProduto(BaseModel):
    """Define como deve ser a estrutura que representa a busca. Que será
    feita apenas com base no produto do compra.
    """

    produto: str = "Banana"


def apresenta_compras(compras: List[Compra]):
    """Retorna uma representação do compra seguindo o schema definido em
    compraViewSchema.
    """
    result = []
    for compra in compras:
        result.append(
            {
                "cpf": compra.cpf,
                "nome": compra.nome,
                "produto": compra.produto,
            }
        )

    return {"compras": result}


class ListagemComprasSchema(BaseModel):
    """Define como uma listagem de compras será retornada."""

    compras: List[CompraSchema]


def apresenta_compra(compra: Compra):
    """Retorna uma representação do compra seguindo o schema definido em
    compraViewSchema.
    """
    return {
        "id": compra.id,
        "nome": compra.nome,
        "cpf": compra.cpf,
        "produto": compra.produto,
    }
