# Meu Front

Este pequeno projeto é o mvp do **Sprint Arquitetura de Software**

## Como executar

Será necessário ter todas as libs python listadas no `requirements.txt` instaladas.
Após clonar o repositório, é necessário ir ao diretório raiz, pelo terminal, para poder executar os comandos descritos abaixo.

> É fortemente indicado o uso de ambientes virtuais do tipo [virtualenv](https://virtualenpython -m venv .v.pypa.io/en/latest/).

## Criação do ambiente virtual

python -m venv env

## Ativação do ambiente virtual

.\env\Scripts\Activate

## Para api

1 pip3 install
2 python.exe -m pip install --upgrade pip
3 pip install -r requirements.txt

## Para api produto

flask run --host 0.0.0.0 --port 5001 --reload

## Para desativar o env

deactivate

## Para criação da imagem

docker build --pull --rm -f "Front\Dockerfile" -t back

## Para criação dos conteiner

O conteiner deve ser criado apartir do software desktop do docker

# Dica

Abra o [http://localhost:5000/#/](http://localhost:5001/#/) no navegador para verificar o status da API em execução.
