from fastapi import APIRouter, HTTPException
from models.models import Medico
from controllers.medico_controller import MedicoController

router = APIRouter(prefix="/medicos", tags=["medicos"])

@router.post("/", response_model=Medico)
def crear_admin(medico: Medico):
    try:
        return MedicoController.registrar_medico(medico)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))