import sqlite3

# Database file path
DATABASE_FILE = "database.db"

# Function to connect to the database
def get_db_connection():
    conn = sqlite3.connect(DATABASE_FILE)
    conn.row_factory = sqlite3.Row  # Return rows as dictionaries
    conn.execute("PRAGMA foreign_keys = ON")  # Enable foreign key support
    return conn

# Function to initialize the database (create tables)
def initialize_database():
    conn = get_db_connection()
    cursor = conn.cursor()

    # Create tables
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS Usuario (
        id INTEGER PRIMARY KEY,
        nombre TEXT NOT NULL,
        rol TEXT NOT NULL
    )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS Admin (
        id INTEGER PRIMARY KEY,
        FOREIGN KEY (id) REFERENCES Usuario(id)
    )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS Enfermera (
        id INTEGER PRIMARY KEY,
        FOREIGN KEY (id) REFERENCES Usuario(id)
    )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS Paciente (
        id INTEGER PRIMARY KEY,
        FOREIGN KEY (id) REFERENCES Usuario(id)
    )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS Medico (
        id INTEGER PRIMARY KEY,
        especialidad TEXT,
        horarios TEXT,
        FOREIGN KEY (id) REFERENCES Usuario(id)
    )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS Cita (
        id INTEGER PRIMARY KEY,
        fecha DATE NOT NULL,
        hora TEXT NOT NULL,
        motivo TEXT,
        estado TEXT,
        paciente_id INTEGER,
        medico_id INTEGER,
        FOREIGN KEY (paciente_id) REFERENCES Paciente(id),
        FOREIGN KEY (medico_id) REFERENCES Medico(id)
    )
    """)

    # Commit changes and close the connection
    conn.commit()
    conn.close()

# Initialize the database when this module is imported
initialize_database()