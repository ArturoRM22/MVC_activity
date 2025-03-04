from fastapi import APIRouter, HTTPException
from models.models import Usuario
from controllers.admin_controller import AdminController

router = APIRouter(prefix="/admins", tags=["admins"])

@router.post("/", response_model=Usuario)
def crear_admin(admin: Usuario):
    try:
        return AdminController.crear_admin(admin)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
