# 🚀 Guia de Instalação - Aplicação de Reconhecimento Facial

## 📋 Índice
1. [Visão Geral](#visão-geral)
2. [Pré-requisitos](#pré-requisitos)
3. [Instalação do Backend](#instalação-do-backend)
4. [Instalação do Frontend](#instalação-do-frontend)
5. [Executar a Aplicação](#executar-a-aplicação)
6. [Verificar se Tudo Está Funcionando](#verificar-se-tudo-está-funcionando)
7. [Próximos Passos](#próximos-passos)

---

## 🎯 Visão Geral

Você tem uma **aplicação web completa de reconhecimento facial** com:

- **Frontend**: React 19 com TypeScript, Tailwind CSS e shadcn/ui
- **Backend**: FastAPI com DeepFace para reconhecimento facial
- **Funcionalidades**: Login, Registro e Home com autenticação biométrica

---

## ✅ Pré-requisitos

Antes de começar, certifique-se de ter instalado:

### Sistema Operacional
- Windows 10+, macOS 10.14+, ou Linux (Ubuntu 20.04+)

### Software Necessário
- **Python 3.11+** - [Download](https://www.python.org/downloads/)
- **Node.js 22+** - [Download](https://nodejs.org/)
- **Git** (opcional, para controle de versão)
- **Webcam** conectada ao computador

### Navegador
- Chrome, Firefox, Safari ou Edge (versão recente)

---

## 🔧 Instalação do Backend

### Passo 1: Abrir Terminal/Prompt de Comando

### Passo 2: Navegar para o Diretório do Backend

```bash
cd Sprint3Arduino
```

### Passo 3: Criar um Ambiente Virtual (Opcional, mas Recomendado)

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

### Passo 4: Instalar Dependências

```bash
pip install fastapi uvicorn python-multipart opencv-python deepface numpy tf-keras
```

**Tempo estimado**: 5-10 minutos (dependendo da conexão)

### Passo 5: Iniciar o Servidor FastAPI

```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

Você deve ver algo como:
```
INFO:     Uvicorn running on http://0.0.0.0:8000
INFO:     Application startup complete
```

✅ **O backend está pronto!** Deixe este terminal aberto.

---

## 🎨 Instalação do Frontend

### Passo 1: Abrir um Novo Terminal/Prompt de Comando

### Passo 2: Navegar para o Diretório do Frontend

```bash
cd facial_recognition_app
```

### Passo 3: Instalar Dependências

```bash
pnpm install
```

Se não tiver `pnpm` instalado, use `npm` ou `yarn`:
```bash
npm install
# ou
yarn install
```

**Tempo estimado**: 2-5 minutos

### Passo 4: Iniciar o Servidor de Desenvolvimento

```bash
pnpm dev
```

Você deve ver algo como:
```
  ➜  Local:   http://localhost:3000/
  ➜  Network: http://192.168.x.x:3000/
```

✅ **O frontend está pronto!**

---

## 🚀 Executar a Aplicação

Agora que tanto o backend quanto o frontend estão rodando:

1. **Abra seu navegador** e acesse: `http://localhost:3000`

2. Você verá a **Tela de Login** com as opções:
   - Ativar Câmera
   - Registre-se aqui

---

## ✔️ Verificar se Tudo Está Funcionando

### Teste 1: Verificar o Backend

Abra uma nova aba do terminal e execute:

```bash
curl http://localhost:8000/health
```

Você deve receber:
```json
{"status":"ok"}
```

### Teste 2: Verificar o Frontend

Acesse `http://localhost:3000` no navegador. Você deve ver a tela de login com:
- Título "Login Facial"
- Botão "Ativar Câmera"
- Link "Registre-se aqui"

### Teste 3: Testar Registro

1. Clique em "Registre-se aqui"
2. Digite um nome (ex: "João Silva")
3. Clique em "Ativar Câmera"
4. Posicione seu rosto no centro
5. Clique em "Capturar e Registrar"
6. Você deve receber uma mensagem de sucesso

### Teste 4: Testar Login

1. Volte para a tela de Login
2. Clique em "Ativar Câmera"
3. Posicione seu rosto (mesma posição do registro)
4. Clique em "Capturar e Fazer Login"
5. Você deve ser redirecionado para a página Home

---

## 🎯 Próximos Passos

### 1. Explorar a Aplicação
- Registre vários usuários
- Teste o login com diferentes condições de iluminação
- Teste o logout

### 2. Personalizar (Opcional)
- Altere as cores em `client/src/index.css`
- Modifique as mensagens em `Login.tsx` e `Register.tsx`
- Ajuste o threshold em `main.py` (linha 19: `THRESH = 0.8`)

### 3. Fazer Deploy (Futuro)
- Frontend: Deploy em Vercel, Netlify ou GitHub Pages
- Backend: Deploy em Heroku, Railway ou AWS

---

## 🐛 Troubleshooting

### ❌ Erro: "ModuleNotFoundError: No module named 'fastapi'"
**Solução**: Execute `pip install fastapi uvicorn python-multipart opencv-python deepface numpy tf-keras`

### ❌ Erro: "Cannot find module 'react'"
**Solução**: Execute `pnpm install` ou `npm install`

### ❌ Erro: "Port 8000 already in use"
**Solução**: Use outra porta: `uvicorn main:app --port 8001`

### ❌ Erro: "Port 3000 already in use"
**Solução**: Use outra porta: `pnpm dev -- --port 3001`

### ❌ "Não foi possível acessar a câmera"
**Solução**: 
- Verifique as permissões do navegador
- Tente em outro navegador
- Reinicie o navegador

### ❌ "Nenhuma face detectada"
**Solução**:
- Melhore a iluminação
- Posicione seu rosto no centro
- Aproxime-se ou afaste-se da câmera

---

## 📚 Documentação Adicional

Para mais detalhes, consulte:
- `facial_recognition_app/DOCUMENTATION.md` - Documentação completa
- `facial_recognition_app/README_QUICK_START.md` - Guia rápido

---

## 🔐 Notas de Segurança

⚠️ **Esta é uma aplicação de demonstração.** Para uso em produção:

1. **Banco de Dados**: Migre de `db.pkl` para um banco de dados seguro (PostgreSQL, MongoDB)
2. **CORS**: Restrinja `allow_origins` aos domínios específicos
3. **Autenticação**: Adicione JWT ou OAuth2
4. **HTTPS**: Use certificados SSL/TLS
5. **Validação**: Adicione validação mais rigorosa de entrada

---

## ✨ Recursos Implementados

- ✅ Login com reconhecimento facial
- ✅ Registro de novos usuários
- ✅ Webcam em tempo real
- ✅ Mensagens de sucesso/erro
- ✅ Interface responsiva
- ✅ Persistência de sessão
- ✅ Design moderno
- ✅ API REST bem documentada

---

## 🎉 Parabéns!

Você agora tem uma **aplicação de reconhecimento facial completa e funcional**!

Aproveite e divirta-se explorando a biometria facial! 🚀

---

**Desenvolvido com ❤️ usando React + FastAPI + DeepFace**