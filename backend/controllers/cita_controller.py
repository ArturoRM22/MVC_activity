import sqlite3
from typing import List
from database.database import get_db_connection
from models.models import Cita, CitaStatus, CitaUpdate
from datetime import datetime, timedelta

class CitaController:
    @staticmethod
    def registrar_cita(cita: Cita):
        conn = get_db_connection()
        cursor = conn.cursor()

        print(f"Creating appointment: fecha={cita.fecha}, hora={cita.hora}, paciente_id={cita.paciente_id}, medico_id={cita.medico_id}")

        try:
            # Ensure paciente_id exists
            cursor.execute("SELECT id FROM Usuario WHERE id = ?", (cita.paciente_id,))
            if cursor.fetchone() is None:
                raise Exception(f"Paciente with id {cita.paciente_id} does not exist.")

            # Ensure medico_id exists
            cursor.execute("SELECT id FROM Usuario WHERE id = ?", (cita.medico_id,))
            if cursor.fetchone() is None:
                raise Exception(f"Medico with id {cita.medico_id} does not exist.")

            # Convert fecha and hora to a single datetime object
            #cita_datetime = datetime.strptime(f"{cita.fecha} {cita.hora}", "%Y-%m-%d %H:%M")

            # Check if there is an overlapping appointment (same doctor, same time)
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

        except sqlite3.IntegrityError as e:
            raise Exception(f"Database error: {str(e)}")
        finally:
            conn.close()

        return cita

    @staticmethod
    def aceptar_cita(cita_id: int):
        conn = get_db_connection()
        cursor = conn.cursor()
        try:
            # Update the appointment status to "Pendiente"
            cursor.execute("""
                UPDATE Cita 
                SET estado = ?
                WHERE id = ?
            """, (CitaStatus.PENDIENTE.value, cita_id))

            conn.commit()

            if cursor.rowcount > 0:
                return {"success": True, "message": "Appointment accepted successfully."}
            else:
                return {"success": False, "message": "No appointment found with the given ID."}

        except sqlite3.IntegrityError as e:
            raise Exception(f"Database error: {str(e)}")
        finally:
            conn.close()

    @staticmethod
    def cancelar_cita(cita_id: int):
        conn = get_db_connection()
        cursor = conn.cursor()

        try:
            # Update the appointment status to "Cancelada"
            cursor.execute("""
                UPDATE Cita 
                SET estado = ?
                WHERE id = ?
            """, (CitaStatus.CANCELADA.value, cita_id))

            conn.commit()

            if cursor.rowcount > 0:
                return {"success": True, "message": "Appointment canceled successfully."}
            else:
                return {"success": False, "message": "No appointment found with the given ID."}

        except sqlite3.IntegrityError as e:
            raise Exception(f"Database error: {str(e)}")
        finally:
            conn.close()

    @staticmethod
    def terminar_cita(cita_id: int):
        conn = get_db_connection()
        cursor = conn.cursor()

        try:
            # Update the appointment status to "Terminada"
            cursor.execute("""
                UPDATE Cita 
                SET estado = ?
                WHERE id = ?
            """, (CitaStatus.TERMINADA.value, cita_id))

            conn.commit()

            if cursor.rowcount > 0:
                return {"success": True, "message": "Appointment terminated successfully."}
            else:
                return {"success": False, "message": "No appointment found with the given ID."}

        except sqlite3.IntegrityError as e:
            raise Exception(f"Database error: {str(e)}")
        finally:
            conn.close()

    @staticmethod
    def obtener_citas_por_medico(medico_id: int) -> List[Cita]:
        conn = get_db_connection()
        cursor = conn.cursor()

        try:
            # Fetch all appointments for the given doctor
            cursor.execute("""
                SELECT id, fecha, hora, motivo, estado, paciente_id, medico_id
                FROM Cita
                WHERE medico_id = ?
            """, (medico_id,))

            citas = cursor.fetchall()

            # Convert the result into a list of Cita objects
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
            # Fetch all appointments for the given doctor
            cursor.execute("""
                SELECT id, fecha, hora, motivo, estado, paciente_id, medico_id
                FROM Cita
            """)

            citas = cursor.fetchall()

            # Convert the result into a list of Cita objects
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
    def actualizar_cita(cita_id: int, nueva_cita: CitaUpdate):
        conn = get_db_connection()
        cursor = conn.cursor()

        try:
            # Check if the appointment exists
            cursor.execute("SELECT id FROM Cita WHERE id = ?", (cita_id,))
            if cursor.fetchone() is None:
                raise Exception(f"Cita with id {cita_id} does not exist.")

            # Fetch the current appointment data
            cursor.execute("SELECT * FROM Cita WHERE id = ?", (cita_id,))
            current_cita = cursor.fetchone()

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
        except sqlite3.IntegrityError as e:
            raise Exception(f"Database error: {str(e)}")
        finally:
            conn.close()

        return Cita(**current_data)


    @staticmethod
    def obtener_citas_id(id_user: int) -> List[Cita]:
        conn = get_db_connection()
        cursor = conn.cursor()

        try:
            # Fetch all appointments for the given doctor
            cursor.execute("""
                SELECT id, fecha, hora, motivo, estado, paciente_id, medico_id
                FROM Cita WHERE medico_id = ? OR paciente_id = ?
            """, (
                id_user, id_user
            ))

            citas = cursor.fetchall()

            # Convert the result into a list of Cita objects
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