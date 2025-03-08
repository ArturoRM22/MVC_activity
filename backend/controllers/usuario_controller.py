import sqlite3
from typing import List
from database.database import get_db_connection
from models.models import UsuarioResponse, UserRole, Medico, Paciente, Usuario, MedicoResponse, PacienteResponse

class UsuarioController:
    @staticmethod
    def obtener_admins_enfermeras(rol: UserRole) -> List[UsuarioResponse]:
        conn = get_db_connection()
        cursor = conn.cursor()

        try:
            # Fetch users by role
            cursor.execute("""
                SELECT id, nombre, username, password, rol
                FROM Usuario
                WHERE rol = ?
            """, (rol.value,))

            usuarios = cursor.fetchall()

            # Convert the result into a list of Usuario objects
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
            # Fetch users by role
            cursor.execute("""
                SELECT id, nombre, username, rol
                FROM Usuario
            """)

            usuarios = cursor.fetchall()

            # Convert the result into a list of Usuario objects
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
            # Fetch user by ID
            cursor.execute("""
                SELECT id, nombre, username, rol
                FROM Usuario WHERE id = ?
            """, (user_id,))  # Pass user_id as a tuple

            # Fetch a single row
            usuario = cursor.fetchone()

            if not usuario:
                raise Exception("User not found")

            # Convert the result into a UsuarioResponse object
            return UsuarioResponse(
                id=usuario["id"],
                nombre=usuario["nombre"],
                username=usuario["username"],
                rol=usuario["rol"]
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
            # Fetch doctors by joining Usuario and Medico tables
            cursor.execute("""
                SELECT Usuario.id, Usuario.nombre, Usuario.username, Usuario.password, Usuario.rol,
                    Medico.especialidad, Medico.estado, Medico.horarios
                FROM Usuario
                JOIN Medico ON Usuario.id = Medico.id
                WHERE Usuario.rol = 'medico'
            """)

            usuarios = cursor.fetchall()

            return [
                MedicoResponse(
                    id=usuario["id"],
                    nombre=usuario["nombre"],
                    username=usuario["username"],
                    rol=usuario["rol"],
                    especialidad= usuario["especialidad"],
                    estado = usuario["estado"],
                    horarios =usuario["horarios"]
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
            # Fetch patients by joining Usuario and Paciente tables
            cursor.execute("""
                SELECT Usuario.id, Usuario.nombre, Usuario.username, Usuario.password, Usuario.rol,
                    Paciente.edad, Paciente.enfermedad
                FROM Usuario
                JOIN Paciente ON Usuario.id = Paciente.id
                WHERE Usuario.rol = 'paciente'
            """)

            usuarios = cursor.fetchall()

            # Convert the result into a list of UsuarioResponse objects
            return [
                PacienteResponse(
                    id=usuario["id"],
                    nombre=usuario["nombre"],
                    username=usuario["username"],
                    rol=usuario["rol"],
                    edad = usuario["edad"],
                    enfermedad = usuario["enfermedad"]
                )
                for usuario in usuarios
            ]

        except sqlite3.IntegrityError as e:
            raise Exception(f"Database error: {str(e)}")
        finally:
            conn.close()

    @staticmethod
    def registrar_enfermera_o_admin(usuario: Usuario):
        conn = get_db_connection()
        cursor = conn.cursor()

        try:
            # Insert into Usuario table
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
        except sqlite3.IntegrityError as e:
            raise Exception(f"Database error: {str(e)}")
        finally:
            conn.close()

        return usuario

    @staticmethod
    def registrar_medico(medico: Medico):
        conn = get_db_connection()
        cursor = conn.cursor()

        try:
            # Insert into Usuario table
            cursor.execute("""
                INSERT INTO Usuario (nombre, username, password, rol)
                VALUES (?, ?, ?, ?)
            """, (
                medico.nombre,
                medico.username,
                medico.password, 
                medico.rol.value
            ))

            # Get the auto-generated user ID
            user_id = cursor.lastrowid

            # Insert into Medico table
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
        except sqlite3.IntegrityError as e:
            raise Exception(f"Database error: {str(e)}")
        finally:
            conn.close()

        return medico

    @staticmethod
    def registrar_paciente(paciente: Paciente):
        conn = get_db_connection()
        cursor = conn.cursor()

        try:
            # Insert into Usuario table
            cursor.execute("""
                INSERT INTO Usuario (nombre, username, password, rol)
                VALUES (?, ?, ?, ?)
            """, (
                paciente.nombre,
                paciente.username,
                paciente.password, 
                paciente.rol.value
            ))

            # Get the auto-generated user ID
            user_id = cursor.lastrowid

            # Insert into Paciente table
            cursor.execute("""
                INSERT INTO Paciente (id, edad, enfermedad)
                VALUES (?, ?, ?)
            """, (
                user_id,
                paciente.edad,
                paciente.enfermedad
            ))

            conn.commit()
        except sqlite3.IntegrityError as e:
            raise Exception(f"Database error: {str(e)}")
        finally:
            conn.close()

        return paciente