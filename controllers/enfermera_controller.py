import sqlite3
from database.database import get_db_connection
from models.models import Usuario
from models.models import UserRole

class EnfermeraController:
    @staticmethod
    def asistir():
        return "Enfermera asistiendo"




