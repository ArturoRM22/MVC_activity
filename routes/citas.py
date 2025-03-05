from fastapi import APIRouter, HTTPException
from models.models import Cita
from controllers.cita_controller import CitaController

router = APIRouter(prefix="/citas", tags=["citas"])

@router.post("/registrar", response_model=Cita)
def registrar_cita(cita: Cita):
    try:
        return CitaController.registrar_cita(cita)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))