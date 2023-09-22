# Meu Back

Este pequeno projeto é o mvp do **Sprint Arquitetura de Software**

## Como executar

Será necessário ter todas as libs python listadas no `requirements.txt` instaladas. Após clonar o repositório, é necessário ir ao diretório raiz, pelo terminal, para poder executar os comandos descritos abaixo.

> É fortemente indicado o uso de ambientes virtuais do tipo [virtualenv](https://virtualenpython -m venv .v.pypa.io/en/latest/).

## Criação do ambiente virtual

python -m venv env

## Ativação do ambiente virtual

.\env\Scripts\Activate

## Para api

1. pip3 install
2. python.exe -m pip install --upgrade pip
3. pip install -r requirements.txt
4. flask run --host 0.0.0.0 --port 5003 --reload

## Para desativar o env

deactivate

## Para criação da imagem

docker build --pull --rm -f "Front\Dockerfile" -t backcompra

## Para criação dos conteiner

O conteiner deve ser criado apartir do software desktop do docker Também é possivel fazer uso do comando Compose up da extensão docker do vscode

# Dica

Abra o [http://localhost:5003/#/] no navegador para verificar o status da API em execução.

## Roteiro geral

O projeto conta com o cadastro de clientes produtos e a compra de produtos pelo cliente, ambas as telas contam com exportação da tabela excel e foram utilizadas mascaras nos campos. É possível verificar os detalhes dos ceps cadastrados, o gênero do cliente e a cotação em dolar do valor dos produtos. O código está bem documentado e foi feito conceito de callback para deixar o código mais limpo.

## Sobre a entrega do MVP

Tendo em vista que devem ser entregues cada componente em um repositório diferente, para o funcionamento correto do softwar é necessário a estrutura correta da pasta contendo todos os arquvios que vou deixar dipsonível junto do arquivo compose do dcoker neste também está o docker-compose.yml que pode ser baixado individualmente

Pasta raiz(backCliente,backProduto,backCompra,Front,docker-compose).
