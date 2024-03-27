"""
This module contains all schemas
"""

from pydantic import BaseModel, EmailStr


class Users(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    password: str
    confirm_password: str

    class Config():
        from_attributes = True

class AskGPT(BaseModel):
    code: str
    personality: str

    class Config():
        from_attributes = True

class AddChat(BaseModel):
    chat_id: str
    question: str
    content: str

    class Config():
        from_attributes = True
