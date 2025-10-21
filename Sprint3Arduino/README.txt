Integrantes: 

Gabriel Gomes Catanzaro / RM93445 
Lucas Gomes Alcântara / RM98766 
Henrique Canali Cuzato / RM551326 
Filipe Prado Menezes / RM98765 
Cássio Eid Kobaysahi Yonetsuka / RM99678



Professor, tive um problema na entrega do video, onde quem gravou o vídeo foi um colega do grupo e o video estava sem audio, tive que regravar o audio por cima pois ele estava com o trabalho no note e estava viajando, espero que não seja um problema

# Requisitos para rodar a aplicação

## Passo 1 — Criar e ativar o venv

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
```

> Se der erro de execução, rode uma vez:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

## Passo 2 — Instalar bibliotecas

Com o venv ativado, rode:

```powershell
pip install --upgrade pip setuptools wheel
pip install tensorflow-cpu==2.16.1 deepface==0.0.93 opencv-python==4.10.0.84 numpy==1.26.4
```

---

## Passo 3 — Testar instalação

```powershell
python -c "from deepface import DeepFace; import cv2, numpy as np; print('deepface ok')"
```

Se aparecer `deepface ok`, está funcionando.

---

## Passo 4 — Rodar a aplicação

```powershell
python face_app.py
```

---

### Observações

* Esse guia é para **CPU-only**. Para usar GPU (NVIDIA), é necessário instalar CUDA/cuDNN e TensorFlow compatível.
