import sqlite3
from database.database import get_db_connection
from models.models import Medico

class MedicoController:
    @staticmethod
    def registrar_medico(medico: Medico):
        conn = get_db_connection()
        cursor = conn.cursor()

        print(f"Registering doctor: id={medico.id}, nombre={medico.nombre}, especialidad={medico.especialidad}")

        try:
            cursor.execute("""
            INSERT INTO Usuario (id, nombre, rol)
            VALUES (?, ?, ?)
            """, (medico.id, medico.nombre, "medico"))

            cursor.execute("""
            INSERT INTO Medico (id, especialidad, horarios)
            VALUES (?, ?, ?)
            """, (medico.id, medico.especialidad, medico.horarios))

            conn.commit()
        except sqlite3.IntegrityError as e:
            raise Exception(f"Database error: {str(e)}")
        finally:
            conn.close()

        return medico
