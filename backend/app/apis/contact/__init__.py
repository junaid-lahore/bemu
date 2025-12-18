from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
import databutton as db

router = APIRouter()

class ContactFormRequest(BaseModel):
    name: str
    email: EmailStr
    category: str
    message: str

class ContactFormResponse(BaseModel):
    message: str

@router.post("/submit", response_model=ContactFormResponse)
def handle_contact_submission(body: ContactFormRequest):
    """
    Handles submissions from the contact form.

    - Sends an auto-reply to the user.
    - Forwards the message to the Beamu team.
    """
    try:
        # 1. Send auto-reply to the user
        db.notify.email(
            to=[body.email],
            reply_to=["info@beamuadventures.com"],
            subject="🌟 Thanks for contacting Beamu Adventures!",
            content_html=f"""
                <div style="font-family: sans-serif; color: #333;">
                    <h2 style="color:#FFA64D;">Hi {body.name or "there"}!</h2>
                    <p>Thank you for reaching out to <b>Beamu Adventures</b>! 💛</p>
                    <p>We’ve received your message and the team (and Beamu 😊) will get back to you soon.</p>
                    <p>While you wait, watch our latest stories:</p>
                    <ul>
                        <li><a href="https://youtube.com/@BeamuAdventures" style="color:#FFA64D;">YouTube</a></li>
                        <li><a href="https://instagram.com/beamuadventures" style="color:#FFA64D;">Instagram</a></li>
                    </ul>
                    <p style="margin-top:20px;">Stay bright and curious! 🌙<br>– The Beamu Adventures Team</p>
                </div>
            """
        )

        # 2. Forward the message to the Beamu team
        db.notify.email(
            to=["info@beamuadventures.com"],
            subject=f"New Contact Form Submission: {body.category}",
            content_html=f"""
                <div style="font-family: sans-serif; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
                    <h3 style="color: #0C1021;">New Message from Beamu World</h3>
                    <p><strong>Name:</strong> {body.name}</p>
                    <p><strong>Email:</strong> {body.email}</p>
                    <p><strong>Category:</strong> {body.category}</p>
                    <hr style="border: none; border-top: 1px solid #eee; margin: 15px 0;">
                    <p><strong>Message:</strong></p>
                    <p style="white-space: pre-wrap; background-color: #f9f9f9; padding: 10px; border-radius: 4px;">{body.message}</p>
                </div>
            """
        )

        return ContactFormResponse(message="Submission successful.")

    except Exception as e:
        print(f"Error processing contact form: {e}")
        raise HTTPException(status_code=500, detail="An unexpected error occurred. Please try again later.")
