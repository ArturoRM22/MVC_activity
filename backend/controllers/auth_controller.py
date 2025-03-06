import sqlite3
from database.database import get_db_connection
from models.models import UsuarioResponse

class AuthController:
    @staticmethod
    def login(username: str, password: str) -> UsuarioResponse:
        conn = get_db_connection()
        cursor = conn.cursor()

        try:
            # Fetch the user by username
            cursor.execute("""
                SELECT id, nombre, username, password, rol
                FROM Usuario
                WHERE username = ?
            """, (username,))

            user_data = cursor.fetchone()
            if not user_data:
                raise Exception("User not found.")

            # Verify the password (in a real app, use hashed passwords!)
            if user_data[3] != password:
                raise Exception("Invalid password.")

            # Return the user as a Usuario object
            return UsuarioResponse(
                id=user_data[0],
                nombre=user_data[1],
                username=user_data[2],
                rol=user_data[4]
            )

        except sqlite3.IntegrityError as e:
            raise Exception(f"Database error: {str(e)}")
        finally:
            conn.close()