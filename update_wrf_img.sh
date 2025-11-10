#!/bin/bash

###############################################
# CONFIGURAÇÕES
###############################################
SSH_USER="wrf"
SSH_HOST="200.132.216.84"
SSH_PATH_BASE="/online02"   # caminho remoto onde estão as imagens

LOCAL_BASE="./public/wrf"

# calcula data de ontem
YESTERDAY=$(date -d "yesterday" +"%Y%m%d")

DIRS=("precipitacao" "vento_10m")

###############################################
# PROCESSO
###############################################
echo "Atualizando imagens WRF para data $YESTERDAY..."
echo ""

for VAR in "${DIRS[@]}"; do
    REMOTE_PATH="$SSH_PATH_BASE/$VAR/$YESTERDAY"
    LOCAL_PATH="$LOCAL_BASE/$VAR/$YESTERDAY"

    echo "Baixando imagens: $VAR"
    echo "Remoto: $REMOTE_PATH"
    echo "Local : $LOCAL_PATH"

    mkdir -p "$LOCAL_PATH"

    # baixa somente arquivos de imagem
    scp -q "$SSH_USER@$SSH_HOST:$REMOTE_PATH/*" "$LOCAL_PATH/"

    # gera index.json
    echo "Gerando index.json para $VAR..."

    FILES=$(ls "$LOCAL_PATH" | grep -E "\.(png|jpg|jpeg|gif|webp)$")

    echo "{" > "$LOCAL_PATH/index.json"
    echo '  "files": [' >> "$LOCAL_PATH/index.json"

    first=true
    for f in $FILES; do
        if [ "$first" = true ]; then
            first=false
        else
            echo "," >> "$LOCAL_PATH/index.json"
        fi
        echo -n "    \"${f}\"" >> "$LOCAL_PATH/index.json"
    done

    echo "" >> "$LOCAL_PATH/index.json"
    echo "  ]" >> "$LOCAL_PATH/index.json"
    echo "}" >> "$LOCAL_PATH/index.json"

    echo "✅ Atualizado: $VAR"
    echo ""
done

echo "✅ Processo finalizado!"
