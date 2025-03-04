import sqlite3
from database.database import get_db_connection
from models.models import Usuario

class PacienteController:
    @staticmethod
    def registrar_paciente(paciente: Usuario):
        conn = get_db_connection()
        cursor = conn.cursor()

        print(f"Registering patient: id={paciente.id}, nombre={paciente.nombre}, rol={paciente.rol}")

        try:
            cursor.execute("""
            INSERT INTO Usuario (id, nombre, rol)
            VALUES (?, ?, ?)
            """, (paciente.id, paciente.nombre, paciente.rol))

            cursor.execute("""
            INSERT INTO Paciente (id)
            VALUES (?)
            """, (paciente.id,))

            conn.commit()
        except sqlite3.IntegrityError as e:
            raise Exception(f"Database error: {str(e)}")
        finally:
            conn.close()

        return paciente
