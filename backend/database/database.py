import sqlite3

# Database file path
DATABASE_FILE = "database/database.db"

# Function to connect to the database
def get_db_connection():
    conn = sqlite3.connect(DATABASE_FILE)
    conn.row_factory = sqlite3.Row  # Return rows as dictionaries
    conn.execute("PRAGMA foreign_keys = ON")  # Enable foreign key support
    return conn

# Function to initialize the database (create tables)
def initialize_database():
    with get_db_connection() as conn:
        cursor = conn.cursor()

        # Create tables
        cursor.executescript("""
        CREATE TABLE IF NOT EXISTS Usuario (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            username TEXT NOT NULL,
            password TEXT NOT NULL,
            rol TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS Cita (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            fecha DATE NOT NULL,
            hora TEXT NOT NULL,
            motivo TEXT,
            estado TEXT,
            paciente_id INTEGER,
            medico_id INTEGER,
            FOREIGN KEY (paciente_id) REFERENCES Usuario(id),
            FOREIGN KEY (medico_id) REFERENCES Usuario(id)
        );
        """)
