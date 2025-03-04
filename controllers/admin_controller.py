import sqlite3
from models.models import Usuario
from database.database import get_db_connection

class AdminController:
    @staticmethod
    def crear_admin(admin: Usuario):
        conn = get_db_connection()
        cursor = conn.cursor()

        print(f"Creating admin: id={admin.id}, nombre={admin.nombre}, rol={admin.rol}")
        
        try:
            # Insert into Usuario table
            cursor.execute("""
            INSERT INTO Usuario (id, nombre, rol)
            VALUES (?, ?, ?)
            """, (admin.id, admin.nombre, admin.rol))

            # Insert into Admin table
            cursor.execute("""
            INSERT INTO Admin (id)
            VALUES (?)
            """, (admin.id,))

            conn.commit()
        except sqlite3.IntegrityError as e:
            raise Exception(f"Database error: {str(e)}")
        finally:
            conn.close()

        return admin
