from logging.config import dictConfig
import logging
import os

# Define o caminho para o diretório de log
log_path = "log/"

# Verifica se o diretório para armazenar os logs não existe
if not os.path.exists(log_path):
    # então cria o diretório
    os.makedirs(log_path)

# Configuração do dicionário para o módulo de logging
dictConfig(
    {
        "version": 1,  # Versão da configuração de log
        "disable_existing_loggers": True,  # Desativa todos os loggers existentes
        "formatters": {  # Formatação das mensagens de log
            "default": {  # Formato padrão
                "format": "[%(asctime)s] %(levelname)-4s %(funcName)s() L%(lineno)-4d %(message)s",
            },
            "detailed": {  # Formato detalhado
                "format": "[%(asctime)s] %(levelname)-4s %(funcName)s() L%(lineno)-4d %(message)s - call_trace=%(pathname)s L%(lineno)-4d",
            },
        },
        "handlers": {  # Manipuladores que determinam o que acontece com as mensagens de log
            "console": {  # Manipulador que imprime as mensagens de log no console
                "class": "logging.StreamHandler",
                "formatter": "default",
                "stream": "ext://sys.stdout",
            },
            "error_file": {  # Manipulador que grava logs de erro em um arquivo
                "class": "logging.handlers.RotatingFileHandler",
                "formatter": "detailed",
                "filename": "log/gunicorn.error.log",
                "maxBytes": 10000,
                "backupCount": 10,
                "delay": "True",
            },
            "detailed_file": {  # Manipulador que grava logs detalhados em um arquivo
                "class": "logging.handlers.RotatingFileHandler",
                "formatter": "detailed",
                "filename": "log/gunicorn.detailed.log",
                "maxBytes": 10000,
                "backupCount": 10,
                "delay": "True",
            },
        },
        "loggers": {
            "gunicorn.error": {
                "handlers": ["console", "error_file"],
                "level": "INFO",
                "propagate": False,
            }
        },
        "root": {  # Logger padrão que recebe mensagens de todos os outros loggers
            "handlers": ["console", "detailed_file"],
            "level": "INFO",
        },
    }
)

# Cria um logger para este módulo
logger = logging.getLogger(__name__)
