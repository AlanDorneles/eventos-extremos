# Executando a stack localmente (docker-compose)

Este arquivo descreve como levantar um ambiente local seguro para desenvolver e ajustar a plataforma.

## Rodando localmente (sem Docker) — recomendado para começar a parte visual

1. Backend (API + WebSocket)

```bash
cd /home/alanpablo/Área\ de\ Trabalho/PAGINA_LIAO/eventos-extremos-backend
cp .env.example .env
npm install
npm run dev
```

2. Frontend (Vite)

```bash
cd /home/alanpablo/Área\ de\ Trabalho/PAGINA_LIAO/eventos-extremos
cp .env.example .env.development
npm install
npm run dev
```

3. Acesso

- Frontend: http://localhost:5173
- Backend: http://localhost:3000/api
- WebSocket: ws://localhost:3000/ws

Observações:

- O frontend lê `VITE_API_URL` e `VITE_WS_URL`.
- O backend agora aceita CORS local por `CORS_ORIGINS`.
- Para funcionalidade completa, configure `INMET_FREE_KEY` no arquivo `.env` do backend.

Requisitos

- Docker e docker-compose (ou Docker Desktop) instalados

Passos rápidos

1. Na pasta que contém o `docker-compose.yml` (neste repo eu adicionei o compose em `/online02/LIAO`) execute a partir de `LIAO`:

```bash
cd /online02/LIAO
docker compose up --build
```

2. Serviços expostos por padrão (mapeados para evitar conflito com portas locais):

- Frontend: http://localhost:5173 (vite dev, se estiver em modo `docker` no package.json)
- Backend (API + WS): http://localhost:3001 (internamente o container usa 3000)
- Redis (para acesso a partir do HOST): localhost:16380 (internamente o container usa 6379)

Notas importantes

- O backend espera a variável `REDIS_URL`. No `docker-compose.yml` ela já aponta para `redis://redis:6379`.
- O `WRF_BASE_PATH` está montado como um volume nomeado `wrf-data` (vazio por padrão). Se você quiser usar dados reais do host, pare o compose e edite o serviço `backend` em `docker-compose.yml` para montar um diretório específico do host, por exemplo:

```yaml
volumes:
  - ./eventos-extremos-backend:/app
  - /caminho/no/host/para/wrf:/wrf-data:ro
```

- Para rodar localmente sem Docker (dev): entre em cada pasta `eventos-extremos` e `eventos-extremos-backend`, rode `npm install` e em seguida `npm run dev` (frontend) e `npm start` (backend). Ajuste `.env` local no backend copiando `eventos-extremos-backend/.env.example`.

Observação sobre portas e acesso:

- Internamente os containers continuam usando as portas originais (backend 3000, redis 6379).
- Mapeamos as portas no host para evitar colisões com serviços locais já rodando:
  - backend container 3000 -> host 3002
  - redis container 6379 -> host 16379
- Se precisar conectar ferramentas do host ao Redis ou API, use os host-ports acima.
  Exemplo de conexão ao Redis a partir do host (se tiver `redis-cli`):

```bash
redis-cli -h 127.0.0.1 -p 16380 ping
```

Verificações rápidas

- Após `docker compose up` verifique os logs do backend para a mensagem: `🚀 Servidor HTTP+WS rodando em http://127.0.0.1:3000` e a conexão com Redis (`✅ Conectado ao Redis`).

Segurança

- O compose padrão monta o código fonte dentro dos containers permitindo ajustes rápidos. Não monte diretórios sensíveis do host por padrão — use o `wrf-data` somente quando necessário e de forma explícita.

Problemas comuns

- Se o frontend não achar a API, confirme a variável `VITE_BACKEND_URL` ou acesse a API diretamente em `http://localhost:3000/api`.
