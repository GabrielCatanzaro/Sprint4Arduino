# Aplicação de Reconhecimento Facial - Documentação Completa

## 📋 Visão Geral

Esta é uma aplicação web completa de reconhecimento facial desenvolvida com **React** no frontend e **Python (FastAPI)** no backend. A aplicação permite que usuários se registrem com sua biometria facial e façam login usando reconhecimento facial através da webcam.

## 🏗️ Arquitetura

### Frontend (React)
- **Framework**: React 19 com TypeScript
- **Roteamento**: Wouter
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **Webcam**: API nativa do navegador (getUserMedia)

### Backend (Python)
- **Framework**: FastAPI
- **Reconhecimento Facial**: DeepFace com modelo ArcFace
- **Detecção de Rosto**: OpenCV
- **Servidor**: Uvicorn
- **CORS**: Habilitado para comunicação com frontend

## 🚀 Como Usar

### Pré-requisitos
- Node.js 22+ (para o frontend)
- Python 3.11+ (para o backend)
- Navegador moderno com suporte a WebCamera (Chrome, Firefox, Safari, Edge)
- Webcam conectada ao computador

### Instalação

#### 1. Backend (Python/FastAPI)

```bash
# Navegar para o diretório do backend
cd /home/ubuntu/Sprint3Arduino

# Instalar dependências
pip3 install fastapi uvicorn python-multipart opencv-python deepface numpy tf-keras

# Iniciar o servidor
uvicorn main:app --host 0.0.0.0 --port 8000
```

O servidor estará disponível em: `http://localhost:8000`

#### 2. Frontend (React)

```bash
# Navegar para o diretório do frontend
cd /home/ubuntu/facial_recognition_app

# Instalar dependências (se não estiverem instaladas)
pnpm install

# Iniciar o servidor de desenvolvimento
pnpm dev
```

O frontend estará disponível em: `http://localhost:3000`

## 📱 Fluxo da Aplicação

### 1. Tela de Login
- **Rota**: `/`
- **Funcionalidades**:
  - Botão "Ativar Câmera" para iniciar a webcam
  - Botão "Capturar e Fazer Login" para autenticar
  - Link para ir à tela de Registro
  - Mensagens de sucesso/erro

### 2. Tela de Registro
- **Rota**: `/register`
- **Funcionalidades**:
  - Campo de entrada para o nome do usuário
  - Botão "Ativar Câmera" (ativado após digitar o nome)
  - Botão "Capturar e Registrar" para salvar o rosto
  - Link para voltar à tela de Login
  - Mensagens de sucesso/erro

### 3. Tela Home
- **Rota**: `/home`
- **Funcionalidades**:
  - Exibe o nome do usuário autenticado
  - Botão "Sair" para fazer logout
  - Redirecionamento automático para Login se não autenticado

## 🔌 API Endpoints

### POST /register/
Registra um novo rosto no banco de dados.

**Parâmetros**:
- `name` (string): Nome do usuário
- `file` (file): Imagem capturada da webcam (JPEG)

**Resposta de Sucesso (200)**:
```json
{
  "message": "Rosto de 'João Silva' registrado com sucesso!"
}
```

**Resposta de Erro (400)**:
```json
{
  "detail": "O nome 'João Silva' já está registrado."
}
```

### POST /login/
Autentica um usuário comparando seu rosto com os registrados.

**Parâmetros**:
- `file` (file): Imagem capturada da webcam (JPEG)

**Resposta de Sucesso (200)**:
```json
{
  "message": "Login bem-sucedido! Bem-vindo(a), João Silva!",
  "user": "João Silva"
}
```

**Resposta de Erro (401)**:
```json
{
  "detail": "Acesso negado. Rosto não reconhecido."
}
```

### GET /health
Verifica se o servidor está funcionando.

**Resposta (200)**:
```json
{
  "status": "ok"
}
```

## 📁 Estrutura de Arquivos

```
facial_recognition_app/
├── client/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.tsx          # Tela de login com webcam
│   │   │   ├── Register.tsx       # Tela de registro com webcam
│   │   │   ├── HomeUser.tsx       # Tela home do usuário autenticado
│   │   │   └── NotFound.tsx       # Página 404
│   │   ├── components/            # Componentes reutilizáveis
│   │   ├── contexts/              # Contextos React
│   │   ├── App.tsx                # Componente principal com rotas
│   │   └── main.tsx               # Entrada da aplicação
│   └── public/                    # Arquivos estáticos
│
Sprint3Arduino/
├── main.py                        # API FastAPI
├── db.pkl                         # Banco de dados de rostos (criado automaticamente)
├── Facial Detection.py            # Script original de detecção facial
└── README.txt                     # Informações originais
```

## 🔒 Segurança

### Considerações Importantes

1. **Armazenamento de Dados**: Os embeddings faciais são armazenados em um arquivo pickle (`db.pkl`). Em produção, use um banco de dados seguro.

2. **CORS**: Atualmente, CORS está habilitado para todas as origens (`allow_origins=["*"]`). Em produção, restrinja aos domínios específicos.

3. **Threshold de Reconhecimento**: O valor padrão é `0.8`. Valores menores aumentam a sensibilidade (mais falsos positivos), valores maiores a diminuem.

4. **Privacidade**: As imagens não são armazenadas, apenas os embeddings faciais (vetores numéricos).

## 🎯 Fluxo de Autenticação

