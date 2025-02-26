from fastapi import FastAPI
from admin import router as admin_router

app = FastAPI()

app.include_router(admin_router, prefix="/api")

@app.get("/")
def read_root():
    return {"MVC"}
