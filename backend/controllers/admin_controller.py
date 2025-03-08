import sqlite3
from models.models import Usuario, UserRole, Cita, CitaUpdate, UsuarioResponse, Medico, Paciente, PacienteResponse, MedicoResponse
from database.database import get_db_connection
from controllers.cita_controller import CitaController
from controllers.usuario_controller import UsuarioController
from typing import List

class AdminController:
    
    @staticmethod
    def registrar_medico(medico: Medico):
        return UsuarioController.registrar_medico(medico)

    @staticmethod
    def registrar_paciente(paciente: Paciente):
        return UsuarioController.registrar_paciente(paciente)

    @staticmethod
    def registrar_enfermera_o_admin(usuario: Usuario):
        return UsuarioController.registrar_enfermera_o_admin(usuario)   

    @staticmethod
    def obtener_usuarios() -> List[UsuarioResponse]:
        return UsuarioController.obtener_usuarios()

    @staticmethod
    def obtener_medicos() -> List[MedicoResponse]:
        return UsuarioController.obtener_medicos()

    @staticmethod
    def obtener_pacientes() -> List[PacienteResponse]:
        return UsuarioController.obtener_pacientes()

    @staticmethod
    def obtener_citas() -> List[Cita]:
        # Fetch appointments for the doctor
        return CitaController.obtener_citas()

    @staticmethod
    def actualizar_cita(cita_id: int, nueva_cita: CitaUpdate):
        # Update the appointment
        return CitaController.actualizar_cita(cita_id, nueva_cita)

    
