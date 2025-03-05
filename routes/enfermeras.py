from fastapi import APIRouter, HTTPException
from models.models import Usuario
from controllers.enfermera_controller import EnfermeraController

router = APIRouter(prefix="/enfermeras", tags=["Enfermeras"])

@router.get("/asistir")
def asistir():
    try:
        return EnfermeraController.asistir()
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))