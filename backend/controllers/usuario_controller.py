from typing import List
from models.objetos.models import UsuarioResponse, UserRole, Medico, Paciente, Usuario, MedicoResponse, PacienteResponse
from models.clasesDAO.UsuarioDAO import UsuarioDAO

class UsuarioController:
    @staticmethod
    def obtener_admins_enfermeras(rol: UserRole) -> List[UsuarioResponse]:
        return UsuarioDAO.obtener_admins_enfermeras(rol)

    @staticmethod
    def obtener_usuarios() -> List[UsuarioResponse]:
        return UsuarioDAO.obtener_usuarios()

    @staticmethod
    def obtener_usuario_por_id(user_id: int) -> UsuarioResponse:
        return UsuarioDAO.obtener_usuario_por_id(user_id)

    @staticmethod
    def obtener_medicos() -> List[MedicoResponse]:
        return UsuarioDAO.obtener_medicos()

    @staticmethod
    def obtener_pacientes() -> List[PacienteResponse]:
        return UsuarioDAO.obtener_pacientes()

    @staticmethod
    def registrar_enfermera_o_admin(usuario: Usuario) -> Usuario:
        return UsuarioDAO.registrar_enfermera_o_admin(usuario)

    @staticmethod
    def registrar_medico(medico: Medico) -> Medico:
        return UsuarioDAO.registrar_medico(medico)

    @staticmethod
    def registrar_paciente(paciente: Paciente) -> Paciente:
        return UsuarioDAO.registrar_paciente(paciente)