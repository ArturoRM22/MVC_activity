from typing import List
from models.models import Cita, CitaStatus, CitaUpdate
from models.CitaDAO import CitaDAO

class CitaController:
    @staticmethod
    def registrar_cita(cita: Cita) -> Cita:
        return CitaDAO.registrar_cita(cita)

    @staticmethod
    def aceptar_cita(cita_id: int) -> dict:
        success = CitaDAO.actualizar_estado_cita(cita_id, CitaStatus.PENDIENTE)
        return {"success": success, "message": "Appointment accepted successfully." if success else "No appointment found with the given ID."}

    @staticmethod
    def cancelar_cita(cita_id: int) -> dict:
        success = CitaDAO.actualizar_estado_cita(cita_id, CitaStatus.CANCELADA)
        return {"success": success, "message": "Appointment canceled successfully." if success else "No appointment found with the given ID."}

    @staticmethod
    def terminar_cita(cita_id: int) -> dict:
        success = CitaDAO.actualizar_estado_cita(cita_id, CitaStatus.TERMINADA)
        return {"success": success, "message": "Appointment terminated successfully." if success else "No appointment found with the given ID."}

    @staticmethod
    def obtener_citas_por_medico(medico_id: int) -> List[Cita]:
        return CitaDAO.obtener_citas_por_medico(medico_id)

    @staticmethod
    def obtener_citas() -> List[Cita]:
        return CitaDAO.obtener_citas()

    @staticmethod
    def actualizar_cita(cita_id: int, nueva_cita: CitaUpdate) -> Cita:
        return CitaDAO.actualizar_cita(cita_id, nueva_cita)

    @staticmethod
    def obtener_citas_por_paciente(paciente_id: int) -> List[Cita]:
        return CitaDAO.obtener_citas_por_paciente(paciente_id)