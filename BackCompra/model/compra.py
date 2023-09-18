from sqlalchemy import Column, String, Integer, DateTime, Float
from sqlalchemy.orm import relationship
from datetime import datetime
from typing import Union

from model import Base


class Compra(Base):
    __tablename__ = "compra"

    id = Column("pk_produto", Integer, primary_key=True)
    cpf = Column(String)
    produto = Column(String(140))
    data_insercao = Column(DateTime, default=datetime.now())

    # Definição do relacionamento entre o compra e o comentário.
    # Essa relação é implicita, não está salva na tabela 'compra',
    # mas aqui estou deixando para SQLAlchemy a responsabilidade
    # de reconstruir esse relacionamento.
    # comentarios = relationship("Comentario")

    def __init__(
        self, cpf: str, produto: str, data_insercao: Union[DateTime, None] = None
    ):
        """
        Cria um compra

        Arguments:
            produto: produto do compra.
            quantidade: quantidade que se espera comprar daquele compra
            valor: valor esperado para o compra
            data_insercao: data de quando o compra foi inserido à base
        """
        self.cpf = cpf
        self.produto = produto

        # se não for informada, será o data exata da inserção no banco
        if data_insercao:
            self.data_insercao = data_insercao
