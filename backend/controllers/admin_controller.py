from typing import List
from models.objetos.models import Usuario, UserRole, Cita, CitaUpdate, UsuarioResponse, Medico, Paciente, PacienteResponse, MedicoResponse
from models.clasesDAO.UsuarioDAO import UsuarioDAO 
from models.clasesDAO.CitaDAO import CitaDAO  

class AdminController:
    @staticmethod
    def registrar_medico(medico: Medico) -> Medico:
        """
        Register a new doctor (medico).
        """
        return UsuarioDAO.registrar_medico(medico)

    @staticmethod
    def registrar_paciente(paciente: Paciente) -> Paciente:
        """
        Register a new patient (paciente).
        """
        return UsuarioDAO.registrar_paciente(paciente)

    @staticmethod
    def registrar_enfermera_o_admin(usuario: Usuario) -> Usuario:
        """
        Register a new nurse (enfermera) or admin.
        """
        return UsuarioDAO.registrar_enfermera_o_admin(usuario)

    @staticmethod
    def obtener_usuarios() -> List[UsuarioResponse]:
        """
        Fetch all users (usuarios).
        """
        return UsuarioDAO.obtener_usuarios()

    @staticmethod
    def obtener_medicos() -> List[MedicoResponse]:
        """
        Fetch all doctors (medicos).
        """
        return UsuarioDAO.obtener_medicos()

    @staticmethod
    def obtener_pacientes() -> List[PacienteResponse]:
        """
        Fetch all patients (pacientes).
        """
        return UsuarioDAO.obtener_pacientes()

    @staticmethod
    def obtener_citas() -> List[Cita]:
        """
        Fetch all appointments (citas).
        """
        return CitaDAO.obtener_citas()

    @staticmethod
    def actualizar_cita(cita_id: int, nueva_cita: CitaUpdate) -> Cita:
        """
        Update an existing appointment (cita).
        """
        return CitaDAO.actualizar_cita(cita_id, nueva_cita)