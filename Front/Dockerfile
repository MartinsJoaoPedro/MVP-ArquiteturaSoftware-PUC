# Define a imagem base Alpine do nginx
FROM nginx
# O nginx é um servidor leve e de código fonte aberto
# Como nossa aplicação irá consultar requisições HTTP, então usaremos uma imagem do Ngnix
# Ngnix necessita de uma página index.html

# Copia os arquivos de código-fonte para o diretório de trabalho do ngnix
COPY ./html /usr/share/nginx/html/html
# Copia os arquivos de código-fonte JavaScript para o diretório de trabalho do ngnix
COPY ./js /usr/share/nginx/html/js
# Copia os arquivos de código-fonte CSS para o diretório de trabalho do ngnix
COPY ./styles.css /usr/share/nginx/html/styles.css

COPY ./default.conf /etc/nginx/conf.d

EXPOSE 80

# Define o comando de execução do servidor nginx
CMD ["nginx", "-g", "daemon off;"]
