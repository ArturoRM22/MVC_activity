from fastapi import APIRouter, HTTPException
from models.models import Usuario, Cita, CitaUpdate, UsuarioResponse, Medico, Paciente, PacienteResponse, MedicoResponse
from controllers.admin_controller import AdminController
from typing import List

router = APIRouter(prefix="/admins", tags=["admins"])

@router.post("/registrar-usuario", response_model=Usuario)
def registrar_usuario(usuario: Usuario):
    try:
        return AdminController.registrar_enfermera_o_admin(usuario)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/registrar-paciente", response_model=Paciente)
def registrar_paciente(paciente: Paciente):
    try:
        return AdminController.registrar_paciente(paciente)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/registrar-medico", response_model=Medico)
def registrar_medico(medico: Medico):
    try:
        return AdminController.registrar_medico(medico)
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

@router.get("/medicos", response_model=List[MedicoResponse])
def obtener_medicos():
    try:
        return AdminController.obtener_medicos()
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/pacientes", response_model=List[PacienteResponse])
def obtener_pacientes():
    try:
        return AdminController.obtener_pacientes()
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))