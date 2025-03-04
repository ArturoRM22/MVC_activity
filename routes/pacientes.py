from fastapi import APIRouter, HTTPException
from models.models import Usuario
from controllers.paciente_controller import PacienteController

router = APIRouter(prefix="/pacientes", tags=["pacientes"])

@router.post("/", response_model=Usuario)
def registrar_paciente(paciente: Usuario):
    try:
        return PacienteController.registrar_paciente(paciente)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))