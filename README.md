# Meu Front

Este pequeno projeto é o mvp do **Sprint Arquitetura de Software**

## Como executar

Basta fazer o download do projeto e abrir o arquivo index.html no seu browser.

## Para criação da imagem

docker build --pull --rm -f "Front\Dockerfile" -t front

## API externa

Essa api faz uso das apis externas: https://docs.sheetjs.com/ https://viacep.com.br/ https://genderize.io/ https://docs.awesomeapi.com.br/

## Biblioteca

Essa api faz uso de duas bibliotecas https: https://cdnjs.cloudflare.com/ https://developers.google.com/speed/libraries?hl=pt-br

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

1. pip install -r requirements.txt
2. python.exe -m pip install --upgrade pip

## Para api produto

flask run --host 0.0.0.0 --port 5001 --reload

## Para api cliente

flask run --host 0.0.0.0 --port 5002 --reload

## Para api compra

flask run --host 0.0.0.0 --port 5003 --reload

## Para desativar o env

deactivate

## Para criação da imagem produto

docker build --pull --rm -f "Front\Dockerfile" -t backproduto

## Para criação da imagem cliente

docker build --pull --rm -f "Front\Dockerfile" -t backcliente

## Para criação da imagem compra

docker build --pull --rm -f "Front\Dockerfile" -t backcompra

## Para criação dos conteiner

Os conteiner deve ser criados apartir do software desktop do docker

## API externa

Essa api faz uso das apis externas:

1. https://docs.sheetjs.com/
2. https://viacep.com.br/
3. https://genderize.io/
4. https://docs.awesomeapi.com.br/

## Biblioteca

Essa api faz uso de duas bibliotecas https:

1. https://cdnjs.cloudflare.com/
2. https://developers.google.com/speed/libraries?hl=pt-br

## Roteiro geral

O projeto conta com o cadastro de clientes produtos e a compra de produtos pelo cliente, ambas as telas contam com exportação da tabela excel e foram utilizadas mascaras nos campos. É possível verificar os detalhes dos ceps cadastrados, o gênero do cliente e a cotação em dolar do valor dos produtos. O código está bem documentado e foi feito conceito de callback para deixar o código mais limpo.

## Informações do código

O código js contem uma forma de obtenção de id, fazer requisições e consumir apis personalizada facilitando o entendimento

## Sobre a entrega do MVP

Tendo em vista que devem ser entregues cada componente em um repositório diferente, para o funcionamento correto do softwar é necessário a estrutura correta da pasta contendo todos os arquvios que vou deixar dipsonível junto do arquivo compose do dcoker neste também está o docker-compose.yml que pode ser baixado individualmente

Pasta raiz(backCliente,backProduto,backCompra,Front,docker-compose).