```
┌─────────────────────────────────────────────────────────────┐
│                    Usuário Abre a App                       │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
            ┌────────────────────────┐
            │   Tela de Login        │
            │  (Rota: /)             │
            └────────┬───────────────┘
                     │
         ┌───────────┴──────────────┐
         │                          │
         ▼                          ▼
    ┌─────────────┐         ┌──────────────┐
    │ Ativar      │         │ Ir para      │
    │ Câmera      │         │ Registro     │
    └──────┬──────┘         └──────┬───────┘
           │                       │
           ▼                       ▼
    ┌──────────────────┐    ┌─────────────────┐
    │ Capturar Rosto   │    │ Tela Registro   │
    └──────┬───────────┘    │ (Rota: /register)
           │                └────────┬────────┘
           ▼                         │
    ┌──────────────────┐            ▼
    │ Enviar para API  │    ┌──────────────────┐
    │ /login/          │    │ Digitar Nome     │
    └──────┬───────────┘    └────────┬─────────┘
           │                         │
           ▼                         ▼
    ┌──────────────────┐    ┌──────────────────┐
    │ Comparar com DB  │    │ Ativar Câmera    │
    └──────┬───────────┘    └────────┬─────────┘
           │                         │
    ┌──────┴──────┐                  ▼
    │             │          ┌──────────────────┐
    ▼             ▼          │ Capturar Rosto   │
┌────────┐  ┌─────────┐      └────────┬─────────┘
│Sucesso │  │ Falha   │              │
└───┬────┘  └────┬────┘              ▼
    │            │          ┌──────────────────┐
    │            │          │ Enviar para API  │
    │            │          │ /register/       │
    │            │          └────────┬─────────┘
    │            │                   │
    │            │                   ▼
    │            │          ┌──────────────────┐
    │            │          │ Salvar no DB     │
    │            │          └────────┬─────────┘
    │            │                   │
    │            │          ┌────────┴────────┐
    │            │          │                 │
    │            │          ▼                 ▼
    │            │      ┌────────┐       ┌─────────┐
    │            │      │Sucesso │       │ Falha   │
    │            │      └───┬────┘       └────┬────┘
    │            │          │                 │
    │            ▼          ▼                 ▼
    │        ┌────────────────────────────────────┐
    │        │  Mensagem de Erro Exibida          │
    │        └────────────────────────────────────┘
    │
    ▼
┌──────────────────────────────────┐
│   Tela Home (Rota: /home)        │
│   - Nome do Usuário              │
│   - Botão Sair                   │
└──────────────────────────────────┘
```

## 🛠️ Troubleshooting

### Problema: "Não foi possível acessar a câmera"
**Solução**: 
- Verifique se o navegador tem permissão para acessar a câmera
- Verifique se a câmera está conectada e funcionando
- Tente em outro navegador

### Problema: "Nenhuma face detectada"
**Solução**:
- Certifique-se de que seu rosto está bem iluminado
- Posicione seu rosto no centro da câmera
- Tente se afastar ou aproximar da câmera

### Problema: "Múltiplas faces detectadas"
**Solução**:
- Apenas uma pessoa deve estar na frente da câmera
- Remova outras pessoas do enquadramento

### Problema: "Rosto não reconhecido" (ao fazer login)
**Solução**:
- Certifique-se de que você se registrou anteriormente
- Tente em condições de iluminação semelhantes às do registro
- Ajuste a posição do seu rosto

### Problema: Erro de conexão com a API
**Solução**:
- Verifique se o servidor FastAPI está rodando
- Verifique se a URL da API está correta em `Login.tsx` e `Register.tsx`
- Verifique se não há problemas de CORS

## 📊 Modelo de Reconhecimento Facial

A aplicação utiliza o modelo **ArcFace** do DeepFace, que:
- Gera embeddings faciais de 512 dimensões
- Utiliza a métrica de distância euclidiana para comparação
- Threshold padrão: 0.8 (pode ser ajustado em `main.py`)

## 🔄 Persistência de Dados

- **Frontend**: O nome do usuário autenticado é armazenado em `localStorage`
- **Backend**: Os embeddings faciais são salvos em `db.pkl` (arquivo pickle)

## 📝 Variáveis de Ambiente

### Frontend
- `VITE_API_URL`: URL da API FastAPI (padrão: `https://8000-i4kdfxb7vyxuj3epzakjp-85191085.manus.computer`)

### Backend
- Nenhuma variável de ambiente obrigatória
- `THRESH`: Threshold de reconhecimento (padrão: 0.8)
- `DB_FILE`: Caminho do arquivo de banco de dados (padrão: `db.pkl`)

## 🚀 Deployment

### Frontend (React)
```bash
pnpm build
# Servir a pasta 'dist' em um servidor web estático
```

### Backend (Python)
```bash
# Em produção, use um servidor ASGI como Gunicorn
gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app
```

## 📚 Dependências

### Frontend
- react@19
- react-dom@19
- wouter (roteamento)
- shadcn/ui (componentes)
- tailwindcss (styling)
- lucide-react (ícones)

### Backend
- fastapi
- uvicorn
- python-multipart
- opencv-python
- deepface
- numpy
- tensorflow
- tf-keras

## 🎓 Referências

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [DeepFace GitHub](https://github.com/serengp/deepface)
- [React Documentation](https://react.dev/)
- [Wouter Documentation](https://github.com/molefrog/wouter)

## 📄 Licença

Este projeto é fornecido como está para fins educacionais e de demonstração.

## 👨‍💻 Autor

Desenvolvido como uma aplicação de reconhecimento facial completa com autenticação biométrica.

---

**Última atualização**: 19 de Outubro de 2025

