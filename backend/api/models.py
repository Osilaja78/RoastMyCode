# This module contains all database models.

from sqlalchemy import Column, String, Integer, ForeignKey, Boolean, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .database import Base


class User(Base):
    """Model for storing user information."""

    __tablename__ = "User"

    id = Column(String(80), primary_key=True, index=True)
    first_name = Column(String(50))
    last_name = Column(String(50))
    email = Column(String(50), unique=True)
    password = Column(String(150))
    is_verified = Column(Boolean, default=False)

    chats = relationship("Chat", back_populates="user")


class Chat(Base):
    """Model for storing user's chat information"""
    __tablename__ = "Chats"

    chat_id = Column(String(80), primary_key=True, index=True)
    user_id = Column(String(80), ForeignKey('User.id'))
    title = Column(String(200))
    date_added = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="chats")
    messages = relationship("Message", back_populates="chat")


class Message(Base):
    """Model for storing messages"""

    __tablename__ = "Messages"

    message_id = Column(String(80), primary_key=True, index=True)
    chat_id = Column(String(80), ForeignKey('Chats.chat_id'))
    sender_id = Column(String(80), ForeignKey('User.id'))
    question = Column(String(5000))
    content = Column(String(5000))
    date_sent = Column(DateTime(timezone=True), server_default=func.now())

    chat = relationship("Chat", back_populates="messages")
    sender = relationship("User")
