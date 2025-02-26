from fastapi import APIRouter, HTTPException
from models import Admin
from database import get_db_connection

router = APIRouter()

# Create Admin
@router.post("/admins/", response_model=Admin)
def crear_admin(admin: Admin):
    conn = get_db_connection()
    cursor = conn.cursor()

    print(f"Creating admin: id={admin.id}, nombre={admin.nombre}, rol={admin.rol}")
    
    try:
        # Insert the admin into the Usuario table
        cursor.execute("""
        INSERT INTO Usuario (id, nombre, rol)
        VALUES (?, ?, ?)
        """, (admin.id, admin.nombre, admin.rol))

        # Insert the admin into the Admin table
        cursor.execute("""
        INSERT INTO Admin (id)
        VALUES (?)
        """, (admin.id,))

        # Commit the transaction
        conn.commit()
    except sqlite3.IntegrityError as e:
        # Handle duplicate IDs or other integrity errors
        raise HTTPException(status_code=400, detail=f"Database error: {str(e)}")
    finally:
        # Close the connection
        conn.close()

    return admin