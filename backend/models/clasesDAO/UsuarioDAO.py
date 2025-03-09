import sqlite3
from typing import List
from models.objetos.models import UsuarioResponse, UserRole, Medico, Paciente, Usuario, MedicoResponse, PacienteResponse
from database.database import get_db_connection

class UsuarioDAO:
    @staticmethod
    def obtener_admins_enfermeras(rol: UserRole) -> List[UsuarioResponse]:
        conn = get_db_connection()
        cursor = conn.cursor()

        try:
            cursor.execute("""
                SELECT id, nombre, username, password, rol
                FROM Usuario
                WHERE rol = ?
            """, (rol.value,))

            usuarios = cursor.fetchall()
            return [
                UsuarioResponse(
                    id=usuario[0],
                    nombre=usuario[1],
                    username=usuario[2],
                    password=usuario[3],
                    rol=usuario[4]
                )
                for usuario in usuarios
            ]

        except sqlite3.IntegrityError as e:
            raise Exception(f"Database error: {str(e)}")
        finally:
            conn.close()

    @staticmethod
    def obtener_usuarios() -> List[UsuarioResponse]:
        conn = get_db_connection()
        cursor = conn.cursor()

        try:
            cursor.execute("""
                SELECT id, nombre, username, rol
                FROM Usuario
            """)

            usuarios = cursor.fetchall()
            return [
                UsuarioResponse(
                    id=usuario[0],
                    nombre=usuario[1],
                    username=usuario[2],
                    rol=usuario[3]
                )
                for usuario in usuarios
            ]

        except sqlite3.IntegrityError as e:
            raise Exception(f"Database error: {str(e)}")
        finally:
            conn.close()

    @staticmethod
    def obtener_usuario_por_id(user_id: int) -> UsuarioResponse:
        conn = get_db_connection()
        cursor = conn.cursor()

        try:
            cursor.execute("""
                SELECT id, nombre, username, rol
                FROM Usuario WHERE id = ?
            """, (user_id,))

            usuario = cursor.fetchone()
            if not usuario:
                raise Exception("User not found")

            return UsuarioResponse(
                id=usuario[0],
                nombre=usuario[1],
                username=usuario[2],
                rol=usuario[3]
            )

        except sqlite3.IntegrityError as e:
            raise Exception(f"Database error: {str(e)}")
        finally:
            conn.close()

    @staticmethod
    def obtener_medicos() -> List[MedicoResponse]:
        conn = get_db_connection()
        cursor = conn.cursor()

        try:
            cursor.execute("""
                SELECT Usuario.id, Usuario.nombre, Usuario.username, Usuario.rol,
                    Medico.especialidad, Medico.estado, Medico.horarios
                FROM Usuario
                JOIN Medico ON Usuario.id = Medico.id
                WHERE Usuario.rol = 'medico'
            """)

            usuarios = cursor.fetchall()
            return [
                MedicoResponse(
                    id=usuario[0],
                    nombre=usuario[1],
                    username=usuario[2],
                    rol=usuario[3],
                    especialidad=usuario[4],
                    estado=usuario[5],
                    horarios=usuario[6]
                )
                for usuario in usuarios
            ]

        except sqlite3.IntegrityError as e:
            raise Exception(f"Database error: {str(e)}")
        finally:
            conn.close()

    @staticmethod
    def obtener_pacientes() -> List[PacienteResponse]:
        conn = get_db_connection()
        cursor = conn.cursor()

        try:
            cursor.execute("""
                SELECT Usuario.id, Usuario.nombre, Usuario.username, Usuario.rol, 
                    Paciente.edad, Paciente.enfermedad
                FROM Usuario
                JOIN Paciente ON Usuario.id = Paciente.id
                WHERE Usuario.rol = 'paciente'
            """)

            usuarios = cursor.fetchall()
            return [
                PacienteResponse(
                    id=usuario[0],
                    nombre=usuario[1],
                    username=usuario[2],
                    rol=usuario[3],
                    edad=usuario[4],
                    enfermedad=usuario[5]
                )
                for usuario in usuarios
            ]

        except sqlite3.IntegrityError as e:
            raise Exception(f"Database error: {str(e)}")
        finally:
            conn.close()

    @staticmethod
    def registrar_enfermera_o_admin(usuario: Usuario) -> Usuario:
        conn = get_db_connection()
        cursor = conn.cursor()

        try:
            cursor.execute("""
                INSERT INTO Usuario (nombre, username, password, rol)
                VALUES (?, ?, ?, ?)
            """, (
                usuario.nombre,
                usuario.username,
                usuario.password,
                usuario.rol.value
            ))

            conn.commit()
            return usuario

        except sqlite3.IntegrityError as e:
            raise Exception(f"Database error: {str(e)}")
        finally:
            conn.close()

    @staticmethod
    def registrar_medico(medico: Medico) -> Medico:
        conn = get_db_connection()
        cursor = conn.cursor()

        try:
            cursor.execute("""
                INSERT INTO Usuario (nombre, username, password, rol)
                VALUES (?, ?, ?, ?)
            """, (
                medico.nombre,
                medico.username,
                medico.password,
                medico.rol.value
            ))

            user_id = cursor.lastrowid

            cursor.execute("""
                INSERT INTO Medico (id, especialidad, estado, horarios)
                VALUES (?, ?, ?, ?)
            """, (
                user_id,
                medico.especialidad,
                medico.estado,
                medico.horarios
            ))

            conn.commit()
            return medico

        except sqlite3.IntegrityError as e:
            raise Exception(f"Database error: {str(e)}")
        finally:
            conn.close()

    @staticmethod
    def registrar_paciente(paciente: Paciente) -> Paciente:
        conn = get_db_connection()
        cursor = conn.cursor()

        try:
            cursor.execute("""
                INSERT INTO Usuario (nombre, username, password, rol)
                VALUES (?, ?, ?, ?)
            """, (
                paciente.nombre,
                paciente.username,
                paciente.password,
                paciente.rol.value
            ))

            user_id = cursor.lastrowid

            cursor.execute("""
                INSERT INTO Paciente (id, edad, enfermedad)
                VALUES (?, ?, ?)
            """, (
                user_id,
                paciente.edad,
                paciente.enfermedad
            ))

            conn.commit()
            return paciente

        except sqlite3.IntegrityError as e:
            raise Exception(f"Database error: {str(e)}")
        finally:
            conn.close()