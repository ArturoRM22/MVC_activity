from fastapi import FastAPI
from routes.admins import router as admins_router
from routes.pacientes import router as pacientes_router
from routes.medicos import router as medicos_router
from routes.citas import router as citas_router
from database.database import initialize_database

app = FastAPI()

initialize_database()

app.include_router(admins_router)
app.include_router(pacientes_router)
app.include_router(medicos_router)
app.include_router(citas_router)

@app.get("/")
def read_root():
    return {"MVC"}
