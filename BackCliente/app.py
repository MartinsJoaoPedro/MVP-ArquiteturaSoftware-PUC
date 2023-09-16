from flask_openapi3 import OpenAPI, Info, Tag
from flask import redirect
from urllib.parse import unquote

from sqlalchemy.exc import IntegrityError

from model import Session, Cliente
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
produto_tag = Tag(
    name="Produto", description="Adição, visualização e remoção de produtos à base"
)
cliente_tag = Tag(
    name="Cliente", description="Adição, visualização e remoção de clientes à base"
)


# Documentação
@app.get("/", tags=[home_tag])
def home():
    """Redireciona para /openapi, tela que permite a escolha do estilo de documentação."""
    return redirect("/openapi")


# Adicionar um cliente
@app.post(
    "/cliente",
    tags=[cliente_tag],
    responses={"200": ClienteViewSchema, "409": ErrorSchema, "400": ErrorSchema},
)
def add_cliente(form: ClienteSchema):
    """Adiciona um novo cliente à base de dados

    Retorna uma representação dos clientes associados.
    """
    print(form.cpf)
    print(form.nome)
    print(form.cep)
    cliente = Cliente(cpf=form.cpf, nome=form.nome, cep=form.cep)
    logger.debug(f"Adicionando cliente de nome: '{cliente.nome}'")
    try:
        # criando conexão com a base
        session = Session()
        # adicionando cliente
        session.add(cliente)
        # efetivando o camando de adição de novo cliente na tabela
        session.commit()
        logger.debug(f"Adicionado cliente de nome: '{cliente.nome}'")
        return apresenta_cliente(cliente), 200

    except IntegrityError as e:
        # como a duplicidade do nome é a provável razão do IntegrityError
        error_msg = "Cliente de mesmo nome já salvo na base :/"
        logger.warning(f"Erro ao adicionar cliente '{cliente.nome}', {error_msg}")
        return {"mesage": error_msg}, 409

    except Exception as e:
        # caso um erro fora do previsto
        error_msg = "Não foi possível salvar novo cliente :/"
        logger.warning(f"Erro ao adicionar cliente '{cliente.nome}', {error_msg}")
        return {"mesage": error_msg}, 400


# Pega todos os clientes
@app.get(
    "/clientes",
    tags=[cliente_tag],
    responses={"200": ListagemClientesSchema, "404": ErrorSchema},
)
def get_clientes():
    """Faz a busca por todos os cliente cadastrados

    Retorna uma representação da listagem de clientes.
    """
    logger.debug(f"Coletando clientes ")
    # criando conexão com a base
    session = Session()
    # fazendo a busca
    clientes = session.query(Cliente).all()

    if not clientes:
        # se não há clientes cadastrados
        return {"clientes": []}, 200
    else:
        logger.debug(f"%d clientes econtrados" % len(clientes))
        # retorna a representação de cliente
        return apresenta_clientes(clientes), 200


# Pega todos os clientes pelo nome
@app.get(
    "/clientesnome",
    tags=[cliente_tag],
    responses={"200": ListagemClientesSchema, "404": ErrorSchema},
)
def get_clientes_nome(query: ClienteBuscaSchemaNome):
    """Faz a busca por todos os cliente cadastrados a partir do nome informado

    Retorna uma representação da listagem de clientes associados ao nome.
    """
    cliente_nome = query.nome
    logger.debug(f"Coletando clientes ")
    # criando conexão com a base
    session = Session()
    # fazendo a busca
    clientes = session.query(Cliente).filter(Cliente.nome.contains(cliente_nome)).all()

    if not clientes:
        # se não há clientes cadastrados
        return {"clientes": []}, 200
    else:
        logger.debug(f"%d clientes econtrados" % len(clientes))
        # retorna a representação de cliente
        return apresenta_clientes(clientes), 200


