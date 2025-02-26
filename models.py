from pydantic import BaseModel
from datetime import date, datetime

class Usuario(BaseModel):
    id: int
    nombre: str
    rol: str

class Admin(Usuario):
    def asignarCita(self, cita):
        pass

    def verCita(self, cita_id):
        
        pass

    def actualizarCita(self, cita):
        pass

class Enfermera(Usuario):
    def actualizarCita(self, cita):
        pass

    def registrarVitales(self, paciente, vitales):
        pass

    def asistir(self, cita):
        pass

class Paciente(Usuario):
    def agendarCita(self, cita):
        pass

    def verCita(self, cita_id):
        pass

    def cancelarCita(self, cita_id):
        pass

class Cita(BaseModel):
    id: int
    fecha: date
    hora: datetime
    motivo: str
    estado: str

class Medico(Usuario):
    especialidad: str
    horarios: str

    def revisarCita(self, cita):
        pass

    def aceptarCita(self, cita):
        pass

    def cancelarCita(self, cita):
        pass