import sqlite3
from database.database import get_db_connection
from models.models import Cita

class CitaController:
    @staticmethod
    def registrar_cita(cita: Cita):
        conn = get_db_connection()
        cursor = conn.cursor()

        print(f"Creating appointment: fecha={cita.fecha}, hora={cita.hora}, paciente_id={cita.paciente_id}, medico_id={cita.medico_id}")

        try:
            # Ensure paciente_id exists
            cursor.execute("SELECT id FROM Paciente WHERE id = ?", (cita.paciente_id,))
            if cursor.fetchone() is None:
                raise Exception(f"Paciente with id {cita.paciente_id} does not exist.")

            # Ensure medico_id exists
            cursor.execute("SELECT id FROM Medico WHERE id = ?", (cita.medico_id,))
            if cursor.fetchone() is None:
                raise Exception(f"Medico with id {cita.medico_id} does not exist.")

            # Insert the appointment
            cursor.execute("""
                INSERT INTO Cita (fecha, hora, motivo, estado, paciente_id, medico_id)
                VALUES (?, ?, ?, ?, ?, ?)
            """, (cita.fecha, cita.hora, cita.motivo, cita.estado, cita.paciente_id, cita.medico_id))

            conn.commit()
        except sqlite3.IntegrityError as e:
            raise Exception(f"Database error: {str(e)}")
        finally:
            conn.close()

        return cita
