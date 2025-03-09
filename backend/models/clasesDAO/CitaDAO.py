import sqlite3
from typing import List, Optional
from models.objetos.models import Cita, CitaStatus, CitaUpdate
from database.database import get_db_connection

class CitaDAO:
    @staticmethod
    def registrar_cita(cita: Cita) -> Cita:
        conn = get_db_connection()
        cursor = conn.cursor()

        try:
            # Ensure paciente_id exists
            cursor.execute("SELECT id FROM Usuario WHERE id = ?", (cita.paciente_id,))
            if cursor.fetchone() is None:
                raise Exception(f"Paciente with id {cita.paciente_id} does not exist.")

            # Ensure medico_id exists
            cursor.execute("SELECT id FROM Usuario WHERE id = ?", (cita.medico_id,))
            if cursor.fetchone() is None:
                raise Exception(f"Medico with id {cita.medico_id} does not exist.")

            # Check for overlapping appointments
            cursor.execute("""
                SELECT id FROM Cita 
                WHERE medico_id = ? AND fecha = ? AND hora = ?
            """, (cita.medico_id, cita.fecha, cita.hora))

            if cursor.fetchone():
                raise Exception("The doctor already has an appointment at this time.")

            # Insert the appointment
            cursor.execute("""
                INSERT INTO Cita (fecha, hora, motivo, estado, paciente_id, medico_id)
                VALUES (?, ?, ?, ?, ?, ?)
            """, (cita.fecha, cita.hora, cita.motivo, CitaStatus.POR_ACEPTAR.value, cita.paciente_id, cita.medico_id))

            conn.commit()
            return cita

        except sqlite3.IntegrityError as e:
            raise Exception(f"Database error: {str(e)}")
        finally:
            conn.close()

    @staticmethod
    def actualizar_estado_cita(cita_id: int, nuevo_estado: CitaStatus) -> bool:
        conn = get_db_connection()
        cursor = conn.cursor()

        try:
            cursor.execute("""
                UPDATE Cita 
                SET estado = ?
                WHERE id = ?
            """, (nuevo_estado.value, cita_id))

            conn.commit()
            return cursor.rowcount > 0

        except sqlite3.IntegrityError as e:
            raise Exception(f"Database error: {str(e)}")
        finally:
            conn.close()

    @staticmethod
    def obtener_citas_por_medico(medico_id: int) -> List[Cita]:
        conn = get_db_connection()
        cursor = conn.cursor()

        try:
            cursor.execute("""
                SELECT id, fecha, hora, motivo, estado, paciente_id, medico_id
                FROM Cita
                WHERE medico_id = ?
            """, (medico_id,))

            citas = cursor.fetchall()
            return [
                Cita(
                    id=cita[0],
                    fecha=cita[1],
                    hora=cita[2],
                    motivo=cita[3],
                    estado=cita[4],
                    paciente_id=cita[5],
                    medico_id=cita[6]
                )
                for cita in citas
            ]

        except sqlite3.IntegrityError as e:
            raise Exception(f"Database error: {str(e)}")
        finally:
            conn.close()

    @staticmethod
    def obtener_citas() -> List[Cita]:
        conn = get_db_connection()
        cursor = conn.cursor()

        try:
            cursor.execute("""
                SELECT id, fecha, hora, motivo, estado, paciente_id, medico_id
                FROM Cita
            """)

            citas = cursor.fetchall()
            return [
                Cita(
                    id=cita[0],
                    fecha=cita[1],
                    hora=cita[2],
                    motivo=cita[3],
                    estado=cita[4],
                    paciente_id=cita[5],
                    medico_id=cita[6]
                )
                for cita in citas
            ]

        except sqlite3.IntegrityError as e:
            raise Exception(f"Database error: {str(e)}")
        finally:
            conn.close()

    @staticmethod
    def actualizar_cita(cita_id: int, nueva_cita: CitaUpdate) -> Optional[Cita]:
        conn = get_db_connection()
        cursor = conn.cursor()

        try:
            # Fetch the current appointment data
            cursor.execute("SELECT * FROM Cita WHERE id = ?", (cita_id,))
            current_cita = cursor.fetchone()

            if not current_cita:
                raise Exception(f"Cita with id {cita_id} does not exist.")

            # Create a dictionary of the current appointment data
            current_data = {
                "fecha": current_cita[1],
                "hora": current_cita[2],
                "motivo": current_cita[3],
                "estado": current_cita[4],
                "paciente_id": current_cita[5],
                "medico_id": current_cita[6]
            }

            # Update only the fields that are provided in nueva_cita
            updated_data = nueva_cita.dict(exclude_unset=True)
            for key, value in updated_data.items():
                if key in current_data:
                    current_data[key] = value

            # Update the appointment
            cursor.execute("""
                UPDATE Cita
                SET fecha = ?, hora = ?, motivo = ?, estado = ?, paciente_id = ?, medico_id = ?
                WHERE id = ?
            """, (
                current_data["fecha"],
                current_data["hora"],
                current_data["motivo"],
                current_data["estado"],
                current_data["paciente_id"],
                current_data["medico_id"],
                cita_id
            ))

            conn.commit()
            return Cita(**current_data)

        except sqlite3.IntegrityError as e:
            raise Exception(f"Database error: {str(e)}")
        finally:
            conn.close()

    @staticmethod
    def obtener_citas_por_paciente(paciente_id: int) -> List[Cita]:
        conn = get_db_connection()
        cursor = conn.cursor()

        try:
            cursor.execute("""
                SELECT id, fecha, hora, motivo, estado, paciente_id, medico_id
                FROM Cita
                WHERE paciente_id = ?
            """, (paciente_id,))

            citas = cursor.fetchall()
            return [
                Cita(
                    id=cita[0],
                    fecha=cita[1],
                    hora=cita[2],
                    motivo=cita[3],
                    estado=cita[4],
                    paciente_id=cita[5],
                    medico_id=cita[6]
                )
                for cita in citas
            ]

        except sqlite3.IntegrityError as e:
            raise Exception(f"Database error: {str(e)}")
        finally:
            conn.close()