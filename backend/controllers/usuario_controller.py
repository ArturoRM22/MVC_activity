import sqlite3
from typing import List
from database.database import get_db_connection
from models.models import UsuarioResponse, UserRole

class UsuarioController:
    @staticmethod
    def obtener_usuarios_por_rol(rol: UserRole) -> List[UsuarioResponse]:
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