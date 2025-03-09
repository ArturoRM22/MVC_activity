from typing import List
from models.objetos.models import UsuarioResponse, Cita
from models.clasesDAO.UsuarioDAO import UsuarioDAO
from models.clasesDAO.CitaDAO import CitaDAO

class PacienteController:
    @staticmethod
    def obtener_medicos() -> List[UsuarioResponse]:
        """
        Fetch all doctors (medicos) from the database.
        """
        return UsuarioDAO.obtener_medicos()

    @staticmethod
    def solicitar_cita(cita: Cita) -> Cita:
        """
        Request a new appointment (cita) for the patient.
        """
        return CitaDAO.registrar_cita(cita)

    @staticmethod
    def cancelar_cita(cita_id: int) -> bool:
        """
        Cancel an existing appointment (cita) by its ID.
        """
        return CitaDAO.actualizar_estado_cita(cita_id, CitaStatus.CANCELADA)

    @staticmethod
    def obtener_citas(id_paciente: int) -> List[Cita]:
        """
        Fetch all appointments (citas) for the given patient (paciente).
        """
        return CitaDAO.obtener_citas_por_paciente(id_paciente)