from fastapi import APIRouter, HTTPException
from models.objetos.models import Usuario, LoginRequest
from controllers.auth_controller import AuthController

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/login")
def login(login_request: LoginRequest):
    try:
        return AuthController.login(login_request.username, login_request.password)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))