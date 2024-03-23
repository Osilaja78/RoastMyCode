"""Main module for running FastAPI app"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api import models
from api.database import engine
from api.routes import transformer, auth, users
import uvicorn


app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",
    "https://sketch-sync.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize database migration
models.Base.metadata.create_all(bind=engine)


@app.get("/health")
async def health():
    """Check the status of the API"""

    return {'status': 'OK'}


@app.get("/")
async def root():
    """Root route of the API"""

    return {"message": "Welcome to Roast my code!"}


# Include routes from other router files
app.include_router(auth.router)
app.include_router(users.router)
app.include_router(transformer.router)


if __name__ == "__main__":
    uvicorn.run("main:app", port=8000, reload=True)
