"""
This module contains all logic for adding and
retrieving user's chat information form the database.
"""

from fastapi import APIRouter, HTTPException, Depends, status
from api.routes.auth import get_current_user
from sqlalchemy.orm import Session
from api import schemas
from api import models
from api.database import get_db
from uuid import uuid4
from fastapi.responses import JSONResponse


router = APIRouter(tags=['Chat'])


@router.get("/user-chat")
def get_user_chats(user: schemas.Users = Depends(get_current_user), db: Session = Depends(get_db)):
    """
    Get chats specific to a user.
    """

    try:
        user_chats = db.query(models.Chat).filter(models.Chat.user_id == user.id).all()
        return user_chats
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch user chats: {str(e)}",
        )


@router.post("/new-chat")
def create_chat(chat_title: str, user: schemas.Users = Depends(get_current_user), db: Session = Depends(get_db)):
    """
    Create a new chat.
    """

    try:
        new_chat_id = str(uuid4())
        chat = models.Chat(
            chat_id=new_chat_id,
            user=user,
            title=chat_title
        )

        db.add(chat)
        db.commit()
        db.refresh(chat)
        db.close()

        return JSONResponse(content={"chat_id": new_chat_id})
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Failed to create chat: {str(e)}",
        )


@router.post("/chats/{chat_id}/messages/")
def add_message_to_chat(chat_id: str, question: str, content: str, db: Session = Depends(get_db), user: schemas.Users = Depends(get_current_user)):
    """
    Add a new message to a chat.
    """

    try:
        # Check if the chat exists
        chat = db.query(models.Chat).filter(models.Chat.chat_id == chat_id).first()
        if not chat:
            raise HTTPException(status_code=404, detail="Chat not found")

        # Create the message
        message = models.Message(
            message_id=str(uuid4()),
            chat_id=chat_id,
            sender_id=user.id,
            question=question,
            content=content
        )

        db.add(message)
        db.commit()
        return {"message": "Message added successfully"}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Failed to add message to chat: {str(e)}",
        )


@router.get("/chats/{chat_id}/messages/")
def get_chat_messages(chat_id: str, db: Session = Depends(get_db), user: schemas.Users = Depends(get_current_user)):
    """
    Get all messages in a chat.
    """

    try:
        chat = db.query(models.Chat).filter(
            models.Chat.chat_id == chat_id
        ).first()

        if not chat:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Chat not found!"
            )

        messages = db.query(models.Message).filter(
                    models.Message.chat_id == chat_id
                ).order_by(
                    models.Message.date_sent
                ).all()

        return messages
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch chat messages: {str(e)}",
        )
