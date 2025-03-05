import sqlite3
from models.models import Usuario, UserRole, Cita, CitaUpdate
from database.database import get_db_connection
from controllers.cita_controller import CitaController
from typing import List

class AdminController:
    @staticmethod
    def crear_admin(admin: Usuario):
        conn = get_db_connection()
        cursor = conn.cursor()
        
        try:
            # Insert into Usuario table
            cursor.execute("""
            INSERT INTO Usuario (nombre, username, password, rol)
            VALUES (?, ?, ?, ?)
            """, (admin.nombre, admin.username, admin.password, UserRole.ADMIN.value))

            conn.commit()
        except sqlite3.IntegrityError as e:
            raise Exception(f"Database error: {str(e)}")
        finally:
            conn.close()

        return admin

    @staticmethod
    def obtener_citas() -> List[Cita]:
        # Fetch appointments for the doctor
        return CitaController.obtener_citas()

    @staticmethod
    def actualizar_cita(cita_id: int, nueva_cita: CitaUpdate):
        # Update the appointment
        return CitaController.actualizar_cita(cita_id, nueva_cita)

    @staticmethod
    def registrar_usuario(usuario: Usuario):
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

