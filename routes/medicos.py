from fastapi import APIRouter, HTTPException
from models.models import Cita, Usuario
from controllers.medico_controller import MedicoController
from typing import List

router = APIRouter(prefix="/medicos", tags=["medicos"])

@router.post("/citas/{cita_id}/aceptar")
def aceptar_cita(cita_id: int):
    try:
        return MedicoController.aceptar_cita(cita_id)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/citas/{cita_id}/cancelar")
def cancelar_cita(cita_id: int):
    try:
        return MedicoController.cancelar_cita(cita_id)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/citas/{cita_id}/terminar")
def cancelar_cita(cita_id: int):
    try:
        return MedicoController.terminar_cita(cita_id)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/asistir")
def asistir():
    try:
        return EnfermeraController.asistir()
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))