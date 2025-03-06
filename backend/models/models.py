from pydantic import BaseModel
from datetime import date, datetime
from enum import Enum
from typing import Optional

class CitaStatus(str, Enum):
    POR_ACEPTAR = "Por aceptar"
    PENDIENTE = "Pendiente"
    CANCELADA = "Cancelada"
    TERMINADA = "Terminada"

class UserRole(str, Enum):
    ADMIN = "admin"
    MEDICO = "medico"
    ENFERMERA = "enfermera"
    PACIENTE = "paciente"

class Usuario(BaseModel):
    nombre: str
    username: str 
    password: str 
    rol: UserRole

class Cita(BaseModel):
    #id: int
    fecha: date
    hora: str
    motivo: str
    estado: CitaStatus
    paciente_id: int
    medico_id: int

class CitaUpdate(BaseModel):
    fecha: Optional[date] = None
    hora: Optional[str] = None
    motivo: Optional[str] = None
    estado: Optional[CitaStatus] = None
    paciente_id: Optional[int] = None
    medico_id: Optional[int] = None

class UsuarioResponse(BaseModel):
    id: Optional[int] = None
    nombre: Optional[str] = None
    username: Optional[str] = None
    password: Optional[str] = None
    rol: Optional[UserRole] = None

class LoginRequest(BaseModel):
    username: str
    password: str