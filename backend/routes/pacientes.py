from fastapi import APIRouter, HTTPException
from models.models import Usuario, Cita, UsuarioResponse
from controllers.paciente_controller import PacienteController
from typing import List

router = APIRouter(prefix="/pacientes", tags=["pacientes"])

@router.get("/medicos", response_model=List[UsuarioResponse])
def obtener_medicos():
    try:
        return PacienteController.obtener_medicos()
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/citas/{id_paciente}", response_model=List[Cita])
def obtener_citas(id_paciente: int):
    try:
        return PacienteController.obtener_citas(id_paciente)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/citas/", response_model=Cita)
def solicitar_cita(cita: Cita):
    try:
        return PacienteController.solicitar_cita(cita)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/citas/{cita_id}/cancelar")
def cancelar_cita(cita_id: int):
    try:
        return PacienteController.cancelar_cita(cita_id)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

