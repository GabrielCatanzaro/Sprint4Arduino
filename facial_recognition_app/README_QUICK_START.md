# 🔐 Facial Recognition App - Guia Rápido

## ⚡ Início Rápido

### 1️⃣ Iniciar o Backend (Python/FastAPI)

```bash
cd /home/ubuntu/Sprint3Arduino
pip3 install fastapi uvicorn python-multipart opencv-python deepface numpy tf-keras
uvicorn main:app --host 0.0.0.0 --port 8000
```

✅ O servidor estará disponível em: `http://localhost:8000`

### 2️⃣ Iniciar o Frontend (React)

```bash
cd /home/ubuntu/facial_recognition_app
pnpm dev
```

✅ A aplicação estará disponível em: `http://localhost:3000`

## 🎯 Usando a Aplicação

### Registrar um Novo Usuário

1. Acesse `http://localhost:3000`
2. Clique em **"Registre-se aqui"**
3. Digite seu nome completo
4. Clique em **"Ativar Câmera"**
5. Posicione seu rosto no centro da câmera
6. Clique em **"Capturar e Registrar"**
7. Aguarde a mensagem de sucesso

### Fazer Login

1. Acesse `http://localhost:3000`
2. Clique em **"Ativar Câmera"**
3. Posicione seu rosto no centro da câmera (mesma posição do registro)
4. Clique em **"Capturar e Fazer Login"**
5. Será redirecionado para a página Home se reconhecido

### Fazer Logout

1. Na página Home, clique em **"Sair"**
2. Será redirecionado para a página de Login

## 📱 Requisitos

- ✅ Webcam conectada
- ✅ Navegador moderno (Chrome, Firefox, Safari, Edge)
- ✅ Python 3.11+
- ✅ Node.js 22+
- ✅ Boa iluminação para captura de rosto

## 🔧 Arquivos Importantes

| Arquivo | Descrição |
|---------|-----------|
| `/home/ubuntu/Sprint3Arduino/main.py` | API FastAPI com endpoints de login/registro |
| `/home/ubuntu/Sprint3Arduino/db.pkl` | Banco de dados de rostos (criado automaticamente) |
| `/home/ubuntu/facial_recognition_app/client/src/pages/Login.tsx` | Tela de Login |
| `/home/ubuntu/facial_recognition_app/client/src/pages/Register.tsx` | Tela de Registro |
| `/home/ubuntu/facial_recognition_app/client/src/pages/HomeUser.tsx` | Tela Home |

## 🐛 Problemas Comuns

### ❌ "Não foi possível acessar a câmera"
- Verifique as permissões do navegador
- Tente em outro navegador
- Verifique se a câmera está conectada

### ❌ "Nenhuma face detectada"
- Melhore a iluminação
- Posicione seu rosto no centro
- Afaste-se ou aproxime-se da câmera

### ❌ "Rosto não reconhecido" (ao fazer login)
- Certifique-se de que você se registrou
- Tente em condições de iluminação semelhantes
- Ajuste a posição do seu rosto

### ❌ Erro de conexão com API
- Verifique se o servidor FastAPI está rodando
- Verifique a URL da API em `Login.tsx`
- Verifique os logs do servidor

## 📊 Endpoints da API

| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/register/` | Registrar novo rosto |
| `POST` | `/login/` | Fazer login com rosto |
| `GET` | `/health` | Verificar status do servidor |

## 🎨 Estrutura da Aplicação

```
Tela de Login (/)
    ├── Ativar Câmera
    ├── Capturar e Fazer Login
    └── Link para Registro

Tela de Registro (/register)
    ├── Campo de Nome
    ├── Ativar Câmera
    ├── Capturar e Registrar
    └── Link para Login

Tela Home (/home)
    ├── Nome do Usuário
    └── Botão Sair
```

## 🔐 Como Funciona o Reconhecimento

1. **Captura**: A câmera captura uma imagem do seu rosto
2. **Processamento**: O modelo ArcFace gera um "embedding" (vetor de 512 dimensões)
3. **Comparação**: O embedding é comparado com os registrados no banco de dados
4. **Decisão**: Se a distância for menor que 0.8, o rosto é reconhecido

## 📚 Documentação Completa

Para mais detalhes, veja `DOCUMENTATION.md`

## ✨ Recursos

- ✅ Login com reconhecimento facial
- ✅ Registro de novos usuários
- ✅ Webcam em tempo real
- ✅ Mensagens de sucesso/erro
- ✅ Interface responsiva
- ✅ Persistência de sessão (localStorage)
- ✅ Design moderno com Tailwind CSS

---

**Desenvolvido com ❤️ usando React + FastAPI + DeepFace**

