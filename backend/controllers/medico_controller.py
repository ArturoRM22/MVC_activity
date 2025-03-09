from typing import List
from models.objetos.models import Cita, CitaStatus
from models.clasesDAO.CitaDAO import CitaDAO  # Import the CitaDAO class

class MedicoController:
    @staticmethod
    def aceptar_cita(cita_id: int) -> bool:
        """
        Accept an appointment (cita) by updating its status to "Pendiente".
        """
        return CitaDAO.actualizar_estado_cita(cita_id, CitaStatus.PENDIENTE)

    @staticmethod
    def cancelar_cita(cita_id: int) -> bool:
        """
        Cancel an appointment (cita) by updating its status to "Cancelada".
        """
        return CitaDAO.actualizar_estado_cita(cita_id, CitaStatus.CANCELADA)

    @staticmethod
    def obtener_citas(medico_id: int) -> List[Cita]:
        """
        Fetch all appointments (citas) for the given doctor (medico).
        """
        return CitaDAO.obtener_citas_por_medico(medico_id)

    @staticmethod
    def terminar_cita(cita_id: int) -> bool:
        """
        Mark an appointment (cita) as completed by updating its status to "Terminada".
        """
        return CitaDAO.actualizar_estado_cita(cita_id, CitaStatus.TERMINADA)