#!/bin/bash

# Caminho para o diretório a ser monitorado
DIR_TO_MONITOR="public/wrf/"

# Caminho para o arquivo JSON de saída
OUTPUT_JSON="nomes_das_pastas.json"

# Função para listar os diretórios e escrever no arquivo JSON
write_folders_to_json() {
  ls -d $DIR_TO_MONITOR*/ | xargs -n 1 basename | jq -R . | jq -s '{folders: .}' > $OUTPUT_JSON
}

# Inicialmente escreve os nomes das pastas existentes no arquivo JSON
write_folders_to_json

# Loop para monitorar o diretório por qualquer evento de criação, deleção ou movimentação
inotifywait -m -e create -e delete -e moved_to -e moved_from --format "%f" $DIR_TO_MONITOR | while read line
do
  echo "Detectada alteração: $line"
  # Atualiza o arquivo JSON com os nomes das pastas atuais
  write_folders_to_json
done
