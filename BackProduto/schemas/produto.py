from pydantic import BaseModel
from typing import Optional, List
from model.produto import Produto


class ProdutoSchema(BaseModel):
    """Define como um novo produto a ser inserido deve ser representado"""

    id: int = 1
    nome: str = "Banana Prata"
    quantidade: Optional[int] = 12
    valor: float = 12.50


class ProdutoSchemaId(BaseModel):
    """Define como deve ser a estrutura que representa a busca. Que será
    feita apenas com base no nome do produto.
    """

    id: int = 1


class ProdutoSchemaNome(BaseModel):
    """Define como deve ser a estrutura que representa a busca. Que será
    feita apenas com base no nome do produto.
    """

    nome: str = "Banana Prata"


class ProdutoSchemaQuantidade(BaseModel):
    """Define como deve ser a estrutura que representa a busca. Que será
    feita apenas com base no nome do produto.
    """

    quantidade: int = 12


class ProdutoSchemaValor(BaseModel):
    """Define como deve ser a estrutura que representa a busca. Que será
    feita apenas com base no nome do produto.
    """

    valor: float = 12.50


class ProdutoUpdateSchema(BaseModel):
    nome: str = "Banana Prata"
    quantidade: Optional[int] = 12
    valor: float = 12.50


def apresenta_produto(produto: Produto):
    """Retorna uma representação do produto seguindo o schema definido em
    ProdutoViewSchema.
    """
    return {
        "id": produto.id,
        "nome": produto.nome,
        "quantidade": produto.quantidade,
        "valor": produto.valor,
    }


class ListagemProdutosSchema(BaseModel):
    """Define como uma listagem de produtos será retornada."""

    produtos: List[ProdutoSchema]


def apresenta_produtos(produtos: List[Produto]):
    """Retorna uma representação do produto seguindo o schema definido em
    ProdutoViewSchema.
    """
    result = []
    for produto in produtos:
        result.append(
            {
                "id": produto.id,
                "nome": produto.nome,
                "quantidade": produto.quantidade,
                "valor": produto.valor,
            }
        )

    return {"produtos": result}
