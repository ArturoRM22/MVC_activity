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

class UsuarioResponse(BaseModel):
    id: Optional[int] = None
    nombre: Optional[str] = None
    username: Optional[str] = None
    rol: Optional[UserRole] = None

class LoginRequest(BaseModel):
    username: str
    password: str

class Paciente(Usuario):
    id: Optional[int] = None
    edad: int
    enfermedad: str

class PacienteResponse(BaseModel):
    id: Optional[int] = None
    nombre: Optional[str] = None
    username: Optional[str] = None
    password: Optional[str] = None
    rol: Optional[UserRole] = None
    edad: Optional[int] = None
    enfermedad: Optional[str] = None

class Medico(Usuario):
    id: Optional[int] = None
    especialidad: str
    estado: str
    horarios: str

class MedicoResponse(BaseModel):
    id: Optional[int] = None
    nombre: Optional[str] = None
    username: Optional[str] = None
    password: Optional[str] = None
    rol: Optional[UserRole] = None
    especialidad: Optional[str] = None
    estado: Optional[str] = None
    horarios: Optional[str] = None

class Cita(BaseModel):
    id: Optional[int] = None
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