from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uuid

app = FastAPI(title="API Todo List")

# Configuration CORS pour permettre les requêtes depuis le frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5000", "http://172.18.0.3:5000", "http://127.0.0.1:5000"],  # Origine du frontend Next.js
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Modèle de données pour une tâche
class Todo(BaseModel):
    id: str
    title: str
    completed: bool = False

# Modèle pour la création d'une tâche
class TodoCreate(BaseModel):
    title: str

# Base de données simulée (en mémoire)
todos_db = []

@app.get("/")
def read_root():
    return {"message": "Bienvenue sur l'API Todo List"}

@app.get("/api/todos", response_model=List[Todo])
def get_todos():
    return todos_db

@app.post("/api/todos", response_model=Todo)
def create_todo(todo: TodoCreate):
    new_todo = Todo(
        id=str(uuid.uuid4()),
        title=todo.title,
        completed=False
    )
    todos_db.append(new_todo)
    return new_todo

@app.put("/api/todos/{todo_id}", response_model=Todo)
def update_todo(todo_id: str, completed: bool):
    for todo in todos_db:
        if todo.id == todo_id:
            todo.completed = completed
            return todo
    raise HTTPException(status_code=404, detail="Todo non trouvé")

@app.delete("/api/todos/{todo_id}")
def delete_todo(todo_id: str):
    for index, todo in enumerate(todos_db):
        if todo.id == todo_id:
            todos_db.pop(index)
            return {"message": "Todo supprimé"}
    raise HTTPException(status_code=404, detail="Todo non trouvé")

# Lancer avec: uvicorn main:app --reload