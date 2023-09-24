from flask_openapi3 import OpenAPI, Info, Tag
from flask import redirect
from urllib.parse import unquote

from sqlalchemy.exc import IntegrityError

from model import Session, Compra
from logger import logger
from schemas import *
from flask_cors import CORS
from fastapi import Query

info = Info(title="Minha API", version="1.0.0")
app = OpenAPI(__name__, info=info)
CORS(app)

# definindo tags
home_tag = Tag(
    name="Documentação",
    description="Seleção de documentação: Swagger, Redoc ou RapiDoc",
)
compra_tag = Tag(
    name="Compra", description="Adição, visualização e remoção de compras à base"
)


# Documentação
@app.get("/", tags=[home_tag])
def home():
    """Redireciona para /openapi, tela que permite a escolha do estilo de documentação."""
    return redirect("/openapi")


# compra


# Adicionar uma compra
@app.post(
    "/compra",
    tags=[compra_tag],
    responses={"200": CompraSchema, "409": ErrorSchema, "400": ErrorSchema},
)
def add_compra(form: CompraSchema):
    """Adiciona um novo compra à base de dados

    Retorna uma representação dos compras associados.
    """
    print(form.cpf)
    print(form.nome)
    print(form.produto)
    compra = Compra(cpf=form.cpf, nome=form.nome, produto=form.produto)
    logger.debug(f"Adicionando compra de produto: '{compra.produto}'")
    try:
        # criando conexão com a base
        session = Session()
        # adicionando compra
        session.add(compra)
        # efetivando o camando de adição de novo item na tabela
        session.commit()
        logger.debug(f"Adicionado compra de produto: '{compra.produto}'")
        return apresenta_compra(compra), 200

    except IntegrityError as e:
        # como a duplicidade do produto é a provável razão do IntegrityError
        error_msg = "Compra de mesmo produto já salvo na base :/"
        logger.warning(f"Erro ao adicionar compra '{compra.produto}', {error_msg}")
        return {"mesage": error_msg}, 409

    except Exception as e:
        # caso um erro fora do previsto
        error_msg = "Não foi possível salvar nova compra :/"
        logger.warning(f"Erro ao adicionar compra '{compra.produto}', {error_msg}")
        return {"mesage": error_msg}, 400


# Pega todos os compras
@app.get(
    "/compras",
    tags=[compra_tag],
    responses={"200": ListagemComprasSchema, "404": ErrorSchema},
)
def get_compras():
    """Faz a busca por todas as compra cadastradas

    Retorna uma representação da listagem de compras.
    """
    logger.debug(f"Coletando compras ")
    # criando conexão com a base
    session = Session()
    # fazendo a busca
    compras = session.query(Compra).all()

    if not compras:
        # se não há compras cadastrados
        return {"compras": []}, 200
    else:
        logger.debug(f"%d compras econtradas" % len(compras))
        # retorna a representação de compra
        return apresenta_compras(compras), 200


# Pega todos as compras pelo produto
@app.get(
    "/comprasproduto",
    tags=[compra_tag],
    responses={"200": ListagemComprasSchema, "404": ErrorSchema},
)
def get_compras_produto(query: CompraSchemaProduto):
    """Faz a busca por todos os compra cadastrados a partir do produto informado

    Retorna uma representação da listagem de compras associados ao produto.
    """
    compra_produto = query.produto
    logger.debug(f"Coletando compras ")
    # criando conexão com a base
    session = Session()
    # fazendo a busca
    compras = (
        session.query(Compra).filter(Compra.produto.contains(compra_produto)).all()
    )

    if not compras:
        # se não há compras cadastradas
        return {"compras": []}, 200
    else:
        logger.debug(f"%d compras econtrados" % len(compras))
        # retorna a representação de compra
        return apresenta_compras(compras), 200


# Pega todas as compras pelo cpf
@app.get(
    "/comprascpf",
    tags=[compra_tag],
    responses={"200": ListagemComprasSchema, "404": ErrorSchema},
)
def get_compras_cpf(query: CompraSchemaCpf):
    """Faz a busca por todos os compra cadastrados a partir do CPF informado

    Retorna uma representação da listagem de compras associados ao CPF.
    """
    compra_cpf = query.cpf
    logger.debug(f"Coletando compras ")
    # criando conexão com a base
    session = Session()
    # fazendo a busca
    compras = session.query(Compra).filter(Compra.cpf.contains(compra_cpf)).all()

    if not compras:
        # se não há compras cadastrados
        return {"compras": []}, 200
    else:
        logger.debug(f"%d compras encontrados" % len(compras))
        # retorna a representação de compra
        return apresenta_compras(compras), 200


# Pega uma compra específica pelo id
@app.get(
    "/compraid",
    tags=[compra_tag],
    responses={"200": CompraViewSchema, "404": ErrorSchema},
)
def get_compra_id(query: CompraSchemaId):
    """Faz a busca por um Compra a partir do id do compra

    Retorna uma representação dos compras associados ao id.
    """
    compra_id = query.id
    logger.debug(f"Coletando dados sobre compra #{compra_id}")
    # criando conexão com a base
    session = Session()
    # fazendo a busca
    compra = session.query(Compra).filter(Compra.id == compra_id).first()

    if not compra:
        # se o compra não foi encontrado
        error_msg = "Compra não encontrado na base :/"
        logger.warning(f"Erro ao buscar compra '{compra_id}', {error_msg}")
        return {"mesage": error_msg}, 404
    else:
        logger.debug(f"Compra econtrado: '{compra.id}'")
        # retorna a representação de compra
        return apresenta_compra(compra), 200


# Deletar compra específica a partir do id
@app.delete(
    "/compra",
    tags=[compra_tag],
    responses={"200": CompraSchemaId, "404": ErrorSchema},
)
def del_compra(query: CompraSchemaId):
    """Deleta um compra a partir do id informado

    Retorna uma mensagem de confirmação da remoção.
    """
    print(query.id)
    compra_id = query.id
    print(compra_id)
    Stringpi = str(compra_id)
    logger.debug(f"Deletando dados sobre compra #{Stringpi}")
    # criando conexão com a base
    session = Session()
    # fazendo a remoção
    count = session.query(Compra).filter(Compra.id == compra_id).delete()
    session.commit()

    if count:
        # retorna a representação da mensagem de confirmação
        logger.debug(f"Deletado compra #{Stringpi}")
        return {"mesage": "Compra removido", "id": Stringpi}
    else:
        # se o compra não foi encontrado
        error_msg = "Compra não encontrado na base :/"
        logger.warning(f"Erro ao deletar compra #'{Stringpi}', {error_msg}")
        return {"mesage": error_msg}, 404


# Alterar compra específica a partir do cpf
@app.put(
    "/compra",
    tags=[compra_tag],
    responses={"200": CompraSchemaId, "404": ErrorSchema},
)
def update_compra(query: CompraSchemaId, form: CompraSchema):
    """Edita um compra a partir do id informado

    Retorna uma mensagem de confirmação da edição.
    """
    compra_id = query.id
    Stringpi = str(compra_id)
    logger.debug(f"Editando dados sobre compra #{Stringpi}")
    # criando conexão com a base
    session = Session()
    # fazendo a remoção
    count = (
        # compra.produto == compra_produto).first()
        session.query(Compra)
        .filter(Compra.id == compra_id)
        .first()
    )

    count.cpf = form.cpf
    count.nome = form.nome
    count.produto = form.produto

    print("produto")
    print(count.cpf)
    print(count.nome)
    print(count.produto)

    session.commit()
    return apresenta_compra(count), 200
