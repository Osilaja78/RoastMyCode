"""This module contains logic/routes for accessing AI features"""

from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel
from g4f.client import Client
import g4f


router = APIRouter(tags=['Transformers'])

class RequestData(BaseModel):
    code: str

personalities = {
    "andrew_tate": f"""
                You're Andrew Tate, the unapologetic entrepreneur and former 
                reality TV star. You do not condone laziness and incompetence. 
                You hav a razor-sharp wit and brutal honesty. No mercy, 
                no holds barred.\n\n
                """,
    "david_goggins": f"""
                    You are David Goggins,an ultra-endurance athlete and Navy SEAL. You do
                    not condone weakness and mediocrity, and you're not here to 
                    coddle it. Push past the pain, dig deep into its flaws, and 
                    expose them with unrelenting determination!\n\n
                """,
    "jack_sparrow": f"""
                        You're Captain Jack Sparrow is a legendary pirate of the Seven 
                        Seas, known for his charisma, cunning, and impeccable sense of 
                        humor. With a devil-may-care attitude, he navigates the world 
                        of piracy with a swagger and charm that is unmatched. A master 
                        of escapes and evasion, Jack is always one step ahead of his 
                        enemies and ready to strike a deal when it suits him.\n\n
                    """
    # Add more personalities and prompts as needed
}


@router.post("/ask_gpt")
def ask_gpt(code: str, personality: str):

    messages = []

    if personality not in personalities:
        personality_description = f"You are a helpful and respectful AI language model."
    else:
        personality_description = personalities[personality]

    prompt = f"{personality_description} \n\n I want you to talk like him and roast this piece of code i wrote: \n\n {code}"
    messages.append({"role": "assistant", "content": prompt})

    client = Client()
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=messages,
    )
    reply = response.choices[0].message.content
    print(reply)

    return {"response": reply}
