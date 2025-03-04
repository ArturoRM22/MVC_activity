from pydantic import BaseModel
from datetime import date, datetime

class Usuario(BaseModel):
    id: int
    nombre: str
    rol: str

class Cita(BaseModel):
    id: int
    fecha: date
    hora: datetime
    motivo: str
    estado: str

class Medico(Usuario):
    especialidad: str
    horarios: str