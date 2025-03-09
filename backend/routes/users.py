from fastapi import APIRouter, HTTPException
from models.objetos.models import UsuarioResponse
from controllers.usuario_controller import UsuarioController

router = APIRouter(prefix="/users", tags=["users"])

@router.get("/{user_id}", response_model=UsuarioResponse)
def obtener_citas(user_id: int):
    try:
        return UsuarioController.obtener_usuario_por_id(user_id)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))