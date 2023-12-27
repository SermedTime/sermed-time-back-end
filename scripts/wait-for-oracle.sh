#!/bin/bash
# wait-for-oracle.sh

timeout=60  # timeout de 60 segundos
elapsed=0

while ! nc -z oracle-db 1521; do
  if [ "$elapsed" -ge "$timeout" ]; then
    echo "Timeout atingido. Oracle DB ainda não está disponível."
    exit 1
  fi

  echo "Esperando o Oracle DB..."
  sleep 1
  ((elapsed++))
done

echo "Oracle DB está pronto. Iniciando a aplicação..."
npm run dev