from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.admins import router as admins_router
from routes.pacientes import router as pacientes_router
from routes.medicos import router as medicos_router
from routes.citas import router as citas_router
from routes.enfermeras import router as enfermeras_router
from database.database import initialize_database
from models.models import Usuario, UserRole
from controllers.admin_controller import AdminController

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

initialize_database()

app.include_router(admins_router)
app.include_router(pacientes_router)
app.include_router(medicos_router)
app.include_router(enfermeras_router)

admin = Usuario(
    nombre="Admin User",
    username="admin",
    password="admin123",
    rol=UserRole.ADMIN
)

AdminController.crear_admin(admin)

@app.get("/")
def read_root():
    return {"MVC"}
