from fastapi import APIRouter, HTTPException
from models.models import Usuario, Cita, CitaUpdate, UsuarioResponse
from controllers.admin_controller import AdminController
from typing import List

router = APIRouter(prefix="/admins", tags=["admins"])

@router.post("/registrar", response_model=Usuario)
def crear_admin(admin: Usuario):
    try:
        return AdminController.crear_admin(admin)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/usuarios", response_model=Usuario)
def registrar_usuario(usuario: Usuario):
    try:
        return AdminController.registrar_usuario(usuario)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/citas", response_model=List[Cita])
def obtener_citas():
    try:
        return AdminController.obtener_citas()
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/usuarios", response_model=List[UsuarioResponse])
def obtener_usuarios():
    try:
        return AdminController.obtener_usuarios()
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.patch("/citas/{cita_id}", response_model=Cita)
def actualizar_cita_parcial(cita_id: int, cita_update: CitaUpdate):
    try:
        return AdminController.actualizar_cita(cita_id, cita_update)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/medicos", response_model=List[UsuarioResponse])
def obtener_medicos():
    try:
        return AdminController.obtener_medicos()
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/pacientes", response_model=List[UsuarioResponse])
def obtener_pacientes():
    try:
        return AdminController.obtener_pacientes()
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))