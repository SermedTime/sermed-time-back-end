#!/bin/bash
# wait-for-oracle.sh

while ! nc -z oracle-db 1521; do
  echo "Esperando o Oracle DB..."
  sleep 1
done

echo "Oracle DB está pronto. Iniciando a aplicação..."
npm run dev