# Pega todos os clientes pelo cpf
@app.get(
    "/clientecpf",
    tags=[cliente_tag],
    responses={"200": ListagemClientesSchema, "404": ErrorSchema},
)
def get_clientes_cpf(query: ClienteBuscaSchemaCpf):
    """Faz a busca por todos os cliente cadastrados a partir do CPF informado

    Retorna uma representação da listagem de clientes associados ao CPF.
    """
    cliente_cpf = query.cpf
    logger.debug(f"Coletando clientes ")
    # criando conexão com a base
    session = Session()
    # fazendo a busca
    clientes = session.query(Cliente).filter(Cliente.cpf.contains(cliente_cpf)).all()

    if not clientes:
        # se não há clientes cadastrados
        return {"clientes": []}, 200
    else:
        logger.debug(f"%d clientes encontrados" % len(clientes))
        # retorna a representação de cliente
        return apresenta_clientes(clientes), 200


# Pega todos os clientes pelo cep
@app.get(
    "/clientescep",
    tags=[cliente_tag],
    responses={"200": ListagemClientesSchema, "404": ErrorSchema},
)
def get_clientes_cep(query: ClienteBuscaSchemaCep):
    """Faz a busca por todos os cliente cadastrados a partir do CEP informado

    Retorna uma representação da listagem de clientes associados ao CEP.
    """
    cliente_cep = query.cep
    logger.debug(f"Coletando clientes ")
    # criando conexão com a base
    session = Session()
    # fazendo a busca
    clientes = session.query(Cliente).filter(Cliente.cep.contains(cliente_cep)).all()

    if not clientes:
        # se não há clientes cadastrados
        return {"clientes": []}, 200
    else:
        logger.debug(f"%d clientes encontrados" % len(clientes))
        # retorna a representação de cliente
        return apresenta_clientes(clientes), 200


# Deletar cliente específico a partir do cpf
@app.delete(
    "/cliente",
    tags=[cliente_tag],
    responses={"200": ClienteDelSchema, "404": ErrorSchema},
)
def del_cliente(query: ClienteBuscaSchemaCpf):
    """Deleta um cliente a partir do cpf informado

    Retorna uma mensagem de confirmação da remoção.
    """
    print(query.cpf)
    cliente_cpf = query.cpf
    print(cliente_cpf)
    Stringpi = str(cliente_cpf)
    logger.debug(f"Deletando dados sobre cliente #{Stringpi}")
    # criando conexão com a base
    session = Session()
    # fazendo a remoção
    count = session.query(Cliente).filter(Cliente.cpf == cliente_cpf).delete()
    session.commit()

    if count:
        # retorna a representação da mensagem de confirmação
        logger.debug(f"Deletado cliente #{Stringpi}")
        return {"mesage": "Cliente removido", "cpf": Stringpi}
    else:
        # se o cliente não foi encontrado
        error_msg = "Cliente não encontrado na base :/"
        logger.warning(f"Erro ao deletar cliente #'{Stringpi}', {error_msg}")
        return {"mesage": error_msg}, 404


# Alterar cliente específico a partir do cpf
@app.put(
    "/cliente",
    tags=[cliente_tag],
    responses={"200": ClienteDelSchema, "404": ErrorSchema},
)
def update_cliente(query: ClienteBuscaSchemaCpf, form: ClienteUpdateSchema):
    """Edita um cliente a partir do cpf informado

    Retorna uma mensagem de confirmação da edição.
    """
    cliente_cpf = query.cpf
    Stringpi = str(cliente_cpf)
    logger.debug(f"Editando dados sobre cliente #{Stringpi}")
    logger.debug(f"Editando dados sobre cliente #{Stringpi}")
    # criando conexão com a base
    session = Session()
    # fazendo a remoção
    count = (
        # cliente.nome == cliente_nome).first()
        session.query(Cliente)
        .filter(Cliente.cpf == cliente_cpf)
        .first()
    )

    count.nome = form.nome
    count.cep = form.cep

    print("nome")
    print(count.nome)
    print(count.cep)

    session.commit()
    return apresenta_cliente(count), 200
