import sqlite3
from database.database import get_db_connection
from models.models import Usuario

class EnfermeraController:
    @staticmethod
    def registrar_enfermera(enfermera: Usuario):
        conn = get_db_connection()
        cursor = conn.cursor()

        print(f"Registering doctor: id={enfermera.id}, nombre={enfermera.nombre}, especialidad={enfermera.especialidad}")

        try:
            cursor.execute("""
            INSERT INTO Usuario (id, nombre, rol)
            VALUES (?, ?, ?)
            """, (enfermera.id, enfermera.nombre, "enfermera"))

            cursor.execute("""
            INSERT INTO Enfermera (id, especialidad, horarios)
            VALUES (?, ?, ?)
            """, (enfermera.id, enfermera.especialidad, enfermera.horarios))

            conn.commit()
        except sqlite3.IntegrityError as e:
            raise Exception(f"Database error: {str(e)}")
        finally:
            conn.close()

        return enfermera
