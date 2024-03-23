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
