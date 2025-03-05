import sqlite3
from database.database import get_db_connection
from models.models import Usuario, UserRole, Cita, UsuarioResponse
from controllers.cita_controller import CitaController
from controllers.usuario_controller import UsuarioController
from typing import List

class PacienteController:
    @staticmethod
    def obtener_medicos() -> List[UsuarioResponse]:
        # Fetch all doctors
        return UsuarioController.obtener_usuarios_por_rol(UserRole.MEDICO)

    @staticmethod
    def solicitar_cita(cita: Cita):
        # Request an appointment
        return CitaController.registrar_cita(cita)

    @staticmethod
    def cancelar_cita(cita_id: int):
        # Cancel an appointment
        return CitaController.cancelar_cita(cita_id)
