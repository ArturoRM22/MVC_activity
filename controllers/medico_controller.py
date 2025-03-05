import sqlite3
from database.database import get_db_connection
from models.models import UserRole, Cita
from controllers.cita_controller import CitaController
from typing import List

class MedicoController:
    @staticmethod
    def aceptar_cita(cita_id: int):
        # Accept an appointment
        return CitaController.aceptar_cita(cita_id)

    @staticmethod
    def cancelar_cita(cita_id: int):
        # Cancel an appointment
        return CitaController.cancelar_cita(cita_id)

    @staticmethod
    def obtener_citas(medico_id: int) -> List[Cita]:
        # Fetch appointments for the doctor
        return CitaController.obtener_citas_por_medico(medico_id)

    @staticmethod
    def terminar_cita(cita_id: int):
        # Cancel an appointment
        return CitaController.terminar_cita(cita_id)


