# Meu Front

Este pequeno projeto é o mvp do **Sprint Arquitetura de Software**

## Como executar

Basta fazer o download do projeto e abrir o arquivo index.html no seu browser.

## Para criação da imagem

docker build --pull --rm -f "Front\Dockerfile" -t front

## Para criação dos conteiner

O conteiner deve ser criado apartir do software desktop do docker

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
