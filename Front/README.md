# Meu Front

Este pequeno projeto é o mvp do **Sprint q** 

O objetivo entregar um projeto nos confromes.

---
## Como executar

Basta fazer o download do projeto e abrir o arquivo index.html no seu browser.

## Criação do ambiente virtual

```
python -m venv env

```

## Ativação do ambiente virtual
```
.\env\Scripts\Activate
```

## Para api

1 pip3 install
2 pip install -r requirements.txt
3 python.exe -m pip install --upgrade pip
4 pip install flask

## Para api produto
flask run --host 0.0.0.0 --port 5001 --reload
## Para api cliente
flask run --host 0.0.0.0 --port 5002 --reload
## Para api cliente
flask run --host 0.0.0.0 --port 5002 --reload

## Para criação da imagem
docker build --pull --rm -f "Front\Dockerfile" -t front

## API externa

Essa api faz uso de duas apis externas:
https://docs.sheetjs.com/
https://viacep.com.br/

## Biblioteca

Essa api faz uso de duas bibliotecas https:
https://cdnjs.cloudflare.com/
https://developers.google.com/speed/libraries?hl=pt-br
viacep.com.br