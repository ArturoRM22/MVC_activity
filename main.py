from fastapi import FastAPI
from routes.admins import router as admins_router
from database.database import initialize_database

app = FastAPI()

initialize_database()

app.include_router(admins_router)

@app.get("/")
def read_root():
    return {"MVC"}
