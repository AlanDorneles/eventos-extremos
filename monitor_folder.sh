#!/bin/bash

# Caminho para o diretório a ser monitorado
DIR_TO_MONITOR="public/wrf/"

# Caminho para as imagens WRF
WRF_IMG_DIR="/online02/wrf_pos-proc/graphs/"

# Caminho para o arquivo JSON de saída
OUTPUT_JSON="pastasWRF.json"

# Função para copiar as imagens do WRF (WRF_IMG_DIR) para a pasta public/wrf/
timestamp=$(date +"%Y%m%d") # Data formata para as pastas do WRF
count=15
while [ $count -gt 0 ]; do
  echo "$timestamp"
  cp -r "$WRF_IMG_DIR""$timestamp" "$DIR_TO_MONITOR"
  timestamp=$(($timestamp-1))
  count=$(($count-1))
done

# Função para listar os diretórios e escrever no arquivo JSON
write_folders_to_json() {
  ls -d $DIR_TO_MONITOR*/ | while read -r folder; do
    if [ "$(ls -A "$folder")" ]; then
      echo "$folder"
    fi
  done | xargs -n 1 basename | sort | jq -R . | jq -s '{folders: .}' > $OUTPUT_JSON
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
