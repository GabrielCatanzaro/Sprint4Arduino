from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import cv2
import pickle
import numpy as np
from deepface import DeepFace
import os

app = FastAPI()

# Permitir CORS para frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Em produção, especifique os domínios do frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DB_FILE = "db.pkl"
THRESH = 0.8  # ArcFace threshold

# Cria banco de dados se não existir
if not os.path.exists(DB_FILE):
    with open(DB_FILE, "wb") as f:
        pickle.dump({}, f)

def load_db():
    with open(DB_FILE, "rb") as f:
        return pickle.load(f)

def save_db(db):
    with open(DB_FILE, "wb") as f:
        pickle.dump(db, f)

def get_face_embedding(image_data: bytes):
    np_array = np.frombuffer(image_data, np.uint8)
    img = cv2.imdecode(np_array, cv2.IMREAD_COLOR)
    if img is None:
        raise ValueError("Não foi possível decodificar a imagem.")

    rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

    try:
        faces = DeepFace.represent(
            rgb,
            model_name="ArcFace",
            detector_backend="opencv",
            enforce_detection=False
        )
        if not faces:
            return None, "Nenhuma face detectada na imagem."
        if len(faces) > 1:
            return None, "Múltiplas faces detectadas na imagem."

        face_embedding = np.array(faces[0]["embedding"], dtype=np.float32)
        face_embedding = face_embedding / np.linalg.norm(face_embedding)
        return face_embedding, None
    except Exception as e:
        return None, f"Erro ao processar a face: {str(e)}"

# =========================
# Endpoint de registro
# =========================
@app.post("/register/")
async def register_face(
    name: str = Form(...),  # <-- alteração importante: usar Form para receber do FormData
    file: UploadFile = File(...)
):
    try:
        image_data = await file.read()
        embedding, error_message = get_face_embedding(image_data)

        if error_message:
            raise HTTPException(status_code=400, detail=error_message)

        db = load_db()
        if name in db:
            raise HTTPException(status_code=400, detail=f"O nome '{name}' já está registrado.")

        db[name] = embedding
        save_db(db)
        return JSONResponse(content={"message": f"Rosto de '{name}' registrado com sucesso!"}, status_code=200)
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro interno do servidor: {str(e)}")

# =========================
# Endpoint de login
# =========================
@app.post("/login/")
async def login_face(file: UploadFile = File(...)):
    try:
        image_data = await file.read()
        embedding, error_message = get_face_embedding(image_data)

        if error_message:
            raise HTTPException(status_code=400, detail=error_message)

        db = load_db()
        if not db:
            raise HTTPException(status_code=400, detail="Nenhum rosto registrado no sistema.")

        nome_detectado, dist = "Desconhecido", 999.0
        for n, v in db.items():
            d = np.linalg.norm(embedding - v)
            if d < dist:
                nome_detectado, dist = n, d

        if dist < THRESH:
            return JSONResponse(content={"message": f"Login bem-sucedido! Bem-vindo(a), {nome_detectado}!", "user": nome_detectado}, status_code=200)
        else:
            raise HTTPException(status_code=401, detail="Acesso negado. Rosto não reconhecido.")
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro interno do servidor: {str(e)}")

# =========================
# Health check
# =========================
@app.get("/health")
async def health_check():
    return {"status": "ok"}

# =========================
# Rodar o backend local
# =========================
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
