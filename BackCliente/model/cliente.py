from sqlalchemy import Column, String, Integer, DateTime, Float
from sqlalchemy.orm import relationship
from datetime import datetime
from typing import Union

from model import Base


class Cliente(Base):
    __tablename__ = "cliente"

    cpf = Column("pk_cliente", String, primary_key=True)
    nome = Column(String(140))
    cep = Column(String)
    data_insercao = Column(DateTime, default=datetime.now())

    # Definição do relacionamento entre o cliente e o comentário.
    # Essa relação é implicita, não está salva na tabela 'cliente',
    # mas aqui estou deixando para SQLAlchemy a responsabilidade
    # de reconstruir esse relacionamento.
    # comentarios = relationship("Comentario")

    def __init__(
        self, cpf: str, nome: str, cep: str, data_insercao: Union[DateTime, None] = None
    ):
        """
        Cria um cliente

        Arguments:
            nome: nome do cliente.
            quantidade: quantidade que se espera comprar daquele cliente
            valor: valor esperado para o cliente
            data_insercao: data de quando o cliente foi inserido à base
        """
        self.cpf = cpf
        self.nome = nome
        self.cep = cep

        # se não for informada, será o data exata da inserção no banco
        if data_insercao:
            self.data_insercao = data_insercao
