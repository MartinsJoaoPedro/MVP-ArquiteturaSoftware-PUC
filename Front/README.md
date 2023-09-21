# Meu Front

Este pequeno projeto é o mvp do **Sprint Arquitetura de Software**
O projeto coons com o cadastro de clientes produtos e a compra de produtos pelo cliente, ambas as telas contam com exportação da tabela excel e foram utilizadas mascaras nos campos. É possível verificar os detalhes dos ceps cadastrados, o gênero do cliente e a cotação em dolar do valor dos produtos. 

## Como executar

Basta fazer o download do projeto e abrir o arquivo index.html no seu browser.

## Para criação da imagem

docker build --pull --rm -f "Front\Dockerfile" -t front

## Para criação dos conteiner

O conteiner deve ser criado apartir do software desktop do docker

## API externa

Essa api faz uso das apis externas:
https://docs.sheetjs.com/
https://viacep.com.br/
https://genderize.io/
https://docs.awesomeapi.com.br/

## Biblioteca

Essa api faz uso de duas bibliotecas https:
https://cdnjs.cloudflare.com/
https://developers.google.com/speed/libraries?hl=pt-br
