#!/bin/bash

###############################################
# CONFIGURAÇÕES
###############################################
# Caminho base onde estão as imagens WRF 
SOURCE_BASE="/online02"

# Caminho local onde os arquivos serão copiados
LOCAL_BASE="./public/wrf"

# calcula data de ontem
YESTERDAY=$(date -d "yesterday" +"%Y%m%d")

# subpastas que serão processadas
DIRS=("precipitacao" "vento_10m")

###############################################
# PROCESSO
###############################################
echo "Atualizando imagens WRF para data $YESTERDAY..."
echo ""

for VAR in "${DIRS[@]}"; do
    SOURCE_PATH="$SOURCE_BASE/$VAR/$YESTERDAY"
    LOCAL_PATH="$LOCAL_BASE/$VAR/$YESTERDAY"

    echo "Copiando imagens: $VAR"
    echo "Origem: $SOURCE_PATH"
    echo "Destino: $LOCAL_PATH"

    mkdir -p "$LOCAL_PATH"

    # copia somente arquivos de imagem
    cp -u "$SOURCE_PATH"/*.{png,jpg,jpeg,gif,webp} "$LOCAL_PATH/" 2>/dev/null

    # gera index.json
    echo "Gerando index.json para $VAR..."

    FILES=$(ls "$LOCAL_PATH" | grep -E "\.(png|jpg|jpeg|gif|webp)$")

    {
        echo "{"
        echo '  "files": ['
        first=true
        for f in $FILES; do
            if [ "$first" = true ]; then
                first=false
            else
                echo ","
            fi
            echo -n "    \"${f}\""
        done
        echo ""
        echo "  ]"
        echo "}"
    } > "$LOCAL_PATH/index.json"

    echo "✅ Atualizado: $VAR"
    echo ""
done

echo "✅ Processo finalizado!"
